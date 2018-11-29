import {
  COLORS_REQUEST,
  COLORS_RECEIVE
} from '../actions/colors';

const colors = (state = {}, action) => {
  switch (action.type) {
    case COLORS_RECEIVE:
      return {
        ...state,
        colors: action.colors
      }
    default:
      return state;
  }
}

const colorsReducer = (state = {}, action) => {
  switch (action.type) {
    case COLORS_REQUEST:
    case COLORS_RECEIVE:
      return {
        ...state,
        colors: colors(state, action)
      }
    default:
      return state;
  }
}

export default colorsReducer;