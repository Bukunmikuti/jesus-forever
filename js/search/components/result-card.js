// INDIVIDUAL REF RESULT

const template = `
<div class="result">
	<h1>{{bible.ref}} <span class="version">{{bible.version}}</span></h1>
	
	<ol class="text" :style='counter'>
		<li v-for="(verse, i) in bible.text" :key="verse" @click="selectVerse(verse, i)" class="verse-text" :class='highlight(verse)' :data-ref="verseRef(i)">
			{{verse}}
		</li>
	</ol>
	
</div>
`

export default {
	template,
	props: {
		bible: {
			type: Object, 
			required: true,
		}
	}, 
	
	beforeUpdate() {
		//empty verses
		this.verses = {};
	},
	
	
	data() {
		return {
			bibleLocal: this.bible,
		}
	}, 
	
	computed: {
			...Vuex.mapState(['object', 'saves', 'version']),
			
			counter() {
			let start = parseInt(this.bibleLocal.refData.startVerse - 1)
			return {'counter-reset': `verse-count ${start}`}
		}, 
	},
	
	watch: {
	 object: {
	  deep: true, 
	  handler(newVal, oldVal) {
	   this.saves.forEach((save, index) => {
	    let exist = newVal.some((bible) => {
	     if (bible.text.includes(save.text)) {
	      return true
	     }
	    })
	    
	    if (!exist) {
	     this.$store.commit('REMOVE_FROM_SAVES', index)
	    }
	   })
	  }
	 }, 
	 
	 saves: {
	  deep: true, 
	  handler (saves, oldVal) {
	   if (saves.length > 0) {
				this.$store.commit('SHOW_BOTTOM_BAR', true)
			} else {
				this.$store.commit('SHOW_BOTTOM_BAR', false)
			}
	  }
	 }
	}, 
	
	methods: {
		highlight(verse) {
			let index = this.saves.findIndex(save => save.text == verse)
			return {
				selected: index > -1
			}
		}, 
		
		selectVerse(verse, i) {
			let index = this.saves.findIndex(save => save.text == verse);
			
			if (index > -1) {
				this.$store.commit('REMOVE_FROM_SAVES', index)
			} else {
				this.$store.commit('ADD_TO_SAVES', {
					...this.verseRef(i),
					version: this.bible.version,
					text: verse,
				})
			}
		
			//console.log(JSON.parse(JSON.stringify(this.saves)))
		},
		
		verseRef(i) {
			let bibleLocal = this.bibleLocal;
			let data = bibleLocal.refData
			if (data.endVerse == undefined) {
				// bible has single verse
				return {
					ref: bibleLocal.ref,
					apiBook: bibleLocal.apiBook
				}
			} else {
				let realRef = `${data.book} ${data.chapter}:${data.startVerse + i}`
				return {
					ref: realRef,
					apiBook: bibleLocal.apiBook
					/*apiBook: `${Bible.apiBook(data.book)}.${data.chapter}.${data.startVerse + i}`*/
				};
			}
		}, 
		
	}
};