import axios from 'axios';
import {toastr} from 'react-redux-toastr';
import {GET_FORM_ERRORS, RESET_ERRORS} from '././types';
export const registerUser = (user, history) => {
  return async (dispatch) => {
    try {
      await axios.post("http://localhost:8080/api/users/register", user);
      /*
        Based on the way our API is wired up. For all non 200 status codes. We will dispatch the error.       
      */
      toastr.success('Success', `User Created`)
      history.push("/login");
      
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