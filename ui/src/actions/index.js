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