import { quanLyPointsService } from "../../services/QuanLyPointsService";

export const taoPoints = (dataCreate) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPointsService.datVe(dataCreate);
      if (result.status === 201) {
        sessionStorage.removeItem("STORE");
      }
    } catch (error) {
      // message.error("Thất Bại");
      console.log(error);
    }
  };
};
