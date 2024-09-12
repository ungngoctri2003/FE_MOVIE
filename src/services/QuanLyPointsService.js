import { baseServices } from "./baseServices";

export class QuanLyPointsService extends baseServices {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  datVe = (dataCreate) => {
    return this.post(`/points`, dataCreate);
  };
}
export const quanLyPointsService = new QuanLyPointsService();
