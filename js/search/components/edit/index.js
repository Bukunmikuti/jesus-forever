const template = `
<div>
	New Route: {{this.$route.query.ref}}
</div>
`

export default {
	template,
	created() {
		console.log(JSON.parse(JSON.stringify(this.saves)))
	},
	
	computed: {
		...Vuex.mapState(['object', 'saves', 'version']),
	},

	data() {
		return {
			visible: true,
		}
	},



}