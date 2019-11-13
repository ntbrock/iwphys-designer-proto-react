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

// Quick until we dive into react routing
// https://davidwalsh.name/query-string-javascript
function getUrlParameter(name) {
  // eslint-disable-next-line no-useless-escape
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}


function App() {

  const animationObject = emptyAnimation();
  return (

      <IwpDesignerContainer animation={animationObject} token={getUrlParameter('token')}/>

  );
}

export default App;
