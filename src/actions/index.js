export const ADD_USER = 'ADD_USER';
export const ADD_ROOM = 'ADD_ROOM';

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