import {GET_ALL_PROJECTS, GET_PROJECT, RESET_PROJECT, DELETE_PROJECT} from '../actions/types';

const INITIAL_STATE = {
  projects: [],
  // The current project user is viewing.
  project: {}
}

export default function (state=INITIAL_STATE, action) {
  switch (action.type) {
    // Get all the projects from the backend.
    case GET_ALL_PROJECTS:
      return {
        ...state,
        projects: action.payload
      }
    
      case GET_PROJECT:
        return {
          ...state,
          project: action.payload
        }

      case RESET_PROJECT:
      case DELETE_PROJECT:
        return {
          ...state,
          project: {}
        }


    default: 
    return state;
  }
}