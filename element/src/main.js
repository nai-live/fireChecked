// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import echarts from 'echarts'


Vue.prototype.$echarts = echarts
Vue.use(VueAxios, axios)
Vue.use(ElementUI);
Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  if(to.path === "/login" || to.path === "/register" || sessionStorage.getItem("user")){
    next()
  }else{
    next({
      path: "/register" 
    })
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
