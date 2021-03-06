import React, { Component } from 'react';
import './App.css';
import { generateCSV } from './GenerateCSV.js'

class FileUploadButton extends Component {

	constructor(props) {
		super(props);
		this.state = {keywords: [], loadedFiles: [], fileNames: [], downloaded: false};
	}

	render() {
		let fr;

		const handleRead = (e) => {
			let textArr = this.state.loadedFiles;
			const content = e.target.result;
			textArr.push(content);

			this.setState({
				keywords: this.state.keywords,
				loadedFiles: textArr,
				fileNames: this.state.fileNames
			});
		}

		const handleFile = (f) => {
			let names = this.state.fileNames;
			let newNames = []

			for (let i of f) {
				fr = new FileReader();
				fr.onloadend = handleRead;
				fr.readAsText(i);
				newNames.push(i.name);
			}
			newNames.reverse();
			for (let i of newNames) {
				names.push(i);
			}
			this.setState({
				keywords: this.state.keywords,
				loadedFiles: this.state.loadedFiles,
				fileNames: names
			});
		}


		const downloadFile = (encodedUri) => {

			let filename = document.getElementById("downloadname").value;
			filename = filename?filename:"words-count";

			let link = document.createElement('a');
	        link.setAttribute('href', encodedUri);
	        link.setAttribute('download', filename);
	        document.body.appendChild(link);
	        link.click();
	        link.parentNode.removeChild(link);
	        return encodedUri;
		}


		const handleDownloadCSV = () => {
			let docs = this.state.loadedFiles;
			let kw = this.state.keywords;
			let names = this.state.fileNames;
			downloadFile(generateCSV(docs, kw, names));
			kw.shift();
		}

		const enterKeyword = (keyword) => {
			let keywords = this.state.keywords;
			keywords.push(keyword);
			this.setState({
				keywords: keywords,
				loadedFiles: this.state.loadedFiles,
				fileNames: this.state.fileNames
			})
		}

		const keyPress = (e) => {
			if (e === 'Enter') {
				handleKeyword();
			}
		}
		const handleKeyword = () => {
			let keyword = document.getElementById('keyword').value;
			enterKeyword(keyword);
			injectKeyword(keyword);
			document.getElementById('keyword').value = '';
		}

		const injectKeyword = (keyword) => {
			let keywordList = document.getElementById('keywords');
			let ulEntry = document.createElement('li');
			ulEntry.appendChild(document.createTextNode(keyword));
			ulEntry.onclick = () => {
				let removingList = this.state.keywords;
				let text = ulEntry.innerHTML;
				console.log(removingList)
				removingList = removingList.filter((value, index, removingList) => {
					return value !== text;
				});
				
				console.log(removingList)
				keywordList.removeChild(ulEntry);

				this.setState({
					keywords: removingList
				})
			}
			keywordList.appendChild(ulEntry);
		}

		return (
			<div className="FileUpload">
				<p><b>Choose Files</b></p>
				<input type="file" id="files" name="files" onChange={e => handleFile(e.target.files)} multiple />
				<output id="list"></output>
				<br/>
				<p><b>Keywords to Search</b></p>
				<input type="text" id="keyword" placeholder="Keywords" onKeyDown={e => keyPress(e.key)}/>
				<button type="button" id="enterKeyword" onClick={() => handleKeyword()}>Add Word</button>
				<ul id="keywords">

				</ul>
				<br/>
				<p><b>Save as</b></p>
				<input type="text" id="downloadname" placeholder="words-count"/>
				<button type="button" id="downloadCSV" onClick={() => handleDownloadCSV()}>Download</button>
				{ this.state.loading && <img src="./loading.gif" /> }
			</div>
		);
	}
}

export default FileUploadButton;