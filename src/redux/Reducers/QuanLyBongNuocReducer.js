import {
  COMBO_EDIT,
  SET_COMBOS,
  ADD_TO_CART,
  UPDATE_CART,
  SET_DETAIL_COMBO,
} from "../Types/QuanLyBongNuocType";
import { ComboModel } from "../../_core/Models/ComboModel";

const initialState = {
  lstCombos: [],
  comboEdit: new ComboModel(),
  cart: [],
  detailCombo: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COMBOS: {
      state.lstCombos = action.dataCombos;
      return { ...state };
    }
    case COMBO_EDIT: {
      state.comboEdit = action.comboEdit;
      return { ...state };
    }
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case UPDATE_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case "UPDATE_COMBO_QUANTITY": {
      const { comboId, change } = action.payload;
      const updatedCart = state.cart.map((combo) =>
        combo.id === comboId
          ? { ...combo, quantity: Math.max(combo.quantity + change, 1) } // Đảm bảo số lượng không nhỏ hơn 1
          : combo
      );
      return { ...state, cart: updatedCart };
    }
    case "REMOVE_COMBO": {
      return {
        ...state,
        cart: state.cart.filter((combo) => combo.id !== action.payload),
      };
    }
    case SET_DETAIL_COMBO: {
      return { ...state, detailCombo: action };
    }
    default:
      return state;
  }
};
