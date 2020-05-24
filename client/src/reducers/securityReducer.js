import {SET_CURRENT_USER} from '../actions/types';

const INITIAL_STATE = {
  user: {},
  validToken: false
}

export const setUser  = (state = INITIAL_STATE, action) => {
  switch(action.type) {

    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: action.payload ? true: false,
        user: action.payload
      }
    default:
    return state;
  }
  
}