import "bootstrap/dist/css/bootstrap.min.css"
import "jquery"
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "font-awesome/css/font-awesome.min.css"

import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/* 
    1.创建app
    2.应用store
    3.使用router
    4.注册全局组件
    5.挂载app
*/
const app = createApp(App).use(store).use(router)
// component('my-alter',MyAlter)
//模态框弹出关闭
app.config.globalProperties.$isAlter = false
app.mount('#app')