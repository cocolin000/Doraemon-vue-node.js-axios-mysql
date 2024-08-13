import "bootstrap/dist/css/bootstrap.min.css"
import "jquery"
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "font-awesome/css/font-awesome.min.css"

import { createApp } from 'vue'
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
// 注册全局函数
app.config.globalProperties.$formatTime = (value) => {
    // const date = new Date(value);
    // const year = date.getFullYear();
    // const month = String(date.getMonth() + 1).padStart(2, '0');
    // const day = String(date.getDate()).padStart(2, '0');
    // const hours = String(date.getHours()).padStart(2, '0');
    // const minutes = String(date.getMinutes()).padStart(2, '0');
    // // const seconds = String(date.getSeconds()).padStart(2, '0');
    // // 返回格式化后的时间字符串
    // return `${year}-${month}-${day} ${hours}:${minutes}`;
    //获取js 时间戳
    if(!value) return '未知'
    var time = new Date().getTime();
    //去掉 js 时间戳后三位，与php 时间戳保持一致
    time = parseInt((time - value) / 1000);
    //存储转换值 
    var s;
    if (time < 60 * 10) {//十分钟内
        return '刚刚';
    } else if ((time < 60 * 60) && (time >= 60 * 10)) {
        //超过十分钟少于1小时
        s = Math.floor(time / 60);
        return s + "分钟前";
    } else if ((time < 60 * 60 * 24) && (time >= 60 * 60)) {
        //超过1小时少于24小时
        s = Math.floor(time / 60 / 60);
        return s + "小时前";
    } else if ((time < 60 * 60 * 24 * 30) && (time >= 60 * 60 * 24)) {
        //超过1天少于30天内
        s = Math.floor(time / 60 / 60 / 24);
        return s + "天前";
    } else {
        //超过30天ddd
        let date = new Date(parseInt(value));
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    }
};
//自定义指令
/* app.directive('my-model',{
    beforeMount(el, binding) {
        });
      },
      mounted(el, binding) {
      },
}) */
// component('my-alter',MyAlter)
//模态框弹出关闭
app.config.globalProperties.$isAlter = false
app.mount('#app')