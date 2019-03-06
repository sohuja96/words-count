import React, { Component } from 'react';
import './App.css';
import FileUploadButton from './FileUploadButton.js';
import FileUploadDragNDrop from './FileUploadDragNDrop.js';
import TxtReader from './TxtReader.js';
import Footer from './Footer.js';
// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Words Count</h1>
        </header>
        <FileUploadButton/>
        <Footer/>
      </div>
    );
  }
}

export default App;
