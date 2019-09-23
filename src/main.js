import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './plugins/router'
import store from './store/index'

Vue.config.productionTip = false;
Vue.use(require('vue-moment'));

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app');

