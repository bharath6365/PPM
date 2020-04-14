// Reducers are end of the day functions that return a piece of state.
import {GET_FORM_ERRORS} from '../actions/types';

const INITIAL_STATE = {}

export default function (state=INITIAL_STATE, action) {
  switch (action.type) {
    // Get the form errors from the server.
    case GET_FORM_ERRORS:
      return action.payload

    default: 
    return state;
  }
}