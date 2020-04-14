import {combineReducers} from 'redux';
import formErrorReducer from './formErrorReducer';

export default combineReducers({
  formErrors: formErrorReducer
})