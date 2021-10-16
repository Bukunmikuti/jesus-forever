import versions from '../../lib/bible.versions.js';

const template = `
<div id='select-version'>
	<div class='wrapper'>
	
		<div id='header'>
			<input class='search' type='text' placeholder='Search Bible Version'/>
			<div class='close' @click="$emit('close')"><i class="fas fa-times"></i>
			</div>
		</div>
		
		<main>
		 <ul v-for='lang in versions' :aria-label='lang.name' :key='lang.name'>
		 	<hr>
		 	<li v-for='bible in lang.versions'>
		 		<div class='version' @click='select(bible)' :class='checkSelected(bible)'>
		 		<p>{{bible.name}}
		 		<span class='abbr'>{{bible.abbreviation}}</span>
		 		</p>
		 		</div>
		 	</li>
		 </ul>
		</main>

	</div>
</div>
`

export default {
	template,
	data() {
		return {
			versions
		}
	},
	
	computed: {
		...Vuex.mapState(['version'])
	}, 

	methods: {
		select(bible) {
			this.$store.commit('CHANGE_VERSION', {
				id: bible.id,
				name: bible.name, 
				abbreviation: bible.abbreviation
			});
			this.$emit('close');
		}, 
		
		checkSelected(bible) {
			if (bible.name == this.version.name) {
				return 'selected'
			}
		}
	}
}