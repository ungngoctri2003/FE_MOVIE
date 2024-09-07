import { baseServices } from "./baseServices";

export class QuanLyTicketServices extends baseServices {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  datVe = (dataCreate) => {
    return this.post(`/tickets`, dataCreate);
  };
  danhSachVeTheoUser = (idUser) => {
    return this.get(`/tickets/listTicket/${idUser}`);
  };
  toTal = (year) => {
    return this.get(`/tickets/total?year=${year}`);
  };
  toTalByDay = (year, month) => {
    return this.get(`/tickets/totalByDay?year=${year}&month=${month}`);
  };
  // Lấy danh sách phim bán chạy nhất trong tháng
  getTopMoviesInMonth = (year, month) => {
    return this.get(`/tickets/topMoviesInMonth?year=${year}&month=${month}`);
  };
  layTicketTheoNgay = (year, month, day) => {
    return this.post(`/tickets/day`, { year, month, day });
  };
}
export const quanLyTicketServices = new QuanLyTicketServices();
