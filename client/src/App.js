import React from 'react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr'
import store from './store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {setJWTTokenOnHeader} from './utils';
import {SET_CURRENT_USER} from './actions/types';

import './App.scss';
import './components/Dashboard';
import Dashboard from './components/Dashboard';
import Header from './components/layout/Header';

// Yes. We are importing the whole of bootstrap CSS. At this point now I don't what all my components will be included. Todo: Refactor later.
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateProjectForm from './components/project/CreateProjectForm';
import UpdateProjectForm from './components/project/UpdateProjectForm';
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import Register from './components/Users/Register';
import Login from './components/Users/Login';
import {logoutUser} from './actions/securityActions';

function App() {
  // Get the user token to login before rendering token.
  const jwtToken = localStorage.getItem('jwtToken');

  if (jwtToken) {
    
    const tokenDecoded =jwt_decode(jwtToken);
    
    // Get the current time and compare it with token's expiry time.
    const currentTime = Date.now() / 1000;
    if (tokenDecoded.exp < currentTime) {
      // Logout the user.
      store.dispatch(logoutUser());
      window.location.href = "/login";
    } else {
      // Successful token.
      setJWTTokenOnHeader(jwtToken);
      store.dispatch({type: SET_CURRENT_USER, payload: tokenDecoded});
    }
  }
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/add-project" component={CreateProjectForm} />
          <Route exact path="/update-project/:identifier" component={UpdateProjectForm} />
          {/* Id is the project identifier. */}
          <Route exact path="/project-board/:id" component={ProjectBoard} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
          
          {/* User Notifications */}
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-left"
            getState={(state) => state.toastr} // This is the default
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
          />
      </Router>
    </Provider>
  );
}

export default App;
