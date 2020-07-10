import Vue from 'vue'
import ElementUI from 'element-ui';
import '../node_modules/element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import VueClipboard  from 'vue-clipboard2'


Vue.config.productionTip = false
Vue.use( VueClipboard )
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
