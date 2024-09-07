import {
  LICH_CHIEU_EDIT,
  SET_LICH_CHIEU,
  SET_LICH_CHIEU_THEO_HE_THONG_RAP,
  SET_DETAIL_SHOW_TIME,
} from "./../Types/QuanLyLichChieuType";
import { ShowTime } from "../../_core/Models/ShowTimeModel";
const initialState = {
  lichChieu: [],
  showTimeEdit: new ShowTime(),
  showTime: [],
  detailTicket: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LICH_CHIEU: {
      state.lstShowTime = action.lstShowTime;
      return { ...state };
    }
    case LICH_CHIEU_EDIT: {
      state.showTimeEdit = action.showTimeEdit;
      return { ...state };
    }
    case SET_LICH_CHIEU_THEO_HE_THONG_RAP: {
      state.showTime = action.showTime;
      return { ...state };
    }
    case SET_DETAIL_SHOW_TIME: {
      return { ...state, detailTicket: action };
    }
    default:
      return state;
  }
};
