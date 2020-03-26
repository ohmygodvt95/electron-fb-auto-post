import Vue from 'vue'
import axios from 'axios'
import Vuesax from 'vuesax'
import App from './App'
import router from './router'
import store from './store'
import 'vuesax/dist/vuesax.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Vuesax)

Vue.mixin({
  methods: {
    openLink: function (link) {
      let shell = require('electron').shell
      shell.openExternal(link)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
