import axios from "axios";
import {GET_FORM_ERRORS} from "./types";

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