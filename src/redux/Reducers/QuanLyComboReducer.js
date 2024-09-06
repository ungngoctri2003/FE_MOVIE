import {
  SET_LIST_COMBO_WITH_USER,
  SET_COMBO_COUNT_BY_DAY,
} from "../Types/QuanLyComboType";

const initialState = {
  lstComboWithUser: [],
  comboCountByDay: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST_COMBO_WITH_USER: {
      state.lstComboWithUser = action.lstComboWithUser;
      return { ...state };
    }
    case SET_COMBO_COUNT_BY_DAY: {
      return { ...state, comboCountByDay: action.comboCountByDay };
    }
    default:
      return state;
  }
};
