import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { GET_BACKLOG, GET_FORM_ERRORS , UPDATE_BACKLOG } from '../actions/types';

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
      })
    } catch (e) {
      dispatch({
        type: GET_FORM_ERRORS,
        payload: e.response.data
      })
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
