const template = `
<div id="welcome" ref='welcome'>
 <h1>Welcome to Jesus Forever! 📝</h1>
 <p>Search for a verse and set up the edit page
 <br>Get started below.<br>
 <br>We use browser cookies to deliver personalised results. By continuing, you agree to our data and user policy.</p>
 <button id="welcome-btn" @click='hide'>Got it</button>
</div>
`

export default {
	template,
	data() {
		return {
			count: 0
		}
	},
	methods: {
		hide(e) {
			let welcome = this.$refs.welcome;
			welcome.style.display = 'none'
		} 
	}
}