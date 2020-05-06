import {GET_BACKLOG,UPDATE_BACKLOG,  GET_PROJECT_TASK, DELETE_PROJECT_TASK} from "../actions/types";

const INITIAL_STATE = {
  projectTasks: [],
  // The current project task user is viewing.
  projectTask: {}
}

export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
    
    // Directly from the payload.
    case GET_BACKLOG:
    return {
      ...state,
      projectTasks: action.payload
    }

    case UPDATE_BACKLOG:
    return {
      ...state,
      projectTasks: [
        ...state.projectTasks,
        action.payload
      ]
    }

    case GET_PROJECT_TASK:
      return {
        ...state,
        projectTask: action.payload
      }

      case DELETE_PROJECT_TASK:
      return {
        ...state,
        projectTask: {}
      }
    default: 
    return state;
  }
}