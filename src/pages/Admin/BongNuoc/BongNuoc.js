import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhSachComboAction,
  xoaComboAction,
  ChangeStatusComboAction,
} from "../../../redux/Actions/QuanLyBongNuocAction";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { Button, Input, Popconfirm, Table } from "antd";
import { history } from "../../../App";
import { DOMAIN_STATIC_FILE } from "../../../utils/Settings/config";
import { formatPrice } from "../../../utils/formatPrice";

export default function Combos(props) {
  const dispatch = useDispatch();
  const { lstCombos } = useSelector((state) => state.QuanLyBongNuocReducer);
  useEffect(() => {
    dispatch(layDanhSachComboAction());
  }, [dispatch]);
  const confirm = (id, status) => {
    if (status === "hidden") {
      dispatch(ChangeStatusComboAction(id, { isActive: false }));
    } else {
      dispatch(ChangeStatusComboAction(id, { isActive: true }));
    }
  };
  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (text, data, index) => {
        return <Fragment>{index + 1}</Fragment>;
      },
    },
    {
      title: "Tên Combo",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => {
        if (a.name.toLowerCase().trim() > b.name.toLowerCase().trim()) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend"],
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: "20%",
    },
    {
      title: "Hình Ảnh",
      key: "image",
      render: (text, combo) => {
        console.log(`Image URL: ${DOMAIN_STATIC_FILE}${combo.imageUrl}`);
        return (
          <Fragment>
            <img
              style={{ width: 100, height: 100, opacity: 1 }}
              src={`${DOMAIN_STATIC_FILE}${combo.imageUrl}`}
              alt={`${combo.name}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `https://picsum.photos/v2/list?page=1&limit=10`;
              }}
            />
          </Fragment>
        );
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (text) => formatPrice(text),
      width: "10%",
    },
    {
      title: "Hidden/Display",
      dataIndex: "isActive",
      render: (text, combo) => {
        if (combo.isActive) {
          return (
            <Popconfirm
              placement="top"
              title="Bạn có muốn ẩn banner này ?"
              onConfirm={() => {
                confirm(combo.id, "hidden");
              }}
              okText="Yes"
              cancelText="No"
            >
              <div className="hover:text-green-500 cursor-pointer">
                <EyeOutlined style={{ fontSize: 20 }} />
              </div>
            </Popconfirm>
          );
        } else {
          return (
            <Popconfirm
              placement="top"
              title="Bạn có muốn hiện thị banner này ?"
              onConfirm={() => {
                confirm(combo.id, "display");
              }}
              okText="Yes"
              cancelText="No"
            >
              <div className="hover:text-yellow-400 cursor-pointer">
                <EyeInvisibleOutlined style={{ fontSize: 20 }} />
              </div>
            </Popconfirm>
          );
        }
      },
      width: "10%",
    },
    {
      title: "",
      dataIndex: "id",
      width: "20%",
      render: (text, combo) => {
        return (
          <div className="flex justify-around items-center text-lg">
            <NavLink
              className="hover:text-2xl hover:text-blue-400 text-black"
              to={`/Admin/Combos/Edit/${combo.id}`}
            >
              <EditOutlined key={1} className="cursor-pointer" />
            </NavLink>
            <div
              onClick={() => {
                if (window.confirm("Bạn có muốn xóa Combo? ")) {
                  dispatch(xoaComboAction(combo.id));
                }
              }}
              className="hover:text-2xl hover:text-red-400 text-black"
            >
              <DeleteOutlined key={2} className=" cursor-pointer" />
            </div>
          </div>
        );
      },
    },
  ];
  const { Search } = Input;
  const onSearch = (value) => {
    dispatch(layDanhSachComboAction(value));
  };
  return (
    <div>
      <h3 className="mt-10 text-3xl text-center">QUẢN LÝ COMBO BỎNG NƯỚC</h3>
      <div className="my-3 mx-10 flex justify-between">
        <Button
          onClick={() => {
            history.push("/Admin/Combo/Create");
          }}
        >
          <div className="text-base flex justify-center items-center">
            <PlusOutlined className="mr-2" />
            Thêm Combo
          </div>
        </Button>
        <Search
          placeholder="Nhập tên Comboo"
          enterButton="Search"
          onSearch={onSearch}
          style={{ width: 400 }}
        />
      </div>
      <Table columns={columns} rowKey={"id"} dataSource={lstCombos} />
    </div>
  );
}
