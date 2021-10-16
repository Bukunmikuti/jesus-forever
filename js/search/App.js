import search from './components/search.js';
import edit from './components/edit/index.js';


const template = `
<div id='overall-container'>
<edit v-if='ref'></edit>
<search v-else></search>


</div>

`

export default {
	template,
	components: {
		search, 
		edit
	},
	
	computed: {
		ref() {
			return this.$route.query.ref;
		}
	}
	
}
