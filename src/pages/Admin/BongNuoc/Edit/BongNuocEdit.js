import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhatComboAction,
  chiTietComboAction,
} from "../../../../redux/Actions/QuanLyBongNuocAction";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Input } from "antd";
import { DOMAIN_STATIC_FILE } from "../../../../utils/Settings/config";
import { useHistory } from "react-router-dom";

export default function ComboEdit(props) {
  const dispatch = useDispatch();
  const history = useHistory(); // Hook để truy cập history
  const { comboEdit } = useSelector((state) => state.QuanLyBongNuocReducer);

  useEffect(() => {
    const { id } = props.match.params;
    dispatch(chiTietComboAction(id));
  }, [dispatch, props.match.params]);

  const [srcImg, setSrcImg] = useState("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: comboEdit.name,
      description: comboEdit.description,
      imageUrl: null,
      price: comboEdit.price,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Không được trống!"),
      description: Yup.string().required("Không được trống!"),
      price: Yup.number()
        .required("Không được trống!")
        .min(0, "Giá phải lớn hơn hoặc bằng 0"),
    }),
    onSubmit: (values) => {
      let formData = new FormData();
      for (var key in values) {
        if (key !== "imageUrl") {
          formData.append(key, values[key]);
        } else {
          if (values[key] !== null) {
            formData.append("combos", values.imageUrl, values.imageUrl.name);
          }
        }
      }
      dispatch(capNhatComboAction(props.match.params.id, formData)).then(() => {
        // Quay lại trang quản lý combo
        history.push("/Admin/Combo");
      });
    },
  });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setSrcImg(e.target.result);
      };
      formik.setFieldValue("imageUrl", file);
    }
  };

  return (
    <div className="my-10">
      <h3 className="text-2xl text-center">Sửa Combo Bỏng Nước</h3>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: "default" }}
        size="default"
      >
        <Form.Item label="Tên Combo">
          <Input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name && (
            <p className="m-0 mt-1 text-red-600">{formik.errors.name}</p>
          )}
        </Form.Item>

        <Form.Item label="Mô tả">
          <Input.TextArea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          {formik.errors.description && formik.touched.description && (
            <p className="m-0 mt-1 text-red-600">{formik.errors.description}</p>
          )}
        </Form.Item>

        <Form.Item label="Giá">
          <Input
            type="number"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          {formik.errors.price && formik.touched.price && (
            <p className="m-0 mt-1 text-red-600">{formik.errors.price}</p>
          )}
        </Form.Item>

        <Form.Item label="Hình Ảnh">
          <input
            type="file"
            name="imageUrl"
            onChange={handleFile}
            accept=".jpg, .jpeg, .png"
          />
          <br />
          <img
            style={{ width: 150, height: 150 }}
            src={
              srcImg === ""
                ? `${DOMAIN_STATIC_FILE}${comboEdit.imageUrl}`
                : srcImg
            }
            alt={`${srcImg}...`}
          />
        </Form.Item>

        <div className="text-center">
          <button
            className="border bg-yellow-300 text-white border-white px-5 py-2 rounded"
            type="submit"
          >
            Cập Nhật
          </button>
        </div>
      </Form>
    </div>
  );
}
