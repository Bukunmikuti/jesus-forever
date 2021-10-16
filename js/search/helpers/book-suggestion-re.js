
export default class BookSuggestion {
	
	constructor(input, dropdown, dropdownWrapper){
		this.input = input;
		this.dropdown = dropdown;
		this.dropdownWrapper = dropdownWrapper;
		this.books = ["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther","Job","Psalm","Proverbs","Ecclesiastes","Song of Solomon","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation"];
		this.last_characters = '';
		this.isSuggestionOpened;
		
	}
	
	
	suggestion() {
		let val = this.input.value;
		let regex = new RegExp('^[1-3]$|[1-3]\\s([A-Za-z]+)?$|^[a-zA-Z]+$', 'gi');
		this.dropdown.innerHTML = '';
		
		if (val == '') {
			this.toggleDropdown('hide');
			return;
		}
		
		if (this.last_characters.length > 0 && regex.test(this.last_characters)) {
			let range = (this.last_characters.length * -1) - 1;
			this.last_characters = val.substr(range);
			this.populateDropdown();
		} else {
			//last character entered
			if (this.testRegex(val.substr(-2))) {
				this.last_characters = val.substr(-1);
				this.populateDropdown();
			} else if (this.testRegex(val.substr(-3))) {
				this.last_characters = val.substr(-2);
				this.populateDropdown();
			} else {
				this.toggleDropdown('hide')
				this.last_characters = '';
			}
		}
		//console.log(this.last_characters);
	}
	
	
	closeSuggestion() {
		setTimeout(() => {
			if (this.isSuggestionOpened) {
				this.toggleDropdown('hide');
			}
		}, 100)
		
	}
	
	
	testRegex(str) {
		// :1
		if (/[:-]/.test(str.charAt(0)) == false) {
			return true
		}
	}
	
	
	populateDropdown() {
		let isActive = false;
		this.books.forEach(book => {
			if (this.last_characters.toUpperCase() == book.toUpperCase().substr(0, this.last_characters.length)) {
				let refItem = document.createElement('li');
				refItem.classList.add('ref-item');
				refItem.textContent = book;
				refItem.onclick = this.suggestionClick.bind(this);
				this.dropdown.appendChild(refItem);
				isActive = true;
			}
		})
		
		if (isActive) {
			this.toggleDropdown('show')
		} else {
			this.toggleDropdown('hide')
		}
	}
	
	
	toggleDropdown(value) {
		if (value == 'show') {
			this.dropdownWrapper.classList.add('open')
			this.isSuggestionOpened = true;
		}
		if (value == 'hide') {
			this.dropdownWrapper.classList.remove('open')
			this.isSuggestionOpened = false
		}
	}
	
	suggestionClick(e) {
		this.toggleDropdown('hide');
		let val = this.input.value;
		let suggested = e.target.textContent;
		let cutoff;
		//console.log('suggested: ' + suggested)
		for (let i = 1; i < suggested.length; i++) {
			cutoff = val.slice(-i)
			if (suggested.toUpperCase().includes(cutoff.toUpperCase()) == false) {
				cutoff = val.slice(-(i - 1));
				break;
			}
		}
		//console.log(cutoff);
		let newVal = val.slice(0, (val.length - cutoff.length)) + suggested;
		this.input.value = newVal + ' ';
		this.input.focus();
		this.last_characters = ''
	}
	
}