import { GET_FAKE_INFO } from '../actions';


export default function(state = {}, action) {
  switch (action.type) {
    case GET_FAKE_INFO:
      return Object.assign({}, {
        google: action.google,
        chart: action.chart,
        pie: action.pie
      });
    default:
      return state;
  }
}
