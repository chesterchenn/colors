import 'whatwg-fetch';

export const SELECTED = 'SELECTED';
export const REQUEST = 'REQUEST';
export const RECEIVE = 'RECEIVE';

export function selected(option) {
  return {
    type: SELECTED,
    option
  }
}

export function request(option) {
  return {
    type: REQUEST,
    option
  }
}

export function receive(option, json) {
  return {
    type: RECEIVE,
    option,
    itmes: json
  }
}

export function fetchItems(option) {
  return function(dispatch) {
    dispatch(request(option));
    return fetch(`/api/db/${option}`)
      .then(json => dispatch(receive(option, json)))
  }
}