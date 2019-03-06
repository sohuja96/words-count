import React, { Component } from 'react';
import './App.css';


function handleFileSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();

	var files = evt.dataTransfer.files; // FileList object.

	// files is a FileList of File objects. List some properties.
	var output = [];
	for (var i = 0, f; f = files[i]; i++) {
		output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
			f.size, ' bytes, last modified: ',
			f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
			'</li>'
		);
	}
	document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}



class FileUploadDragNDrop extends Component {

  render() {
    return (
      <div className="FileUpload">
        <header className="FileUpload-header">
        </header>
		<div id="drop_zone">Drop files here</div>
        <script>
			// Setup the dnd listeners.
			var dropZone = document.getElementById('drop_zone');
			dropZone.addEventListener('dragover', handleDragOver, false);
			dropZone.addEventListener('drop', handleFileSelect, false);
        </script>
		<output id="list"></output>


      </div>
    );
  }
}

export default FileUploadDragNDrop;
