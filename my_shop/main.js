import App from './App'
import {
	myRequest
} from '@/util/api.js'
import Vue from 'vue'
Vue.prototype.$myRequest = myRequest;
Vue.filter('formatDate', (date) => {
	const newDate = new Date(date);
	const year = newDate.getFullYear();
	const month = newDate.getMonth().toString().padStart(2, 0);
	const day = newDate.getDay().toString().padStart(2, 0)
	return year + '-' + month + '-' + day
})
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()


// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
