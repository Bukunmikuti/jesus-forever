const template = `
<div v-if='bottomBar'>
	<div id="bottom-bar">
		<div class="btn">
			<i class="v far fa-bookmark"></i>
			<p>Bookmark</p>
		</div>
		<div id="edit-btn" class="btn" @click='edit'>
			<i class="fas fa-plus"></i>
		</div>
		<div id="compare-btn" class="btn">
			<i class="v far fa-clone"></i>
			<p>Compare</p>
		</div>
	</div>
</div>
`

export default {
	template,
	created() {
		
	},
	
	computed: {
		...Vuex.mapState(['bottomBar'])
	},

	data() {
		return {
			visible: true,
		}
	},
	
	methods: {
		edit() {
			console.log(this)
			this.$router.push({
				path: '/', 
				query: {ref: 'ok'} 
			})
			
			//this.$store.commit('SHOW_BOTTOM_BAR', false);
		}
	}

}