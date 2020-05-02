import {combineReducers} from 'redux';
// Notification for users.
import {reducer as toastrReducer} from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

import formErrorReducer from './formErrorReducer';
import projectReducer from './projectReducer';
import backlogReducer from './backlogReducer';

export default combineReducers({
  // Form errors.
  formErrors: formErrorReducer,
  // Project Reducer.
  project: projectReducer,
  backlog: backlogReducer,
  toastr: toastrReducer
})