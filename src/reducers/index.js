import { combineReducers } from 'redux';
import User from './reducerUser';
import Chatroom from './reducerChatroom';

const rootReducer = combineReducers({
  user: User,
  chatroom: Chatroom
});

export default rootReducer;