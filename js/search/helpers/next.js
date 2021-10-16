import Search from './search.js';




/**
 * Gets bible data array: [{'ref', 'text'}] from Search.getBibleData()
 * calls displayBible() to output results on screen
 */
let next = async (version) => {
	let input = document.querySelector('#ref-input').value;

	let bibleResults = await Search.getBibleData(input, version);
	return bibleResults;
}



export default next;