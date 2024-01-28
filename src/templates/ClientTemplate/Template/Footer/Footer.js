import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-6 bg-coolGray-100 text-coolGray-900 border-t-2 dark:bg-slate-900 bg-white">
      <div className="container px-6 mx-auto space-y-6 divide-y divide-coolGray-400 md:space-y-12 divide-opacity-50">
        <div className="grid grid-cols-12">
          <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
            <a
              href="#"
              className="flex justify-center space-x-3 md:justify-start"
            >
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-600">
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="132.000000pt"
                  height="55.000000pt"
                  viewBox="0 0 132.000000 55.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,55.000000) scale(0.100000,-0.100000)"
                    fill="#000000"
                    stroke="none"
                  >
                    <path
                      d="M150 415 c0 -93 1 -97 29 -126 58 -57 146 -21 146 60 0 59 -30 86
                    -95 85 -49 0 -49 0 -52 35 -2 19 -9 36 -15 39 -10 3 -13 -20 -13 -93z m128
                    -27 c15 -15 15 -61 0 -76 -21 -21 -66 -14 -84 13 -15 23 -15 27 0 50 18 27 63
                    34 84 13z"
                    />
                    <path
                      d="M530 412 c0 -107 10 -133 58 -147 18 -5 22 -2 22 14 0 12 -7 21 -15
                    21 -19 0 -35 31 -35 69 0 23 5 30 22 33 34 5 37 38 4 38 -21 0 -26 5 -26 24 0
                    13 -7 29 -15 36 -13 11 -15 0 -15 -88z"
                    />
                    <path
                      d="M371 414 c-69 -58 -16 -168 72 -150 69 14 77 49 9 40 -37 -5 -51 -2
                    -61 10 -12 14 -7 16 52 16 36 0 68 4 71 9 11 18 -17 72 -45 86 -40 21 -63 19
                    -98 -11z m83 -20 c31 -12 15 -24 -30 -24 -40 0 -45 2 -34 15 13 16 38 19 64 9z"
                    />
                    <path
                      d="M665 428 c-11 -6 -26 -18 -32 -26 -18 -22 -16 -83 2 -109 19 -26 75
                    -39 103 -24 14 7 23 8 27 1 16 -25 25 -5 25 54 0 59 -2 66 -31 90 -33 28 -62
                    32 -94 14z m77 -45 c36 -33 11 -83 -42 -83 -45 0 -66 52 -34 84 20 21 53 20
                    76 -1z"
                    />
                    <path
                      d="M300 200 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0
                    -10 -4 -10 -10z"
                    />
                    <path
                      d="M170 140 c-43 -43 -13 -120 48 -122 32 -1 72 25 59 38 -3 3 -13 -1
                    -22 -10 -22 -21 -48 -20 -69 3 -25 28 -17 72 16 90 24 14 28 14 47 -3 24 -22
                    40 -14 21 9 -18 22 -76 19 -100 -5z"
                    />
                    <path
                      d="M300 90 c0 -40 4 -70 10 -70 6 0 10 30 10 70 0 40 -4 70 -10 70 -6 0
                    -10 -30 -10 -70z"
                    />
                    <path
                      d="M340 90 c0 -81 17 -95 22 -19 2 38 8 55 23 65 32 21 49 2 56 -63 l6
                    -58 2 61 c1 64 -9 84 -44 84 -12 0 -26 -5 -33 -12 -9 -9 -12 -9 -12 0 0 7 -4
                    12 -10 12 -6 0 -10 -30 -10 -70z"
                    />
                    <path
                      d="M490 133 c-23 -30 -22 -76 4 -101 19 -19 74 -18 94 1 22 22 7 35 -16
                    14 -24 -22 -45 -21 -65 1 -30 33 -21 42 44 42 58 0 60 1 54 23 -16 53 -80 64
                    -115 20z m85 -3 c24 -27 17 -32 -41 -28 l-49 3 23 23 c27 27 44 28 67 2z"
                    />
                    <path
                      d="M630 88 c0 -39 4 -68 10 -68 6 0 10 25 10 55 0 42 4 56 18 63 32 17
                    42 3 42 -59 0 -33 4 -59 10 -59 6 0 10 22 10 49 0 46 17 81 39 81 19 0 31 -29
                    31 -77 0 -29 5 -53 10 -53 13 0 13 81 0 114 -7 20 -17 26 -39 26 -16 0 -33 -5
                    -36 -10 -5 -8 -11 -8 -19 -1 -7 6 -29 10 -49 9 l-37 -1 0 -69z"
                    />
                    <path
                      d="M850 145 c-18 -22 -4 -31 16 -11 9 10 23 15 31 12 8 -3 17 -6 19 -6
                    2 0 4 -8 4 -18 0 -13 -12 -22 -39 -31 -47 -14 -57 -35 -31 -61 20 -20 46 -18
                    63 4 6 8 10 7 14 -1 2 -7 8 -13 12 -13 11 0 1 112 -11 128 -14 17 -63 15 -78
                    -3z m60 -100 c-14 -17 -46 -20 -55 -5 -9 15 12 38 38 42 25 3 34 -16 17 -37z"
                    />
                    <path
                      d="M971 141 c-12 -21 -1 -38 42 -64 15 -10 27 -22 27 -28 0 -16 -31 -23
                    -51 -11 -25 16 -34 15 -20 -2 19 -22 49 -25 72 -7 26 21 17 44 -28 71 -33 19
                    -35 22 -20 37 13 14 19 14 32 3 8 -7 19 -10 22 -6 4 4 1 11 -7 16 -25 16 -59
                    11 -69 -9z"
                    />
                  </g>
                </svg>
              </div>
              <span className="self-center text-2xl font-semibold">
                Beta Cinemas
              </span>
            </a>
          </div>
          <div className="col-span-6 text-center md:text-left md:col-span-3">
            <p className="pb-1 text-2xl font-medium text-black dark:text-white">
              Điều khoản sử dụng
            </p>
            <ul>
              <li>
                <NavLink
                  to="/GeneralTerms"
                  className="hover:text-violet-600 text-black dark:text-white text-lg"
                >
                  Điều khoản chung
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/PrivacyPolicy"
                  className="hover:text-violet-600 text-black dark:text-white text-lg"
                >
                  Chính sách bảo mật
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Questions"
                  className="hover:text-violet-600 text-black dark:text-white text-lg"
                >
                  Câu hỏi thường gặp
                </NavLink>
              </li>
              {/**/}
            </ul>
          </div>
          <div className="col-span-6 text-center md:text-left md:col-span-3">
            <p className="pb-1 text-2xl font-medium text-black dark:text-white">
              Chăm sóc khách hàng
            </p>
            <ul>
              <li>
                <p className="text-black dark:text-white mb-1 text-lg">
                  Hotline: 19001900
                </p>
              </li>
              <li>
                <p className="text-black dark:text-white mb-1 text-lg">
                  Giờ làm việc : 8:00 - 22:00 hàng ngày
                </p>
              </li>
              <li>
                <p className="text-black dark:text-white mb-1 text-lg">
                  Email hỗ trợ : lamcongtri2003@gmail.com
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid justify-center pt-6 lg:justify-between">
          <div className="flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6">
            <span className="text-black dark:text-white">
              ©2024 All rights reserved
            </span>
            <a href="#">
              <span>Privacy policy</span>
            </a>
            <a href="#">
              <span>Terms of service</span>
            </a>
          </div>
          <div className="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
            <a
              href="#"
              title="Email"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-600 text-coolGray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </a>
            <a
              href="#"
              title="Twitter"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-600 text-coolGray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
