import Vue from 'vue';
import App from './App';
import VueFabric from '../dist/vue-fabric.umd';

Vue.component('VueFabric', VueFabric);

new Vue({
  render: h => h(App)
}).$mount('#app');
