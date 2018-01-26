import { ADD_USER, ADD_ROOM } from '../actions/index';

const INITIAL_STATE = { username: '', room: '' };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        username: action.name
      };
    case ADD_ROOM:
      return {
        ...state,
        room: action.room
      }
    default:
      return state;
  }
}