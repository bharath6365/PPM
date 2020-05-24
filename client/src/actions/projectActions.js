import axios from "axios";
import {toastr} from 'react-redux-toastr'
import {GET_FORM_ERRORS, GET_ALL_PROJECTS, GET_PROJECT, RESET_PROJECT, RESET_ERRORS, DELETE_PROJECT} from "./types";

// When there is a successful project creation redirect to dashboard programatically.
// Update uses the same logic TBH.
export const createProject = (project, history, update=false) => {
  const projectAction  = update? 'Updated': 'Created';
  return async (dispatch) => {
    try {
      const res = axios.post("http://localhost:8080/api/project", project);
      /*
        Based on the way our API is wired up. For the create project call all successful 
        calls will render a 200 response. So we don't need to read the response at all.
        We can redirect the user to the dashboard page :D       
      */
      if ((await res).status !== 200) {
        throw new Error("Create Project Request failed");
      }
      toastr.success('Success', `Project with the name ${project.projectName} has been ${projectAction}`)
      history.push("/dashboard");

      // Remove any form errors that were shown to the users.
      dispatch({type: RESET_ERRORS})
    } catch (error) {
      // When you are here it means something went wrong. Lets dispatch an action to hold the errors.
      dispatch({
        type: GET_FORM_ERRORS,
        payload: error.response.data
      })
    }
  }
}

export const getAllProjects = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:8080/api/project/all");
      dispatch({
        type: GET_ALL_PROJECTS,
        payload: res.data
      })
    } catch(e) {
      console.log('Catch block runs you fool', e);
    }
  }
}

export const getProjectByIdentifier = (identifier, history) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/project/${identifier}`);
      dispatch({
        type: GET_PROJECT,
        payload: res.data
      })
    } catch(e) {
      toastr.error(`Error`, `Project not found`);
      history.push('/dashboard');
    }
  }
}

export const resetProject = (identifier) => {
  return dispatch => {
    dispatch({
      type: RESET_ERRORS
    })

    dispatch({
      type: RESET_PROJECT
    })
  }
}

export const deleteProject = (identifier, history) => {
  return async(dispatch) => {
    try {
      await axios.delete(`http://localhost:8080/api/project/${identifier}`);
      dispatch({
        type: DELETE_PROJECT,
        payload: identifier
      })

      toastr.info('Success', 'Project deleted');
      
    } catch(e) {
      console.error(e);
      toastr.error('Error', 'Delete Project Operation failed');
    }
  }
}