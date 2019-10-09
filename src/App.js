import React from 'react';
// import logo from './logo.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './IwpDesigner.css';
import IwpDesignerContainer from "./components/IwpDesignerContainer";

import collisionElastic3 from "./animations/Collision-Elastic-3";


function App() {

  const animationObject = collisionElastic3();


  return (

      <IwpDesignerContainer animation={animationObject} />

  );
}

export default App;
