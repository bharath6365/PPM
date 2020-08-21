import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import {BACKENDHOST} from '../utils/constants.js';
import {
  GET_BACKLOG,
  GET_FORM_ERRORS,
  UPDATE_BACKLOG,
  GET_PROJECT_TASK,
  UPDATE_PROJECT_TASK,
  RESET_PROJECT_TASK,
  DELETE_PROJECT_TASK,
  RESET_ERRORS
} from '../actions/types';

/* 
Backlog id.
incomingTask is the object passed from the form.
*/
export const addProjectTask = (backlogId, incomingTask) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${BACKENDHOST}/api/backlog/${backlogId}`, incomingTask);
      toastr.info('Success', 'Task Created');
      dispatch({
        type: UPDATE_BACKLOG,
        payload: res.data
      });

      // Remove any form errors that were shown to the users.
      dispatch({type: RESET_ERRORS})
    } catch (e) {
      dispatch({
        type: GET_FORM_ERRORS,
        payload: e.response.data
      });
    }
  };
};

export const getAllTasks = (projectIdentifier) => {
  return async (dispatch) => {
    const res = await axios.get(`${BACKENDHOST}/api/backlog/${projectIdentifier}`);

    dispatch({
      type: GET_BACKLOG,
      payload: res.data
    });
  };
};

export const getTask = (projectIdentifier, taskSequence) => {
  return async (dispatch) => {
    const res = await axios.get(`${BACKENDHOST}/api/backlog/${projectIdentifier}/${taskSequence}`);

    if (res.status === 200) {
      dispatch({
        type: GET_PROJECT_TASK,
        payload: res.data
      });
    }
  };
};

export const updateProjecTask = (backlogId, incomingTask) => {
  return async (dispatch) => {
    try {
      const res = await axios.patch(`${BACKENDHOST}/api/backlog/${backlogId}`, incomingTask);
      toastr.info('Success', 'Task Updated');
      dispatch({
        type: UPDATE_PROJECT_TASK,
        payload: res.data
      });

      toastr.info('Success', 'Task Updated');
    } catch (e) {
      dispatch({
        type: GET_FORM_ERRORS,
        payload: e.response.data
      });
    }
  };
};

// Modal Close
export const resetProjectTask = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_PROJECT_TASK
    });
  };
};

export const deleteProjectTask = (projectIdentifier, taskSequence) => {
  return async(dispatch) => {
    try { 
      const res = await axios.delete(`${BACKENDHOST}/api/backlog/${projectIdentifier}/${taskSequence}`);

    if (res.status === 200) {
      dispatch({
        type: DELETE_PROJECT_TASK,
        payload: {
          taskSequence
        }
      });
      toastr.info('Success', 'Task Deleted');
    }
    } catch (e) {
      toastr.error('Failiure', 'Unable to delete the task');
    }
  }
}
