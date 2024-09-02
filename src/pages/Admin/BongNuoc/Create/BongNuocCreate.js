import React, { useState } from "react";
import { Form, Input, InputNumber } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { themComboAction } from "../../../../redux/Actions/QuanLyBongNuocAction";
import { useHistory } from "react-router-dom";

export default function ComboCreate(props) {
  const [srcImg, setSrcImg] = useState("");
  const dispatch = useDispatch();
  const history = useHistory(); // Hook để truy cập history

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
      price: 0,
      image: {},
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Không được trống!"),
      price: Yup.number()
        .required("Không được trống!")
        .min(0, "Giá trị không hợp lệ!"),
    }),
    onSubmit: (values) => {
      let formData = new FormData();
      for (var key in values) {
        if (key !== "image") {
          formData.append(key, values[key]);
        } else {
          formData.append("popcorn_drinks", values.image, values.image.name);
        }
      }
      dispatch(themComboAction(formData)).then(() => {
        // Quay lại trang cụ thể
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
      formik.setFieldValue("image", file);
    }
  };

  return (
    <div className="my-10">
      <h3 className="text-2xl text-center">Thêm Combo Bỏng Nước</h3>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: "default" }}
        size="default"
      >
        <Form.Item label="Tên Combo">
          <Input name="name" onChange={formik.handleChange} />
          {formik.errors.name && formik.touched.name && (
            <p className="m-0 mt-1 text-red-600">{formik.errors.name}</p>
          )}
        </Form.Item>
        <Form.Item label="Mô Tả">
          <Input.TextArea name="description" onChange={formik.handleChange} />
          {formik.errors.description && formik.touched.description && (
            <p className="m-0 mt-1 text-red-600">{formik.errors.description}</p>
          )}
        </Form.Item>
        <Form.Item label="Giá">
          <InputNumber
            min={0}
            name="price"
            onChange={(value) => formik.setFieldValue("price", value)}
          />
          {formik.errors.price && formik.touched.price && (
            <p className="m-0 mt-1 text-red-600">{formik.errors.price}</p>
          )}
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input
            type="file"
            name="image"
            onChange={handleFile}
            accept=".jpg, .jpeg, .png"
          />
          <br />
          <img
            style={{ width: 150, height: 150 }}
            src={srcImg}
            alt={`${srcImg}...`}
          />
        </Form.Item>
        <div className="text-center">
          <button
            className="border bg-sky-300 text-white border-white px-5 py-2 rounded"
            type="submit"
          >
            Thêm
          </button>
        </div>
      </Form>
    </div>
  );
}
