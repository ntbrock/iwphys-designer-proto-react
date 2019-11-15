import React from 'react';
// import logo from './logo.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
//https://github.com/bevacqua/react-dragula/issues/27
// eslint-disable-next-line no-unused-vars
import styles from 'dragula/dist/dragula.css';

import './App.css';
import './IwpDesigner.css';
import IwpDesignerContainer from "./components/IwpDesignerContainer";

import IwpDesignerLoader from "./components/IwpDesignerLoader";

// Quick until we dive into react routing
// https://davidwalsh.name/query-string-javascript
function getUrlParameter(name) {
  // eslint-disable-next-line no-useless-escape
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(window.location.search);
  return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, ' '));
}


function App() {

  const filename = getUrlParameter('filename');
  const token = getUrlParameter('token');
  const url = getUrlParameter('url');

  if ( filename !== undefined && token !== undefined ) {
    // Load content!

    console.log("App.js:38> Loading existing animation content: filename: " , filename, "  token: ", token);


  }

  return (

      <IwpDesignerLoader animationUrl={url} animationFilename={filename} token={token}/>
  /*
      <IwpDesignerContainer animation={animationObject} animationFilename={filename} token={token}/>
  */

  );
}

export default App;
