import axios from 'axios';

/* 
Backlog id.
incomingTask is the object passed from the form.

*/
export const addProjectTask = (backlogId, incomingTask ) => {
  return async (dispatch) => {
    await axios.post(`/api/backlog/${backlogId}`, incomingTask);

  }

}