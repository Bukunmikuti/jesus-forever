import versions from '../../lib/bible.versions.js';

const template = `
<div id='select-version'>
	<div class='wrapper'>
	
		<div id='header'>
			<input class='search' type='text' v-model='searchValue' placeholder='Search Bible Version'/>
			
			<div class='close' @click="closeSelect">
			<i class="fas fa-times"></i>
			</div>
		</div>
		
		<main id='search-result' v-show='toggleSearch'>
		
		<h3>Search: <span>{{searchValue}}</span></h3>
		<hr>
		<p v-show='notFound' class='not-found'>No results found</p>
		
		 <ul v-for='bible in searchMatch' v-show='!notFound'>
		  <li>
		  	<div class='version' @click='select(bible)' :class='checkSelected(bible)'>
		 		<p>{{bible.name}}
		 		<span class='abbr'>{{bible.abbreviation}}</span>
		 		</p>
		 		</div>
		  </li>
		 </ul>
		 
		</main>
		
		<main >
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
			versions,
			searchValue: '', 
			searchMatch: [], 
		}
	},
	
	watch: {
	 searchValue(val, old) {
	  this.searchMatch = [];
	  if (val == '') return false
	  for(let lang of this.versions) {
	   for(let version of lang.versions) {
	    if(version.name.toLowerCase().includes(val.toLowerCase()) || version.abbreviation.toLowerCase().includes(val.toLowerCase())) {
	     this.searchMatch.push(version)
	    }
	   }
	  }
	  
	  if(this.searchMatch.length == 0) {
	   this.searchMatch.push('NaN');
	  }
	 }
	}, 
	
	computed: {
		...Vuex.mapState(['version']), 

		toggleSearch() {
		 if (this.searchMatch.length > 0) {
		  return true
		 } else {
		  return false
		 }
		}, 
		
		notFound() {
		 if (this.searchMatch[0] == 'NaN') {
		  return true;
		 }
		}
	}, 

	methods: {
		select(bible) {
			this.$store.commit('CHANGE_VERSION', {
				id: bible.id,
				name: bible.name, 
				abbreviation: bible.abbreviation
			});
			this.$emit('close');
			this.searchValue = '';
		}, 
		
		checkSelected(bible) {
			if (bible.name == this.version.name) {
				return 'selected'
			}
		}, 
		
		closeSelect() {
		 this.$emit('close')
		}
	}
}