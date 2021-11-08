import BookSuggestion from '../helpers/book-suggestion-re.js';
import selectVersion from './select-version.js'

const template = `
	<div class="input-wrapper">
		<div id='version-input' aria-label='select Bible version' @click='openSelect = !openSelect'>
			<p>{{version.name}}</p>
		</div>
	</div>
	
	<select-version v-show='openSelect' @close='this.openSelect = false'>
	</select-version>
			
	<div class="input-wrapper ref-wrapper">
			<input ref='refInput' id="ref-input" type="text" :value='typed' aria-label="Type Bible reference" placeholder="1 Timothy 1:17" autocomplete="off" @input='suggestion' @blur='closeSuggestion'/>
		
		<div ref='dropdownWrapper' id="ref-dropdown-wrapper" role="menu">
			<ul ref='dropdown' id="ref-dropdown">
				<!-- Books -->
			</ul>
		</div>
	</div>
`

export default {
	template,
	components: {
		'select-version' : selectVersion
	},
	
	mounted() {
		this.su = new BookSuggestion(this.$refs.refInput, this.$refs.dropdown, this.$refs.dropdownWrapper)
	}, 

	data() {
		return {
		openSelect: false,
		}
	},
	
	computed: {
		...Vuex.mapState(['version', 'typed'])
	}, 
	
	methods: {
		suggestion(e) {
			this.su.suggestion();
			this.$store.commit('UPDATE_TYPED', e.target.value)
		}, 
		closeSuggestion() {
			this.su.closeSuggestion();
		}
	}

	
	
}