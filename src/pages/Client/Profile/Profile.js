import React, { useEffect } from "react";
import { Button, Tabs } from "antd";
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
import { DOMAIN_STATIC_FILE } from "../../../utils/Settings/config";
import { Redirect } from "react-router-dom";
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
  console.log(userEdit);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      typeUser: userEdit?.type_user?.id,
      email: userEdit.email,
      userName: userEdit.userName,
      password: "",
      phoneNumber: userEdit.phoneNumber,
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
          className="flex flex-col py-4 sm:flex-row sm:justify-between"
        >
          <div className="flex w-full space-x-2 sm:space-x-4">
            <div
            // style={{
            //   backgroundImage: `url(${DOMAIN_STATIC_FILE}${ticket.imgFilm})`,
            //   backgroundSize: "cover",
            //   backgroundPosition: "center",
            // }}
            >
              <img
                className="flex-shrink-0 object-cover w-20 h-20 border-transparent rounded outline-none sm:w-32 sm:h-32 bg-coolGray-500 "
                src={`${DOMAIN_STATIC_FILE}${ticket.imgFilm}`}
                alt={ticket.tenPhim}
              />
            </div>

            <div className="flex flex-col justify-between text-base ">
              <p className="dark:text-white">{`Tên phim : ${ticket.nameFilm} `}</p>
              <p className="dark:text-white">{`Tên Rạp : ${ticket.groupName} / ${ticket.cinemaName}`}</p>
              <p className="dark:text-white">{`Phòng : ${ticket.roomName} `}</p>
              <p className="dark:text-white">
                {`Ngày đặt : ${moment(
                  _.head(ticket.lstTicket).createdAt
                ).format("DD-MM-YYYY HH:mm A")}`}{" "}
              </p>
              <p className="dark:text-white">
                {`Ngày Chiếu : ${moment(ticket.showDate).format(
                  "DD-MM-YYYY HH:mm A"
                )}`}{" "}
              </p>
              <div className="flex">
                <p className="dark:text-white"> Ghế số</p>
                <div className="grid grid-cols-10 gap-2 ml-9">
                  {ticket.lstTicket.map((ghe, index) => {
                    return (
                      <span className="mr-2 text-red-600" key={index}>
                        {ghe.seatName}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div
                style={{
                  height: "auto",
                  maxWidth: 100,
                  width: "100%",
                }}
              >
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={JSON.stringify(qr_generate)}
                  viewBox={`0 0 256 256`}
                />
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
