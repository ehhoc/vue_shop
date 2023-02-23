import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

// import axios from 'axios'
// axios.defaults.baseURL = ''
// 给Vue函数添加一个原型属性$axios 指向axios
// 这样做的好处是在vue实例或组件中不用再去重复引用axios 直接用this.$axios就能执行axios 方法了
// Vue.prototype.$http =axios

// 意思是阻止你显示显示生产模式的消息
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
