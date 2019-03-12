const parseDocumentsForKeywords = (docs, keywords, names) => {
	let kwFoundArray = [];
	let docFoundArray = [];
	let o = 0;
	for (let i = 0; i < docs.length; i++) {
		kwFoundArray = [];
		kwFoundArray.push(names[i]);
		console.log(keywords);
		for (let k of keywords) {
			o = occurrences(docs[i], k, true);
			kwFoundArray.push(o);
		}
		docFoundArray.push(kwFoundArray);
	}
	return docFoundArray;
}
const occurrences= (string, subString, allowOverlapping) => {
	string += "";
	subString += "";
	if (subString.length <= 0) return string.length + 1;
	let n = 0,
	pos = 0;
	let step = (allowOverlapping) ? (1) : (subString.length);

	while (true) {
		pos = string.indexOf(subString, pos);
		if (pos >= 0) {
			n++;
			pos += step;
		} else break;
	}
	return (n);
}
export const generateCSV = (docs, keywords, names) => {
	const rows = parseDocumentsForKeywords(docs, keywords, names);
	keywords.unshift("File name");
	rows.unshift(keywords);
	let csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => { return e.join(","); }).join("\n");
	return encodeURI(csvContent);
}
