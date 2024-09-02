import { baseServices } from "./baseServices";

export class QuanLyBongNuocServices extends baseServices {
  constructor() {
    super();
  }
  layDanhSachCombo = (name) => {
    return this.get(`/combos?name=${name}`);
  };
  themCombo = (dataCreate) => {
    return this.post(`/combos`, dataCreate);
  };
  xoaCombo = (id) => {
    return this.delete(`/combos/${id}`);
  };
  chiTietCombo = (id) => {
    return this.get(`/combos/${id}`);
  };
  capNhatCombo = (id, dataUpdate) => {
    return this.put(`/combos/${id}`, dataUpdate);
  };
}

export const quanLyBongNuocServices = new QuanLyBongNuocServices();
