import resultCard from './result-card.js'

const template = `
<div id="result-wrapper">
	<div class="loading-wrapper" v-show="loading">Loading...</div>
	
	<div id='empty-card' v-show="object.length < 1">
		<ul>
			<li>Search for Bible verse above</li>
			<li>Click verses to highlight and edit</li>
			<li>Create a note, bookmark or share</li>
		</ul>
	</div>
	
	<div v-cloak>
		<result-card></result-card>
	</div> 
	
</div>
`

export default {
	template,
	components: {
		'result-card': resultCard, 
	},
	
	computed: {
		...Vuex.mapState(['loading', 'object'])
	},
	
}