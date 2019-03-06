import React, { Component } from 'react';
import './App.css';
function openFile(event) {
        var input = event.target;

        var reader = new FileReader();
        reader.onload = function() {
          var text = reader.result;
          var node = document.getElementById('output');
          node.innerText = text;
          console.log(reader.result.substring(0, 200));
        };
        let text = []
        for (let f of input.files) {
        	text.push(reader.readAsText(f));
		}
		console.log(text);
		return text;
      };

class TxtReader extends Component {

  render() {
    return (
      <div className="FileUpload">
        <input type="file" id="files" name="files[]" multiple />
		<output id="list"></output>
		<script>
			document.getElementById('files').addEventListener('change', openFile, false);
		</script>
      </div>
    );
  }
}

export default TxtReader;
