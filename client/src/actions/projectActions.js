import axios from "axios";
import {GET_FORM_ERRORS, GET_ALL_PROJECTS, GET_PROJECT, RESET_PROJECT} from "./types";

// When there is a successful project creation redirect to dashboard programatically.
export const createProject = (project, history) => {
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
      history.push("/dashboard");
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
  console.log('Inside getAllProjects');
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

export const getProjectByIdentifier = (identifier) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/project/${identifier}`);
      dispatch({
        type: GET_PROJECT,
        payload: res.data
      })
    } catch(e) {
      console.error(e);
    }
  }
}

export const resetProject = (identifier) => {
  return ({
    type: RESET_PROJECT
  })
}