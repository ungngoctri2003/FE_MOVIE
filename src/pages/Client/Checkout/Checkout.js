import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../Checkout/Checkout.module.css";
import "../Checkout/Checkout.css";
import { Tooltip, Modal, Button, Input } from "antd";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import moment from "moment";
import { history } from "../../../App";
import { layDanhSachGheTheoLichChieu } from "../../../redux/Actions/QuanLySeatsAction";
import { DOMAIN, DOMAIN_STATIC_FILE } from "../../../utils/Settings/config";
import Countdown from "react-countdown";
import { RequirementCheckoutAction } from "../../../redux/Actions/QuanLyCheckoutAction";
import io from "socket.io-client";
import { chiTietLichChieuAction } from "../../../redux/Actions/QuanLyLichChieuAction";
import RoomSizeM from "../../../components/Room/SizeM";
import RoomSizeL from "../../../components/Room/SizeL";
import RoomSizeS from "../../../components/Room/SizeS";
import { sizeConst } from "../../../constants/roomSize";
import RoomNoraml from "../../../components/Room/Normal";
import axios from "axios";
import PopcornDrinks from "../BongNuoc/BongNuoc";
import {
  removeCombo,
  updateComboQuantity,
} from "../../../redux/Actions/QuanLyBongNuocAction";
import { formatDiem, formatPrice } from "../../../utils/formatPrice";
import { layChiTietNguoiDungAction } from "../../../redux/Actions/QuanLyNguoiDungAction";
import { useFormik } from "formik";

const { confirm } = Modal;
export default function Checkout(props) {
  //! State
  const listGheRef = useRef([]);
  const socketRef = useRef(null);
  const socket = io.connect(`${DOMAIN_STATIC_FILE}`);
  socketRef.current = socket;

  const [pointsToUse, setPointsToUse] = useState(0); // Số điểm tích lũy muốn dùng
  const [totalAfterPoints, setTotalAfterPoints] = useState(0); // Tổng tiền sau khi trừ điểm tích lũy

  const { id } = props.match.params;
  const dispatch = useDispatch();

  const listCombo = useSelector((state) => state.QuanLyBongNuocReducer.cart);

  const handleIncreaseQuantity = useCallback(
    (comboId) => {
      dispatch(updateComboQuantity(comboId, 1)); // Tăng số lượng combo
    },
    [dispatch]
  );

  const handleDecreaseQuantity = useCallback(
    (comboId) => {
      dispatch(updateComboQuantity(comboId, -1)); // Giảm số lượng combo
    },
    [dispatch]
  );
  const handleRemoveCombo = useCallback(
    (comboId) => {
      dispatch(removeCombo(comboId)); // Xử lý xóa combo
    },
    [dispatch]
  );
  // Tính tổng tiền combo
  // const totalComboPrice = listCombo.reduce((total, combo) => {
  //   return total + combo.price * combo.quantity;
  // }, 0);

  const listGheDangDat = useSelector(
    (state) => state.QuanLySeatsReducer.listGheDangDat
  );
  const showTimeEdit = useSelector(
    (state) => state.QuanLyLichChieuReducer.showTimeEdit
  );
  const userLogin = useSelector(
    (state) => state.QuanLyNguoiDungReducer.userLogin
  );
  const phongVe = useSelector((state) => state.QuanLySeatsReducer.phongVe);
  // Xử ký points
  const { userEdit } = useSelector((state) => state.QuanLyNguoiDungReducer);
  useEffect(() => {
    dispatch(layChiTietNguoiDungAction(userLogin?.id));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      points: userEdit?.points,
    },
  });
  console.log("Check formik: ", formik);
  const { lstGhe, film } = phongVe;
  const [state, setState] = useState("00:00:00");

  const data = useMemo(() => {
    return {
      user: userLogin,
      room: id,
      seats: listGheDangDat,
    };
  }, [userLogin, id, listGheDangDat]);
  listGheRef.current = listGheDangDat;

  // Tính tổng tiền vé
  const totalTicketPrice = useMemo(() => {
    return listGheDangDat.reduce((tong, ghe) => tong + Number(ghe.price), 0);
  }, [listGheDangDat]);

  // Tính tổng tiền combo
  const totalComboPrice = useMemo(() => {
    return listCombo.reduce(
      (tong, combo) => tong + combo.quantity * combo.price,
      0
    );
  }, [listCombo]);

  // Tổng tiền (vé + combo)
  const totalPrice = totalTicketPrice + totalComboPrice;

  // Tính tổng tiền sau khi trừ điểm tích lũy
  useEffect(() => {
    const pointsValue = pointsToUse; // Giả sử mỗi điểm tương đương 1000
    if (pointsValue > totalPrice) {
      setTotalAfterPoints(0);
    } else {
      setTotalAfterPoints(totalPrice - pointsValue);
    }
  }, [pointsToUse, totalPrice]);

  // Xử lý thay đổi số điểm người dùng muốn trừ
  const handlePointsChange = (e) => {
    const value = e.target.value;
    if (value <= userLogin.points) {
      setPointsToUse(value);
    } else {
      alert("Bạn không có đủ điểm tích lũy");
    }
  };

  useEffect(() => {
    sessionStorage.removeItem("STORE");
    const data = { room: id, user: userLogin };
    socketRef.current.emit("join-room", data);
    dispatch(layDanhSachGheTheoLichChieu(id, userLogin));
    dispatch(chiTietLichChieuAction(id));
    // setState(Date.now() + 5 * 60 * 1000);
    setState(Date.now() + 10 * 60 * 1000);
  }, []);
  //! event leave Room
  useEffect(() => {
    const leaveRoom = () => {
      const payloadLeaveRoom = {
        room: id,
        user: userLogin,
        seats: listGheRef.current,
      };
      socketRef.current.emit("leaveRroom", payloadLeaveRoom);
    };

    window.addEventListener("beforeunload", () => {
      leaveRoom();
    });

    return () => {
      leaveRoom();
      window.removeEventListener("beforeunload", leaveRoom);
    };
  }, [userLogin, id]);

  useEffect(() => {
    socketRef.current.on("receive-order-seat", (data) => {
      dispatch(layDanhSachGheTheoLichChieu(props.match.params.id, userLogin));
    });
  }, []);

  //! Function
  const showLeaveConfirm = () => {
    confirm({
      title: "Bạn có chắc muốn rời khỏi phòng Đặt vé ?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      cancelType: "success",
      cancelText: "No",
      onOk() {
        socket.emit("leaveRroom", data);
        history.push("/");
      },
      onCancel() {},
    });
  };

  const handleSocket = useCallback(
    (userLogin, idShowtime, ghe) => {
      const data = {
        user: userLogin,
        room: idShowtime,
        seat: ghe,
      };
      socketRef.current.emit("choice-seat", data);
    },
    [dispatch]
  );

  //! Render
  const renderListGhe = () => {
    if (showTimeEdit?.room.size === "M") {
      return (
        <RoomSizeM
          seat_of_row={16}
          lstGhe={lstGhe}
          userLogin={userLogin}
          handleSocket={handleSocket}
          idShowtime={id}
        />
      );
    }
    if (showTimeEdit?.room.size === "L") {
      return (
        <RoomSizeL
          seat_of_row={20}
          lstGhe={lstGhe}
          userLogin={userLogin}
          handleSocket={handleSocket}
          idShowtime={id}
        />
      );
    }
    if (showTimeEdit?.room.size === "S") {
      return (
        <RoomSizeS
          seat_of_row={16}
          lstGhe={lstGhe}
          userLogin={userLogin}
          handleSocket={handleSocket}
          idShowtime={id}
        />
      );
    }
    if (!sizeConst.includes(showTimeEdit?.room.size)) {
      return (
        <RoomNoraml
          seat_of_row={16}
          lstGhe={lstGhe}
          userLogin={userLogin}
          handleSocket={handleSocket}
          idShowtime={id}
        />
      );
    }
  };

  return (
    <div className="grid grid-cols-12 h-screen">
      {/* Main Content */}
      <div className="col-span-9 p-5 dark:bg-slate-900 overflow-y-auto">
        {/* Back Button */}
        <div
          onClick={() => {
            if (listGheDangDat.length > 0) {
              showLeaveConfirm();
            } else {
              history.push("/");
            }
          }}
          className="flex items-center mb-4 cursor-pointer"
        >
          <Tooltip placement="right" title="Trở về trang home" color="blue">
            <ArrowLeftOutlined style={{ fontSize: 25, color: "#DB4848" }} />
          </Tooltip>
        </div>

        {/* Film and Show Information */}
        <div className="flex justify-between items-start bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <div className="flex items-center">
            <img
              className="w-16 h-16 rounded-full"
              src={`${DOMAIN_STATIC_FILE}${film?.imgFilm}`}
              alt={film?.imgFilm}
            />
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {film.groupName} - Rạp {film.rapChieu} - Phòng{" "}
                {showTimeEdit?.room?.roomName}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {moment(film.showDate).format("DD/MM/YYYY hh:mm A")}
              </p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Thời gian giữ ghế
            </p>
            <h2 className="text-2xl font-bold text-red-600 dark:text-white">
              <Countdown
                onComplete={() => {
                  socket.emit("leaveRroom", data);
                  alert("Quá thời gian Đặt vé");
                  history.push("/");
                }}
                daysInHours
                date={state}
              />
            </h2>
          </div>
        </div>

        {/* Screen Section */}
        <div className="my-6 text-center">
          <div className="h-2 w-full bg-black opacity-80 rounded-full"></div>
          <div className="relative mt-6">
            <div className={`${style.trapezoid} bg-gray-300 dark:bg-gray-700`}>
              <h4 className="text-lg text-black dark:text-white">Screen</h4>
            </div>
          </div>
          <div className="mt-4">{renderListGhe()}</div>
        </div>

        {/* Color Legend */}
        <div className="mt-8">
          <table className="table-auto w-full text-center border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="text-gray-700 dark:text-white">Ghế Trống</th>
                <th className="text-gray-700 dark:text-white">Ghế Đã Đặt</th>
                <th className="text-gray-700 dark:text-white">Ghế Bạn Đặt</th>
                <th className="text-gray-700 dark:text-white">
                  Ghế Bạn Đang Chọn
                </th>
                <th className="text-gray-700 dark:text-white">Ghế Đang Giữ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="ghe"></td>
                <td className="gheDaDat"></td>
                <td className="gheBanDat"></td>
                <td className="gheBanDangDat"></td>
                <td className="gheNguoiKhacDat"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Popcorn and Drinks */}
        <div className="mt-8">
          <PopcornDrinks />
        </div>
      </div>

      {/* Sidebar */}
      <div className="col-span-3 p-6 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl">
        <div className="flex flex-col space-y-6">
          <hr className="border-gray-300 dark:border-gray-600" />

          {/* Film Details */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {film.nameFilm}
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Rạp: {film.groupName} - {film.rapChieu}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Phòng: {showTimeEdit?.room?.roomName}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Thời gian chiếu:{" "}
              {moment(film.showDate).format("DD/MM/YYYY hh:mm A")}
            </p>
          </div>

          <hr className="border-gray-300 dark:border-gray-600" />

          {/* Selected Seats */}
          <div className="grid grid-cols-5 gap-2 items-center">
            <span className="text-red-600 dark:text-white font-semibold text-lg">
              Ghế
            </span>
            <div className="col-span-4 flex flex-wrap gap-2">
              {_.sortBy(listGheDangDat, ["seatName"]).map((ghe, index) => (
                <span
                  key={index}
                  className="bg-gray-300 dark:bg-gray-600 rounded-md px-3 py-1 text-gray-800 dark:text-gray-200 font-medium"
                >
                  {ghe.seatName}
                </span>
              ))}
            </div>
          </div>
          {/* Total Price */}
          <div className="flex justify-between">
            <p className=" dark:text-white font-semibold text-lg">Tiền vé</p>
            <div className="text-center text-xl font-bold text-green-600">
              {listGheDangDat
                .reduce((tong, ghe) => tong + Number(ghe.price), 0)
                .toLocaleString()}{" "}
              VNĐ
            </div>
          </div>

          <hr className="border-gray-300 dark:border-gray-600" />
          {/* Selected Combos */}
          <div className=" from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
            <h3 className="text-red-600 dark:text-white font-semibold text-lg mb-0">
              Combo Đã chọn
            </h3>

            <div className="p-4 max-h-72 overflow-y-auto">
              {listCombo.length > 0 ? (
                listCombo.map((combo) => (
                  <div
                    key={combo.id}
                    className="flex items-center justify-between p-4 mb-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md transition-transform transform hover:scale-105"
                  >
                    <span className="flex-1 text-gray-800 dark:text-gray-200 truncate">
                      {combo.name}
                    </span>
                    <div className="flex items-center">
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded"
                        onClick={() => handleDecreaseQuantity(combo.id)}
                      >
                        -
                      </button>
                      <span className="text-gray-600 dark:text-gray-300 mx-2">
                        {combo.quantity}
                      </span>
                      <button
                        className="px-2 py-1 bg-green-500 text-white rounded"
                        onClick={() => handleIncreaseQuantity(combo.id)}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-gray-600 dark:text-gray-300 ml-2 font-medium">
                      {formatPrice(combo.price * combo.quantity)}
                    </span>
                    <button
                      onClick={() => handleRemoveCombo(combo.id)}
                      className="flex justify-center ml-2 text-red-600 hover:text-red-800 dark:text-red-400 bg-transparent hover:bg-red-100 dark:hover:bg-red-800 active:bg-red-200 dark:active:bg-red-900 focus:outline-none focus:ring focus:ring-red-300 dark:focus:ring-red-600 p-2 rounded-full transition ease-in-out duration-150"
                    >
                      <DeleteOutlined className="text-xl" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Bạn chưa chọn combo nào.
                </p>
              )}
            </div>
            <div className="flex justify-between">
              <span className="dark:text-white font-semibold text-lg mr-5">
                Tiền combo
              </span>
              <span className="text-xl font-bold text-green-600">
                {totalComboPrice.toLocaleString()} VNĐ
              </span>
            </div>
          </div>

          <hr className="border-gray-300 dark:border-gray-600" />
          {/* User Details */}
          <div>
            <p className="text-gray-600 dark:text-gray-300 mb-1 text-lg">
              E-mail
            </p>
            <p className="text-gray-800 dark:text-white text-xl font-medium">
              {userLogin.email}
            </p>
          </div>

          <hr className="border-gray-300 dark:border-gray-600" />

          <div>
            <p className="text-gray-600 dark:text-gray-300 mb-1 text-lg">
              Phone
            </p>
            <p className="text-gray-800 dark:text-white text-xl font-medium">
              {userLogin.phoneNumber}
            </p>
          </div>
          <hr className="border-gray-300 dark:border-gray-600" />

          <div>
            <p className="text-gray-600 dark:text-gray-300 mb-1 text-lg">
              Điểm tích lũy
            </p>
            <p className="text-gray-800 dark:text-white text-xl font-medium">
              {formatDiem(formik.values.points)}
            </p>
          </div>

          {/* Tổng tiền */}
          <div className="text-center">
            <div className="flex justify-between">
              <p className="text-red-600 font-bold text-xl mr-5">Thành tiền</p>
              <div className="text-center text-xl font-bold text-green-600">
                {formatPrice(totalPrice)}
              </div>
            </div>
            <div className="mt-2">
              <label className="block uppercase tracking-wide text-red-600 text-xl; font-bold mb-2">
                Số điểm muốn trừ
              </label>
              <Input
                type="number"
                value={pointsToUse}
                onChange={handlePointsChange}
                max={userLogin.points}
                placeholder="Nhập số điểm muốn sử dụng"
              />
            </div>
            <div className="flex justify-between mt-6">
              <p className="text-red-600 font-bold text-xl mr-5">
                Tổng tiền sau khi trừ điểm
              </p>
              <div className="text-center text-xl font-bold text-green-600">
                {formatPrice(totalAfterPoints)}
              </div>
            </div>
          </div>

          {/* Book Ticket Button */}
          <div
            onClick={() => {
              if (listGheDangDat.length > 0) {
                const thongTinVeDat = {
                  user: userLogin,
                  listCombos: listCombo,
                  listTicket: listGheDangDat,
                  totalAmount: totalPrice,
                  totalAfterPoints: totalAfterPoints,
                  pointsToUse: pointsToUse,
                  idShowTime: props.match.params.id,
                  film: film,
                  email: userLogin.email,
                };
                window.sessionStorage.setItem(
                  "STORE",
                  JSON.stringify(thongTinVeDat)
                );

                const ticketData = listGheDangDat.map((ghe) => ({
                  name: ghe.seatName,
                  sku: "ticket",
                  price: ghe.price,
                  currency: "USD",
                  quantity: 1,
                }));

                const comboData = listCombo.map((combo) => ({
                  name: combo.name,
                  sku: "combo",
                  price: combo.price,
                  currency: "USD",
                  quantity: combo.quantity,
                }));

                const data = [...ticketData, ...comboData];
                dispatch(RequirementCheckoutAction(data));
              } else {
                alert("Bạn cần chọn ghế ngồi");
              }
            }}
            className="mt-6"
          >
            <div className="py-4 rounded-xl bg-red-600 text-white text-2xl font-bold text-center cursor-pointer transition-transform transform hover:scale-105">
              Đặt vé
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
