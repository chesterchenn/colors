import {
  COLORS_RECEIVE
} from '../actions/colors';

const initState = {
  list: []
}

const colors = (state = initState, action) => {
  switch (action.type) {
    case COLORS_RECEIVE:
      return {
        ...state,
        list: action.list
      }
    default:
      return state;
  }
}

export default colors;