// ===========================
// Contants
// ===========================
const COLORS_API = '/api/db/colors';
export const COLORS_REQUEST = 'COLORS_REQUEST';
export const COLORS_RECEIVE = 'COLORS_RECEIVE';
export const COLORS_FAILURE = 'COLORS_FAILURE';

// ===========================
// Action Creators
// ===========================
export function colorsRequest() {
  return {
    type: COLORS_REQUEST
  }
}

export function colorsReceive(json) {
  return {
    type: COLORS_RECEIVE,
    colors: json
  }
}

export function colorsFailure() {
  return {
    type: COLORS_FAILURE
  }
}

export const fetchColors = () => dispatch => {
  dispatch(colorsRequest());
  return fetch(COLORS_API)
    .then(response => {
      return response.json()
    })
    .then(json => dispatch(colorsReceive(json)))
}