import store from './store.js';
import App from './App.js';
import {routes, router} from './vue-router.config.js'



const app = Vue.createApp({
	data() {
		return {
			message: 'Hello Vue!!'
		}
	}
})

// Define a new global component called App
app.component('App', App);
app.use(store);
app.use(router);
const vm = app.mount('#app');
