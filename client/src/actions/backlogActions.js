import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import {
  GET_BACKLOG,
  GET_FORM_ERRORS,
  UPDATE_BACKLOG,
  GET_PROJECT_TASK,
  UPDATE_PROJECT_TASK,
  RESET_PROJECT_TASK,
  DELETE_PROJECT_TASK
} from '../actions/types';

/* 
Backlog id.
incomingTask is the object passed from the form.
*/
export const addProjectTask = (backlogId, incomingTask) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`http://localhost:8080/api/backlog/${backlogId}`, incomingTask);
      toastr.info('Success', 'Task Created');
      dispatch({
        type: UPDATE_BACKLOG,
        payload: res.data
      });
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
    const res = await axios.get(`http://localhost:8080/api/backlog/${projectIdentifier}`);

    dispatch({
      type: GET_BACKLOG,
      payload: res.data
    });
  };
};

export const getTask = (projectIdentifier, taskSequence) => {
  return async (dispatch) => {
    const res = await axios.get(`http://localhost:8080/api/backlog/${projectIdentifier}/${taskSequence}`);

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
      const res = await axios.post(`http://localhost:8080/api/backlog/${backlogId}`, incomingTask);
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
      const res = await axios.delete(`http://localhost:8080/api/backlog/${projectIdentifier}/${taskSequence}`);

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
