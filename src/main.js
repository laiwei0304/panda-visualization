import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

// 引用插件
import "lib-flexible/flexible.js"

const app = createApp(App)
app.use(ElementPlus)

app.use(router)

app.mount('#app')
