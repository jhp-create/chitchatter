import { 
  ADD_SOCKET, 
  GET_HISTORY, 
  ADD_MESSAGE, 
  ADD_USERLIST, 
  GET_MEMBERS,
  FILTER_USERLIST 
} from '../actions/index';

const INITIAL_STATE = { users: [], messages: [], socket: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_SOCKET:
      return {
        ...state,
        socket: action.socket
      }
    case GET_HISTORY:
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.history
        ]
      }
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          action.message
        ]
      }
    case ADD_USERLIST:
      return {
        ...state,
        users: [
          ...state.users,
          action.user
        ]
      }
    case GET_MEMBERS:
      return {
        ...state,
        users: [
          ...state.users,
          ...action.members
        ]
      }
    case FILTER_USERLIST:
      return {
        ...state,
        users: [
          ...action.list
        ]
      }
    default:
      return state;
  }
}