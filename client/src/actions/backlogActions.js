import axios from 'axios';
import {toastr} from 'react-redux-toastr';
import {GET_BACKLOG} from '../actions/types';

/* 
Backlog id.
incomingTask is the object passed from the form.
*/
export const addProjectTask = (backlogId, incomingTask ) => {
  return async (dispatch) => {
    await axios.post(`http://localhost:8080/api/backlog/${backlogId}`, incomingTask);
    toastr.info('Success', 'Task Created');   
  }
}

export const getAllTasks = (projectIdentifier) => {

  return async (dispatch) => {
    const res = await axios.get(`http://localhost:8080/api/backlog/${projectIdentifier}`);

    dispatch({
      type: GET_BACKLOG,
      payload: res.data
    })
  }

}