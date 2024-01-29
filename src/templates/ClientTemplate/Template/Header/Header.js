import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { history } from "../../../../App";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Dropdown } from "antd";
import { DownOutlined, QqOutlined } from "@ant-design/icons";
import _ from "lodash";
import { SIGN_OUT } from "../../../../redux/Types/QuanLyNguoiDungType";
import styles from "./Header.module.css";

export default function Header(props) {
  const userLogin = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
  console.log({ userLogin });
  const dispatch = useDispatch();
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <NavLink to="/Profile">Thông tin cá nhân</NavLink>
      </Menu.Item>
      <Menu.Item key="1">
        <NavLink
          onClick={() => {
            dispatch({ type: SIGN_OUT });
          }}
          to="/home"
        >
          Đăng xuất
        </NavLink>
      </Menu.Item>
    </Menu>
  );

  const handleLogin = () => {
    return (
      <div className={`${styles.rs_btn}`} id="rs_btn">
        {_.isEmpty(userLogin) ? (
          <div className="items-center  flex-shrink-0 flex ">
            <button
              onClick={() => {
                history.push("/signIn");
              }}
              className={`${styles.rs_header} flex items-center self-center px-6 py-3 font-semibold rounded hover:bg-violet-600 text-black dark:text-white hover:text-blue-400  dark:hover:text-blue-400 hover:animate-pulse`}
            >
              <ion-icon className="" name="log-in"></ion-icon>
              <span className="ml-1 ">Đăng Nhập</span>
            </button>
            <button
              onClick={() => {
                history.push("/signUp");
              }}
              className={`${styles.rs_header} flex items-center self-center px-6 py-3 font-semibold rounded hover:bg-violet-600 text-black dark:text-white hover:text-blue-400  dark:hover:text-blue-400 hover:animate-pulse`}
            >
              <ion-icon name="log-out"></ion-icon>

              <span className="ml-1 "> Đăng Kí</span>
            </button>
          </div>
        ) : (
          <div className="items-center  justify-center flex-shrink-0 hidden lg:flex text-black dark:text-white">
            <Dropdown overlay={menu} trigger={["click"]}>
              <a
                className="flex justify-center items-center  ant-dropdown-link text-black dark:text-white dark:hover:text-blue-400"
                onClick={(e) => e.preventDefault()}
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={userLogin.avatar}
                />
                <span className="mx-2 text-xl">{userLogin.userName}</span>
                <DownOutlined />
              </a>
            </Dropdown>
            {userLogin?.typeUser.type !== "CLIENT" ? (
              <div className="mb-0 ml-3 text-xl flex justify-center items-center hover:text-blue-400 dark:hover:text-blue-400">
                <p className="mb-0">
                  <QqOutlined />
                </p>
                <NavLink
                  className="text-black dark:text-white dark:hover:text-blue-400"
                  to="/Admin/Home"
                >
                  Quản lý
                </NavLink>
              </div>
            ) : (
              <Fragment></Fragment>
            )}
          </div>
        )}
      </div>
    );
  };
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );
  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const options = [
    {
      icon: "sunny",
      text: "light",
    },
    {
      icon: "moon",
      text: "dark",
    },
    {
      icon: "desktop-outline",
      text: "system",
    },
  ];
  function onWindowMatch() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }
  onWindowMatch();
  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme]);
  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  });

  return (
    <div className="relative">
      <nav className=" border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:text-gray-100 dark:bg-slate-900 duration-100 text-coolGray-800 fixed z-10 w-full bg-white">
        <div className="lg:container flex flex-wrap justify-between items-center mx-auto">
          <NavLink to="/home" className="flex items-center">
            <img src="beta.png" className={``} alt="Logo" />
          </NavLink>

          <div className=" md:block md:w-auto  lg:flex " id="mobile_menu">
            <ul className="flex justify-center items-center h-full mb-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium mx-5">
              <li className="hover:animate-pulse">
                <NavLink
                  to="/home"
                  className={`${styles.rs_header} flex px-6 py-5 h-full  font-semibold dark:text-white hover:bg-violet-600  dark:hover:text-blue-400 rounded md:bg-transparent text-black md:p-0" aria-current="page" activeClassName='text-yellow-700`}
                >
                  <ion-icon name="home-outline"></ion-icon>
                  <span className="ml-1 ">Trang Chủ</span>
                </NavLink>
              </li>
              <li className="hover:animate-pulse ">
                <NavLink
                  to="/GroupCinema"
                  className={`${styles.rs_header} flex px-6 py-5 h-full  font-semibold dark:text-white hover:bg-violet-600  dark:hover:text-blue-400 dark:hover:text-blue-400 rounded md:bg-transparent text-black md:p-0" activeClassName='text-blue-700`}
                >
                  <ion-icon name="film-outline"></ion-icon>
                  <span className="ml-1">Cụm Rạp</span>
                </NavLink>
              </li>
            </ul>
          </div>
          {handleLogin()}
          {/* dark/ light */}
          <div className=" top-5 right-10 duration-100 dark:bg-slate-800 bg-gray-100 rounded hidden md:block">
            {options?.map((opt) => (
              <button
                key={opt.text}
                onClick={() => setTheme(opt.text)}
                className={`w-8 h-8 leading-9 text-xl rounded-full m-1 ${
                  theme === opt.text && "text-sky-600"
                }`}
              >
                <ion-icon name={opt.icon}></ion-icon>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
