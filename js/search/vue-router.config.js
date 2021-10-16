import search from './components/search.js';
import App from './App.js'

export const routes = [
	{
		path: '/',
		component: App
	}, 
]

export const router = VueRouter.createRouter({
	history: VueRouter.createWebHashHistory(),
	routes,
})
