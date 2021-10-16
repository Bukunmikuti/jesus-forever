// INDIVIDUAL REF RESULT

const template = `
<div velse id="result" v-for="(value, index) in object" :key="value.ref">

	<h1>{{value.ref}} <span class="version">{{value.version}}</span></h1>
	<ol class="text" :ref='setResultCard'>
		<li v-for="(verse, i) in object[index].text" :key="verse" @click="selectVerse(i)" :ref='setVerses' class="verse-text" :class="okk(i)" :data-ref="verseRef(index, i)">
			{{verse}}
		</li>
	</ol>
	
</div>
`

export default {
	template,
	updated() {
		/*
		console.log(this.resultCards)
		let r = this.resultCards;
		r.style.counterReset = `verse-count ${parseInt(this.object[index].refData.startVerse - 1)}`;
		*/
		let r = document.querySelectorAll('#result')
		r.forEach((e, index) => {
			e.querySelector('.text').style.counterReset = `verse-count ${parseInt(this.object[index].refData.startVerse - 1)}`;
		})
		
	},
	
	beforeUpdate() {
		//empty verses
		this.verses = [];
		//this.resultCards = [];
	},
	
	data() {
		return {
			saves: [], 
			verses: [],
			resultCards: [], 
		}
	}, 
	
	computed: {
		object() {
			return this.$store.state.object
		},
	},
	
	methods: {
		okk(i) {
			
		},
		
		setResultCard(el) {
			if (el) {
				this.resultCards.push(el)
			}
		}, 
		
		setVerses(el) {
			if (el) {
				this.verses.push(el)
			}
		},
		
		selectVerse(i) {
			let el = this.verses[i];
			if (!el.classList.contains('selected')) {
				el.classList.add('selected');
			} else {
				el.classList.remove('selected');
			}
			this.saveSelection(el.textContent);
		},
		
		verseRef(index, i) {
			if (this.object[index].refData.endVerse == undefined) {
				// bible ref has single verse
				return {
					ref: this.object[index].ref,
					apiBook: this.object[index].apiBook
				}
			} else {
				let book = this.object[index].refData.book;
				let chapter = this.object[index].refData.chapter;
				let startVerse = this.object[index].refData.startVerse;
				let verse = startVerse + i;
				let realRef = `${book} ${chapter}:${verse}`
				return {
					ref: realRef,
					//need to extract exact apiBook 
				};
			}
		}, 
		
		saveSelection(text) {
			if (this.saves.includes(text)) {
				let index = this.saves.indexOf(text);
  		this.saves.splice(index, 1);
			} else {
				this.saves.push(text);
			}
			
			//show or hide bottom bar
			if (this.saves.length > 0) {
				this.$store.commit('SHOW_BOTTOM_BAR', true)
			} else {
				this.$store.commit('SHOW_BOTTOM_BAR', false)
			}
		}, 
		
	}
};