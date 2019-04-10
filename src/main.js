import Vue from 'vue';
import App from './App';
import router from './router';

import Fabric from '@/fabric';
// import '../dist/hg-vcomponents.min.css';

Vue.use(Fabric);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
