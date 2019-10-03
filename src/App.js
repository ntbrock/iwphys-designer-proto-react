import React from 'react';
import logo from './logo.svg';
import './App.css';
import './IwpDesigner.css';
import EquationEditor from "./components/EquationEditor";
import IwpInputEditor from "./components/IwpInputEditor";



function App() {

  return (
    <div className="App">
      <header className="App-header">

        <h3>EquationEditor</h3>
        <EquationEditor expression="1+3"/>

        <h3>IwpInputEditor</h3>
          <IwpInputEditor name="inputa" expression="pi"/>


      </header>


    </div>
  );
}

export default App;
