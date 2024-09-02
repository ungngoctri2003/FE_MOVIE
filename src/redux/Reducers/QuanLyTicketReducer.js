import {
  SET_CHANGE_TABS,
  SET_LIST_TICKET_WITH_USER,
  SET_TICKET_COUNT_BY_DAY,
} from "../Types/QuanLyTicketType";

const initialState = {
  lstTicketWithUser: [],
  tabChange: 1,
  store: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST_TICKET_WITH_USER: {
      state.lstTicketWithUser = action.lstTicketWithUser;
      return { ...state };
    }
    case SET_CHANGE_TABS: {
      return { ...state, tabChange: action.number };
    }
    case SET_TICKET_COUNT_BY_DAY: {
      return { ...state, ticketCountByDay: action.ticketCountByDay };
    }

    default:
      return state;
  }
};
