// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import router from './router'
import App from './App.vue'
import globalVariable from './api/global_variable.js'
import '../public/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// import moment from 'moment'

Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.prototype.GLOBAL = globalVariable
Vue.prototype.$axios = axios
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:8081'
// axios.defaults.baseURL = 'http://192.168.2.83:8080';

// axios.defaults.baseURL = 'http://localhost:8080';
// axios.defaults.baseURL = 'http://192.168.2.122:8081';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
/* eslint-disable no-new */
new Vue({
    router,
    store,
    components: { App },
    template: '<App/>'
}).$mount('#app')
