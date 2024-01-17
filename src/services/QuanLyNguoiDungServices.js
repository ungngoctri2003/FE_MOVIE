import { baseServices } from "./baseServices";
import { passwordServices } from "./PasswordServices";
export class QuanLyNguoiDungServices extends baseServices {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  sendVerifyEmail = (email) => {
    return this.post(`users/sendVerify`, { email });
  };
  signUp = (thongTinUser) => {
    return this.post(`/users/signUp`, thongTinUser);
  };
  signIn = (thongTinUser) => {
    return this.post(`/users/signIn`, thongTinUser);
  };
  layDanhSachNguoiDung = (name) => {
    return this.get(`users?name=${name}`);
  };
  layNguoiDungTheoMaLichChieu = (idLichChieu) => {
    return this.get(`/users/userWithShowTime?id=${idLichChieu}`);
  };
  layChiTietNguoiDung = (id) => {
    return this.get(`users/${id}`);
  };
  capNhatNguoiDung = (id, userUpdate) => {
    return this.put(`users/${id}`, userUpdate);
  };
  themNguoiDung = (userCraete) => {
    return this.post(`users/signUp`, userCraete);
  };
  lockAndUnlock = (id, userLock) => {
    return this.put(`users/block/${id}`, userLock);
  };
  xoaNguoiDung = (id) => {
    return this.delete(`users/${id}`);
  };
  // Thêm các hàm mới cho forgotPassword và resetPassword
  forgotPassword = (email) => {
    return passwordServices.forgotPassword(email);
  };

  resetPassword = (resetToken, newPassword) => {
    return passwordServices.resetPassword(resetToken, newPassword);
  };
}

export const quanLyNguoiDungServices = new QuanLyNguoiDungServices();
