import { history } from "../../App";
import { quanLyBongNuocServices } from "../../services/QuanLyBongNuocService";
import {
  SET_COMBOS,
  COMBO_EDIT,
  ADD_TO_CART,
  UPDATE_CART,
} from "../Types/QuanLyBongNuocType";
import { message } from "antd";
import { DISPLAY_LOADING, HIDDEN_LOADING } from "../Types/LoadingType";

export const layDanhSachComboAction = (name = "") => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyBongNuocServices.layDanhSachCombo(name);
      if (result.status === 200) {
        dispatch({
          type: SET_COMBOS,
          dataCombos: result.data,
        });
        dispatch({
          type: HIDDEN_LOADING,
        });
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("ERROR");
    }
  };
};

export const themComboAction = (comboCreate) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyBongNuocServices.themCombo(comboCreate);
      if (result.status === 201) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Thêm Thành Công");
        history.push(`/Admin/Combos`);
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("Thất Bại");
    }
  };
};

export const xoaComboAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyBongNuocServices.xoaCombo(id);
      if (result.status === 200) {
        dispatch(layDanhSachComboAction());
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Xóa thành công");
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("Thất bại");
    }
  };
};

export const chiTietComboAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyBongNuocServices.chiTietCombo(id);
      if (result.status === 200) {
        dispatch({
          type: COMBO_EDIT,
          comboEdit: result.data,
        });
        dispatch({
          type: HIDDEN_LOADING,
        });
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
    }
  };
};

export const capNhatComboAction = (id, comboEdit) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyBongNuocServices.capNhatCombo(id, comboEdit);
      if (result.status === 200) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Cập nhật thành công");
        history.push(`/Admin/Combos`);
      } else {
        message.error("Thất bại");
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("Thất Bại");
    }
  };
};
export const addToCart = (combo) => {
  return {
    type: ADD_TO_CART,
    payload: combo,
  };
};

export const updateCart = (cart) => {
  return {
    type: UPDATE_CART,
    payload: cart,
  };
};
export const updateComboQuantity = (comboId, change) => {
  return {
    type: "UPDATE_COMBO_QUANTITY",
    payload: { comboId, change },
  };
};
export const removeCombo = (comboId) => ({
  type: "REMOVE_COMBO",
  payload: comboId,
});
