const template = `
<div>
	New Route: {{query}}
</div>
`

export default {
	template,
	created() {
		console.log(JSON.parse(JSON.stringify(this.saves)))
	},
	
	computed: {
		...Vuex.mapState(['object', 'saves', 'version']),
		query() {
	  return this.$route.query.ref
	 }
	},

	data() {
		return {
			visible: true,
		}
	},



}