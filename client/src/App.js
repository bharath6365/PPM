import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import './components/Dashboard';
import Dashboard from './components/Dashboard';
import Header from './components/layout/Header';

// Yes. We are importing the whole of bootstrap CSS. At this point now I don't what all my components will be included. Todo: Refactor later.
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateProjectForm from './components/project/CreateProjectForm';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/add-project" component={CreateProjectForm} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
