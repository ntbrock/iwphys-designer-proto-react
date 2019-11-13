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
import * as axios from "axios";

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

  let animationObject = emptyAnimation();
  // Do we have a token + filename?  try to get existing animation.


  const filename = getUrlParameter('filename');
  const token = getUrlParameter('token');

  if ( filename !== undefined && token !== undefined ) {
    // Load content!


    const axiosClient = axios.create({
      baseURL: 'https://www.iwphys.org',
      timeout: 5000,
      headers: {'X-Token': token}
    });


    console.log("App.js:38> Loading existing animation content: filename: " , filename, "  token: ", token);

    axiosClient.get("/designer/api1/json/" + encodeURI(filename));


  }

  return (

      <IwpDesignerContainer animation={animationObject} animationFilename={filename} token={token}/>

  );
}

export default App;
