import { quanLyComboServices } from "../../services/QuanLyComboService";
import { DISPLAY_LOADING, HIDDEN_LOADING } from "../Types/LoadingType";
import {
  SET_LIST_COMBO_WITH_USER,
  SET_COMBO_COUNT_BY_DAY,
} from "../Types/QuanLyComboType";

export const taoCombo = (dataCreate) => {
  return async (dispatch) => {
    try {
      const result = await quanLyComboServices.taoCombo(dataCreate);
      if (result.status === 201) {
        sessionStorage.removeItem("STORE");
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const danhSachComboTheoUser = (idUser) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DISPLAY_LOADING });
      const result = await quanLyComboServices.danhSachComboTheoUser(idUser);
      if (result.status === 200) {
        dispatch({
          type: SET_LIST_COMBO_WITH_USER,
          lstComboWithUser: result.data,
        });
      }
      dispatch({ type: HIDDEN_LOADING });
    } catch (error) {
      console.error(error);
      dispatch({ type: HIDDEN_LOADING });
    }
  };
};

export const getComboCountByDayAction = (year, month) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DISPLAY_LOADING });
      const result = await quanLyComboServices.getComboCountByDay(year, month);
      if (result.status === 200) {
        dispatch({
          type: SET_COMBO_COUNT_BY_DAY,
          comboCountByDay: result.data,
        });
      }
      dispatch({ type: HIDDEN_LOADING });
    } catch (error) {
      console.error(error);
      dispatch({ type: HIDDEN_LOADING });
    }
  };
};
