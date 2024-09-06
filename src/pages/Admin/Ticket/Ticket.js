import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "antd";
import { quanLyTicketServices } from "../../../services/QuanLyTicketServices";
import { quanLyComboServices } from "../../../services/QuanLyComboService"; // Giả sử có dịch vụ này
import moment from "moment";
import { layChiTietNguoiDungAction } from "../../../redux/Actions/QuanLyNguoiDungAction";
import { formatPrice } from "../../../utils/formatPrice";

export default function Ticket(props) {
  const [state, setState] = useState({
    lstTicket: [],
    lstCombo: [], // Thêm trạng thái cho combo
  });
  const dispatch = useDispatch();
  const { userEdit } = useSelector((state) => state.QuanLyNguoiDungReducer);

  useEffect(() => {
    let isMounted = true; // Biến kiểm tra trạng thái gắn kết của component

    const fetchData = async () => {
      const { id } = props.match.params;
      try {
        const ticketResult = await quanLyTicketServices.danhSachVeTheoUser(id);
        if (isMounted && ticketResult.status === 200) {
          setState((prevState) => ({
            ...prevState,
            lstTicket: ticketResult.data,
          }));
        }

        // Lấy dữ liệu combo
        const comboResult = await quanLyComboServices.danhSachComboTheoUser(id); // Giả sử có dịch vụ này
        if (isMounted && comboResult.status === 200) {
          setState((prevState) => ({
            ...prevState,
            lstCombo: comboResult.data,
          }));
        }
      } catch (error) {
        console.log(error);
      }
      if (isMounted) {
        dispatch(layChiTietNguoiDungAction(id));
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Hủy bỏ cập nhật khi component bị gỡ bỏ
    };
  }, [dispatch, props.match.params]);

  const ticketColumns = [
    {
      title: "Mã Lịch Chiếu",
      dataIndex: "idShowTime",
      key: "idShowTime",
    },
    {
      title: "Tên Phim",
      dataIndex: "nameFilm",
      key: "nameFilm",
    },
    {
      title: "Cụm Rạp",
      dataIndex: "groupName",
      key: "groupName",
    },
    {
      title: "Rạp",
      dataIndex: "cinemaName",
      key: "cinemaName",
    },
    {
      title: "Phòng",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "Lịch Chiếu",
      dataIndex: "showDate",
      key: "showDate",
      render: (text) => <p>{moment(text).format("DD/MM/YYYY hh:mm A")}</p>,
    },
    {
      title: "Ghế",
      dataIndex: "lstTicket",
      key: "lstTicket",
      render: (record) =>
        record.map((ghe) => <span key={ghe.seatName}>{ghe.seatName} </span>),
    },
  ];

  const comboColumns = [
    {
      title: "Mã Combo",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên Combo",
      dataIndex: "comboName",
      key: "comboName",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => formatPrice(text),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tổng Giá",
      key: "totalPrice",
      render: (text, record) => (
        <span>{formatPrice(record.price * record.quantity)}</span>
      ),
    },
  ];

  return (
    <div>
      <h3 className="text-center my-4 text-2xl">
        Thông Tin Đặt Vé Của {userEdit.userName}
      </h3>
      <Table
        dataSource={state.lstTicket}
        columns={ticketColumns}
        rowKey="idShowTime"
        bordered
      />
      <h3 className="text-center my-4 text-2xl">Thông Tin Combo</h3>
      <Table
        dataSource={state.lstCombo}
        columns={comboColumns}
        rowKey="idCombo"
        bordered
      />
    </div>
  );
}
