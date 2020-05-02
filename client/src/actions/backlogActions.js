import axios from 'axios';

/* 
Backlog id.
incomingTask is the object passed from the form.

*/
export const addProjectTask = (backlogId, incomingTask, history ) => {
  return (dispatch) => {
    await axios.post(`/api/backlog/${backlogId}`, incomingTask);

    history.push(`/project-board/${backlogId}`);
  }

}