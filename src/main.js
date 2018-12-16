// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import Search from './components/search'
import Asset from './components/asset'
Vue.config.productionTip = false;

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/search',
      name:'search',
      component: Search,
    },
    {
      path: '/asset/:id',
      name:'asset',
      component: Asset,
    },
    {
      path: '*',
      redirect: '/search'
    }

  ]
});


new Vue({
  el: '#app',
  render (h) { return h(App) },
  router
});

