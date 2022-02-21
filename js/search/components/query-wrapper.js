import inputWrapper from './input-wrapper.js'
import next from '../helpers/next.js'

const template = `	
<div id="query-form-wrapper" class="">

	<div id="input-container">
		<input-wrapper></input-wrapper>
	</div>
	
	<button id="search" @click='next'>Jesus!</button>
</div>
`

export default {
	template,
	components: {
		'input-wrapper': inputWrapper
	},
	
	data() {
		return {
			count: 0
		}
	},
	
	computed: {
		...Vuex.mapState(['version'])
	}, 
	
	methods: {
		async next(e) {
			this.$store.commit('SHOW_LOADING', true)
			let bibleResults = await next(this.version);
			this.$store.commit('SHOW_LOADING', false)
			if (bibleResults.length > 0) {
				// COMMIT bibleResults
				this.$store.dispatch('displayBible',bibleResults)
			} else {
				console.log('validation failed');
			}
		}
	}
}
