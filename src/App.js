import React from 'react';
// import logo from './logo.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
//https://github.com/bevacqua/react-dragula/issues/27
// eslint-disable-next-line no-unused-vars
import styles from 'dragula/dist/dragula.css';

import './App.css';
import './IwpDesigner.css';
import IwpDesignerContainer from "./components/IwpDesignerContainer";

// import collisionElastic3 from "./animations/Collision-Elastic-3";
import emptyAnimation from "./animations/EmptyAnimation";


function App() {

  const animationObject = emptyAnimation();
  return (

      <IwpDesignerContainer animation={animationObject} />

  );
}

export default App;
