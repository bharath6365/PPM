import React from 'react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr'
import store from './store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import './components/Dashboard';
import Dashboard from './components/Dashboard';
import Header from './components/layout/Header';

// Yes. We are importing the whole of bootstrap CSS. At this point now I don't what all my components will be included. Todo: Refactor later.
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateProjectForm from './components/project/CreateProjectForm';
import UpdateProjectForm from './components/project/UpdateProjectForm';
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import AddProjectTaskForm from './components/ProjectBoard/ProjectTasks/AddProjectTaskForm';

function App() {
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
          <Route exact path="/add-task/:id" component={AddProjectTaskForm} />
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
