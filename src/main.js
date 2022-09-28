import Vue from 'vue'
import App from './App.vue'

import store from '@/store';
import router from './router'
import axios from '@/initial/axios';

import '@/initial/vue-modules';
import '@/initial/vue-directives';

Vue.config.productionTip = false

new Vue({
  store,
  router,
  axios,
  render: h => h(App)
}).$mount('#app')
