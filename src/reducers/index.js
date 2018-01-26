import { combineReducers } from 'redux';
import User from './reducerUser';

const rootReducer = combineReducers({
  user: User
});

export default rootReducer;