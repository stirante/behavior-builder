import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import JsonViewer from 'vue-json-viewer'

Vue.use(JsonViewer);

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
