import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  signIn,
  forgotPasswordAction,
} from "../../../redux/Actions/QuanLyNguoiDungAction";

export default function SignIn(props) {
  const dispatch = useDispatch();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(signIn(values));
    },
  });
  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleForgotPasswordClose = () => {
    setShowForgotPassword(false);
  };

  const handleForgotPasswordSubmit = (values) => {
    dispatch(forgotPasswordAction(values.email));
    setShowForgotPassword(false);
  };
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full md:w-1/2 py-10 px-5 md:px-10"
    >
      <div className="text-center mb-10">
        <h1 className="font-bold text-3xl text-gray-900">Đăng Nhập</h1>
      </div>
      <div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
            <label className="text-xs font-semibold px-1">Tài Khoản</label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <i className="mdi mdi-email-outline text-gray-400 text-lg" />
              </div>
              <input
                name="email"
                onChange={formik.handleChange}
                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                placeholder="Mời nhập email"
              />
            </div>
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-12">
            <label className="text-xs font-semibold px-1">Mật khẩu</label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <i className="mdi mdi-lock-outline text-gray-400 text-lg" />
              </div>
              <input
                name="password"
                onChange={formik.handleChange}
                type="password"
                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                placeholder="************"
              />
            </div>
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
            <button
              type="submit"
              className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
            >
              Đăng Nhập
            </button>
          </div>
        </div>

        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
            <button
              type="button"
              onClick={handleForgotPasswordClick}
              className="block w-full max-w-xs mx-auto bg-gray-500 hover:bg-gray-700 focus:bg-gray-700 text-white rounded-lg px-3 py-3 font-semibold"
            >
              Quên mật khẩu
            </button>
          </div>
        </div>
        <div className=" text-center text- ">
          <NavLink to="/signUp">Bạn chưa có tài khoản ?</NavLink>
          <p className="mb-3">
            <NavLink to="/">Trang chủ</NavLink>
          </p>
        </div>
        {showForgotPassword && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-5 w-3/6 rounded-lg">
              <h2 className="text-2xl font-bold mb-5">Quên mật khẩu</h2>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label className="block text-sm font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleForgotPasswordClose}
                    className="mr-5 text-gray-600 hover:text-gray-800"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    onClick={() => handleForgotPasswordSubmit(formik.values)}
                    className="bg-indigo-500 hover:bg-indigo-700 text-white rounded px-3 py-2"
                  >
                    Gửi yêu cầu
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
