import {
  GET_BACKLOG,
  UPDATE_BACKLOG,
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK,
  UPDATE_PROJECT_TASK,
  RESET_PROJECT_TASK
} from '../actions/types';

const INITIAL_STATE = {
  projectTasks: [],
  // The current project task user is viewing.
  projectTask: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Directly from the payload.
    case GET_BACKLOG:
      return {
        ...state,
        projectTasks: action.payload
      };

    case UPDATE_BACKLOG:
      return {
        ...state,
        projectTasks: [ ...state.projectTasks, action.payload ]
      };

    // Updating a single project task after update modal save is clicked is
    case UPDATE_PROJECT_TASK:
      // Get the list of all the tasks without the incoming Task
      const incomingTaskID = action.payload.id;
      const allTasksWithoutIncomingTask = state.projectTasks.filter((task) => task.id !== incomingTaskID);

      return {
        ...state,
        projectTasks: [ action.payload,...allTasksWithoutIncomingTask  ],
        projectTask: {}
      };

    case GET_PROJECT_TASK:
      return {
        ...state,
        projectTask: action.payload
      };

    case DELETE_PROJECT_TASK:
      // Get the list of all the tasks without the incoming Task
      const incomingTaskSequence = action.payload.taskSequence;
      const allTasksWithoutIncomingTaskId = state.projectTasks.filter((task) => task.projectSeqeunce !== incomingTaskSequence);

      return {
        ...state,
        projectTasks: [ ...allTasksWithoutIncomingTaskId],
        projectTask: {}
      };

    case RESET_PROJECT_TASK:
      return {
        ...state,
        projectTask: {}
      };
    default:
      return state;
  }
}
