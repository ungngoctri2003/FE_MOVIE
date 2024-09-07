import { baseServices } from "./baseServices";

export class QuanLyComboServices extends baseServices {
  constructor() {
    super();
  }

  // Tạo combo mới
  taoCombo = (dataCreate) => {
    return this.post(`/comboBy`, dataCreate);
  };

  // Lấy danh sách combo theo người dùng
  danhSachComboTheoUser = (idUser) => {
    return this.get(`/comboBy/listCombos/${idUser}`);
  };

  // Lấy tổng giá trị combo theo tháng
  toTalComboTheoThang = (year) => {
    return this.get(`/comboBy/total/month?year=${year}`);
  };

  // Lấy tổng giá trị combo theo ngày
  toTalComboTheoNgay = (year, month) => {
    return this.get(`/comboBy/total/day?year=${year}&month=${month}`);
  };

  // Đếm combo theo ngày
  layComboTheoNgay = (year, month, day) => {
    return this.post(`/comboBy/day`, { year, month, day });
  };
}

export const quanLyComboServices = new QuanLyComboServices();
