import {
  COMBO_EDIT,
  SET_COMBOS,
  CHON_COMBO,
} from "../Types/QuanLyBongNuocType";
import { ComboModel } from "../../_core/Models/ComboModel";

const initialState = {
  lstCombos: [],
  comboEdit: new ComboModel(),
  comboDaChon: [],
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

    default:
      return state;
  }
};
