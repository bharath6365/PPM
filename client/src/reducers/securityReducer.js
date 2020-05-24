import {SET_CURRENT_USER, RESET_CURRENT_USER} from '../actions/types';

const INITIAL_STATE = {
  user: {},
  validToken: false
}

export default  function (state = INITIAL_STATE, action) {
  switch(action.type) {

    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: action.payload ? true: false,
        user: action.payload
      }

    case RESET_CURRENT_USER:
      return {
        ...state,
        user: INITIAL_STATE.user,
        validToken: INITIAL_STATE.validToken
      }
    default:
    return state;
  }
  
}