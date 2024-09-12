import React, { useEffect } from "react";
import { Tabs } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import moment from "moment";
import QRCode from "react-qr-code";
import {
  SendVerifyEmailAction,
  capNhatNguoiDungAction,
  layChiTietNguoiDungAction,
} from "../../../redux/Actions/QuanLyNguoiDungAction";
import { danhSachVeTheoUserAction } from "../../../redux/Actions/QuanLyTicketAction";
import { danhSachComboTheoUser } from "../../../redux/Actions/QuanLyComBoAction";
import { DOMAIN_STATIC_FILE } from "../../../utils/Settings/config";
import { Redirect } from "react-router-dom";
import { checkoutServices } from "../../../services/CheckoutServices";
import { formatDiem, formatPrice } from "../../../utils/formatPrice";

export default function Profile(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  if (JSON.stringify(userLogin) === "{}") {
    alert("Bạn cần đăng nhập");
    return <Redirect to="/home" />;
  }
  const { TabPane } = Tabs;
  return (
    <div className="py-20 container ">
      <Tabs className="dark:text-white" defaultActiveKey="1" centered>
        <TabPane tab="Thông tin cá nhân" key="1">
          <DetailsProfile {...props} />
        </TabPane>
        <TabPane tab="Lịch sử đặt vé" key="2">
          <BookingHistory {...props} />
        </TabPane>
        <TabPane tab="Combo đã mua" key="3">
          <ComBoHistory {...props} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export function DetailsProfile(props) {
  const { userEdit, userLogin } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layChiTietNguoiDungAction(userLogin?.id));
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      typeUser: userEdit?.type_user?.id,
      email: userEdit.email,
      userName: userEdit.userName,
      password: "",
      phoneNumber: userEdit.phoneNumber,
      points: userEdit?.points,
    },
    onSubmit: (values) => {
      dispatch(capNhatNguoiDungAction(userEdit.id, values));
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Tài khoản Không được trống"),
      email: Yup.string()
        .email("Email chưa đúng định dạng")
        .required("Email không được trống"),
      password: Yup.string()
        .required("Mật khẩu Không được trống")
        .min(6, "Bạn cần nhập ít nhất 6 kí tự")
        .max(9, "Bạn cần nhập ít hơn 10 kí tự"),
      phoneNumber: Yup.string().required("Số ĐT Không được trống"),
      points: Yup.number().required("Không được trống !"),
    }),
  });

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={formik.handleSubmit} className="w-full max-w-xl">
        <div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Email
              </label>
              <input
                name="email"
                disabled
                value={formik.values.email}
                onChange={formik.handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500"
                type="email"
                placeholder=" ...@gmail.com"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-700 mb-0">{formik.errors.email}</p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Tài khoản
              </label>
              <input
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Tài Khoản"
              />
              {formik.errors.userName && formik.touched.userName && (
                <p className="text-red-700 mb-0">{formik.errors.userName}</p>
              )}
            </div>
          </div>
          {/* User Points */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Điểm tích lũy
              </label>
              <input
                name="points"
                value={formatDiem(formik.values.points)}
                disabled
                className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="0"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Mật khẩu
              </label>
              <input
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="password"
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-700 mb-0">{formik.errors.password}</p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Số điện thoại
              </label>
              <input
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="0962...."
              />
              {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                <p className="text-red-700 mb-0">{formik.errors.phoneNumber}</p>
              )}
            </div>
          </div>
          {!userEdit.isVerify ? (
            <div className="flex flex-wrap -mx-3 mb-6 cursor-pointer hover:text-red-700">
              <div className="w-full  px-3 mb-6 md:mb-0">
                <p
                  className="dark:text-white dark:hover:text-red-700"
                  onClick={() => {
                    dispatch(
                      SendVerifyEmailAction(userEdit.email, userEdit.id)
                    );
                  }}
                >
                  Nhấn để xác thực tài khoản
                </p>
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-3 text-white text-base border   bg-blue-400 rounded"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
}

export function BookingHistory(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { lstTicketWithUser } = useSelector(
    (state) => state.QuanLyTicketReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(danhSachVeTheoUserAction(userLogin.id));
  }, []);

  const renderTicket = () => {
    return lstTicketWithUser.map((ticket, index) => {
      const qr_generate = {
        IDShowtime: ticket.IDShowtime,
        Film: ticket.nameFilm,
        Room: ticket.roomName,
        ShowDate: ticket.showDate,
      };
      return (
        <li
          key={index}
          className="flex flex-col mb-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg dark:bg-gray-800 dark:from-gray-700 dark:to-gray-900 sm:flex-row sm:justify-between hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex flex-col items-center space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row">
            <div className="relative flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32">
              <img
                className="object-cover w-full h-full rounded-lg border border-gray-300 dark:border-gray-700"
                src={`${DOMAIN_STATIC_FILE}${ticket.imgFilm}`}
                alt={ticket.tenPhim}
              />
            </div>
            <div className="flex flex-col justify-between flex-1 space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {ticket.nameFilm}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">{`Rạp: ${ticket.groupName} / ${ticket.cinemaName}`}</p>
              <p className="text-lg text-gray-600 dark:text-gray-400">{`Phòng: ${ticket.roomName}`}</p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {`Ngày đặt: ${moment(_.head(ticket.lstTicket).createdAt).format(
                  "DD-MM-YYYY HH:mm A"
                )}`}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {`Ngày chiếu: ${moment(ticket.showDate).format(
                  "DD-MM-YYYY HH:mm A"
                )}`}
              </p>
              <div className="flex flex-col space-y-2">
                <p className="text-lg font-medium text-gray-800 dark:text-gray-300">
                  Ghế số:
                </p>
                <div className="flex flex-wrap gap-2">
                  {ticket.lstTicket.map((ghe, index) => (
                    <span
                      className="px-2 py-1 text-sm font-medium text-red-600 bg-red-100 rounded dark:bg-red-600 dark:text-red-100"
                      key={index}
                    >
                      {ghe.seatName}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <div className="relative flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32">
                  <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={JSON.stringify(qr_generate)}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              </div>
            </div>
          </div>
        </li>
      );
    });
  };
  return (
    <div className="flex items-center justify-around">
      <div className="flex  flex-col max-w-3xl p-6 space-y-4 sm:p-10 bg-coolGray-50 text-coolGray-800">
        <ul className="flex  flex-col divide-y divide-coolGray-300">
          {renderTicket()}
        </ul>
      </div>
    </div>
  );
}
export function ComBoHistory(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { lstComboWithUser } = useSelector((state) => state.QuanLyComboReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userLogin?.id) {
      dispatch(danhSachComboTheoUser(userLogin.id));
    }
  }, [dispatch, userLogin]);

  const renderCombos = () => {
    console.log("check lstComboWithUser", lstComboWithUser);
    return lstComboWithUser.map((combo, index) => {
      return (
        <li
          key={index}
          className="flex flex-col mb-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg dark:bg-gray-800 dark:from-gray-700 dark:to-gray-900 sm:flex-row sm:justify-between hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex w-full space-x-6">
            <div className="relative w-24 h-24 sm:w-36 sm:h-36">
              <img
                className="object-cover w-full h-full rounded-lg"
                src={`${DOMAIN_STATIC_FILE}${combo.comboImage}`}
                alt={combo.comboName}
              />
              <div className="absolute top-0 left-0 p-1 text-lg font-semibold text-white bg-red-500 rounded-full dark:bg-red-600">
                {combo.quantity}x
              </div>
            </div>
            <div className="flex flex-col justify-between flex-1">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {combo.comboName}
              </h3>
              <p className="text-lg text-gray-500 dark:text-gray-400">{`Phim: ${combo.nameFilm}`}</p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{`${formatPrice(
                    combo.price
                  )} `}</p>
                  <p className="text-2xl text-red-600 font-bold">{`Tổng giá: ${formatPrice(
                    combo.price * combo.quantity
                  )}`}</p>
                </div>
                <div className="text-right text-lg text-gray-400 dark:text-gray-500">
                  <p>{moment(combo.createdAt).format("DD-MM-YYYY")}</p>
                  <p>{moment(combo.createdAt).format("HH:mm A")}</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      );
    });
  };

  return (
    <div className="flex items-center justify-around">
      <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 bg-coolGray-50 text-coolGray-800">
        <ul className="flex flex-col divide-y divide-coolGray-300">
          {renderCombos()}
        </ul>
      </div>
    </div>
  );
}
