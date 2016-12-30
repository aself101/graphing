import { combineReducers } from 'redux';
import commerceReducer from './commerce_reducer';


const rootReducer = combineReducers({
  data: commerceReducer
});

export default rootReducer;
