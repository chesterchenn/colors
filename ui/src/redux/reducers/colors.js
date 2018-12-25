import {
  COLORS_RECEIVE
} from '../actions/colors';

const initState = {
  colors: []
}

const colorsReducer = (state = initState, action) => {
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

export default colorsReducer;