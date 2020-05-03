import Vue from 'vue'
import App from './App'
import store from './store'

// import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
//import 'swiper/css/swiper.css'

// Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.prototype.$store = store 
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
