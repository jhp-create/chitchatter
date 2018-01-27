export const ADD_USER = 'ADD_USER';
export const ADD_ROOM = 'ADD_ROOM';
export const ADD_SOCKET = 'ADD_SOCKET';
export const GET_HISTORY = 'GET_HISTORY';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const ADD_USERLIST = 'ADD_USERLIST';
export const GET_MEMBERS = 'GET_MEMBERS';
export const FILTER_USERLIST = 'FILTER_USERLIST';

export function addUser(name) {
  return { 
    type: ADD_USER,
    name
  }
};

export function addRoom(room) {
  return { 
    type: ADD_ROOM,
    room
  }
};

export function addSocket(socket) {
  return {
    type: ADD_SOCKET,
    socket
  }
}

export function getHistory(history) {
  return {
    type: GET_HISTORY,
    history
  }
}

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    message
  }
}

export function addUserList(user) {
  return {
    type: ADD_USERLIST,
    user
  }
}

export function getMembers(members, username) {
  const membersList = [...members, `${username} (You)`];

  return {
    type: GET_MEMBERS,
    members: membersList
  }
}

export function filterUserList(userList, username) {
  const newList = userList.filter(user => user !== username);

  return {
    type: FILTER_USERLIST,
    list: newList
  }
}