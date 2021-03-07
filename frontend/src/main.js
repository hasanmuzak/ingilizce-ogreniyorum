import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import './assets/index.css';
import axios from 'axios';
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000/'

Vue.use(Vuelidate);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
