import { combineReducers } from 'redux';
import {
  SELECTED
} from '../actions/index';

function selectedOption(state = 'colors', action) {
  switch (action.type) {
    case SELECTED:
      return action.option;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  selectedOption
});

export default rootReducer;