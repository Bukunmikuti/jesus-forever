const template = `

<div v-if='bottomBar'>
	<div id="bottom-bar">
	
	 <div id='more-tab'>
	  <div id='more-list' ref='moreList'>
		  <ul>
		   <li> 
		    <i class="icon far fa-bookmark"></i>
		    <span>Bookmark</span>
		   </li>
		   <li>
		    <i class="icon far fa-clone"></i>
		    <span>Compare</span>
		   </li>
		  </ul>
		 </div>
		 
	  <div class="btn" id='more-btn' @click='expandMore'>
			 <i class="fas fa-ellipsis-h"></i>
		 </div>
	 </div>
		
		<div id="edit-btn" class="btn" @click='edit'>
			<i class="fas fa-plus"></i>
		</div>
		
	</div>
</div>
`

export default {
	template,
	created() {
		
	},
	
	computed: {
		...Vuex.mapState(['bottomBar', 'saves']), 
	},

	data() {
		return {
			visible: true,
		}
	},
	
	methods: {
		edit() {
		 //console.log(JSON.parse(JSON.stringify(this.saves)))
		 let query = this.getUrl()
			this.$router.push({
				path: '/', 
				query: {ref: query} 
			})
		}, 
		
		expandMore() {
		 let target = this.$refs.moreList;
		 target.classList.toggle('open');
		}, 
		
		getUrl() {
		 let query = ''
		 this.saves.forEach((save, i, saves) => {
		  if (i == saves.length - 1) {
		   query += `${save.apiBook}.${save.version}`;
		  } else {
		   query += `${save.apiBook}.${save.version} `;
		  }
		 })
		 
		 return query;
		}
	}

}