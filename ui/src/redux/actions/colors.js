import API from '../../config/API';
import { fetch } from 'whatwg-fetch';
// ===========================
// Constants
// ===========================
export const COLORS_REQUEST = 'COLORS_REQUEST';
export const COLORS_RECEIVE = 'COLORS_RECEIVE';

// ===========================
// Action Creators
// ===========================
export function colorsRequest() {
  return {
    type: COLORS_REQUEST
  }
}

export function colorsReceive(list) {
  return {
    type: COLORS_RECEIVE,
    list
  }
}

export const fetchColors = () => dispatch => {
  dispatch(colorsRequest());
  return fetch(API.colors)
    .then(response => 
      response.json()
    ).then(json => 
      dispatch(colorsReceive(json))
    );
}