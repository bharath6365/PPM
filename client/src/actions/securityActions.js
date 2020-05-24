import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import jwt_decode from 'jwt-decode';
import { GET_FORM_ERRORS, RESET_ERRORS, SET_CURRENT_USER, RESET_CURRENT_USER } from '././types';
import { setJWTTokenOnHeader } from '../utils';
export const registerUser = (user, history) => {
  return async (dispatch) => {
    try {
      await axios.post('http://localhost:8080/api/users/register', user);
      /*
        Based on the way our API is wired up. For all non 200 status codes. We will dispatch the error.       
      */
      toastr.success('Success', `User Created`);
      history.push('/login');

      // Remove any form errors that were shown to the users.
      dispatch({ type: RESET_ERRORS });
    } catch (error) {
      // When you are here it means something went wrong. Lets dispatch an action to hold the errors.
      dispatch({
        type: GET_FORM_ERRORS,
        payload: error.response.data
      });
    }
  };
};

export const loginUser = (credentials, history) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('http://localhost:8080/api/users/login', credentials);
      const { token } = res.data;
      // Now we need to set this token to the local storage.
      localStorage.setItem('jwtToken', token);

      // Now we need to set this token on the header.
      setJWTTokenOnHeader(token);

      // Token Decoded
      const tokenDecoded = jwt_decode(token);

      // Dispatch to our Security Reducer.
      dispatch({ type: SET_CURRENT_USER, payload: tokenDecoded });

      // Toastr message.
      toastr.success('Success', `User Logged in`);
      history.push('/dashboard');

      // Remove any form errors that were shown to the users.
      dispatch({ type: RESET_ERRORS });
    } catch (error) {
      // When you are here it means something went wrong. Lets dispatch an action to hold the errors.
      console.error(error);
      dispatch({
        type: GET_FORM_ERRORS,
        payload: error.response.data
      });
    }
  };
};

export const logoutUser = () => dispatch => {

  localStorage.removeItem('jwtToken');
  //Providing false as an option removes the common header from being sent on every request.
  setJWTTokenOnHeader(false);
  dispatch({
    type: RESET_CURRENT_USER
  });

  
};
