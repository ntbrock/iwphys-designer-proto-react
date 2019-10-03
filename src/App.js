import React from 'react';
import logo from './logo.svg';
import './App.css';
import EquationEditor from "./components/EquationEditor";

function App() {

  const equation = { id: 1, expression: "1+1", state: "CREATED" }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h3>EquationEditor</h3>
        <EquationEditor expression="1+1"/>

      </header>


    </div>
  );
}

export default App;
