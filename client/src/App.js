import React from 'react';
import './App.css';
import './components/Dashboard';
import Dashboard from './components/Dashboard';
import Header from './components/layout/Header';

// Yes. We are importing the whole of bootstrap CSS. At this point now I don't what all my components will be included. Todo: Refactor later.
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
