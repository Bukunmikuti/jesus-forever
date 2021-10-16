const refInput = this.$refs.refInput;
const refDropdown = document.getElementById('ref-dropdown');
const dropdownWrapper = document.getElementById('ref-dropdown-wrapper');

let books = ["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther","Job","Psalm","Proverbs","Ecclesiastes","Song of Solomon","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation"];
let last_characters = '';
let isSuggestionOpened;

/*
let handleDropdown = () => {
	refInput.oninput = suggestion;
	refInput.onblur = (e) => {
		setTimeout(() => {
			if (isSuggestionOpened) {
				toggleDropdown('hide');
			}
		}, 100)
	}
}
*/

/**
 * CODE NOT EFFICIENT!! 
 * toggle suggestions for book from input
 * last_characters: last characters entered if they match the regex. 
 */
let bookSuggestion = () => {
	let val = refInput.value;
	let regex = new RegExp('^[1-3]$|[1-3]\\s([A-Za-z]+)?$|^[a-zA-Z]+$', 'gi');
	refDropdown.innerHTML = '';
	
	if (val == '') {
		toggleDropdown('hide');
		return;
	}
	
	if (last_characters.length > 0 && regex.test(last_characters)) {
		let range = (last_characters.length * -1) - 1;
		last_characters = val.substr(range);
		populateDropdown();
	} else {
		//last character entered
		if (testRegex(val.substr(-2))) {
			last_characters = val.substr(-1);
			populateDropdown();
		} else if (regex.test(val.substr(-3))) {
			last_characters = val.substr(-2);
			populateDropdown();
		} else {
			toggleDropdown('hide')
			last_characters = '';
		}
	}
	
	//console.log(last_characters);
	
	function testRegex(str) {
		// :1
		if (/[:-]/.test(str.charAt(0)) == false) {
			return true
		}
	}
	
	
}


let populateDropdown = () => {
	let isActive = false;
	books.forEach(book => {
		if (last_characters.toUpperCase() == book.toUpperCase().substr(0, last_characters.length)) {
			let refItem = document.createElement('li');
			refItem.classList.add('ref-item');
			refItem.textContent = book;
			refItem.onclick = suggestionClick.bind(this);
			refDropdown.appendChild(refItem);
			isActive = true;
		}
	})
	
	if (isActive) {
		toggleDropdown('show')
	} else {
		toggleDropdown('hide')
	}
	
}


/**
 * Hide or Show dropdown based on passed parameter
 */
let toggleDropdown = (value) => {
	if (value == 'show') {
		dropdownWrapper.classList.add('open')
		isSuggestionOpened = true;
	}
	if (value == 'hide') {
		dropdownWrapper.classList.remove('open')
		isSuggestionOpened = false
	}
}


/**
 * This method runs when 'ref-item' in refDropdown is clicked
 */
let suggestionClick = (e) => {
	toggleDropdown('hide');
	let val = refInput.value;
	let suggested = e.target.textContent;
	let cutoff;
	//console.log('suggested: ' + suggested)
	for (let i = 1; i < suggested.length; i++) {
		cutoff = val.slice(-i)
		if (suggested.toUpperCase().includes(cutoff.toUpperCase()) == false) {
		cutoff = val.slice(-(i-1));
			break;
		}
	}
	//console.log(cutoff);
	let newVal = val.slice(0, (val.length - cutoff.length)) + suggested;
	refInput.value = newVal + ' ';
	refInput.focus();
	last_characters = ''
}




















export default bookSuggestion;