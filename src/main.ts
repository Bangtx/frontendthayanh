import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Base from './components/base.vue'

createApp(App).use(router).mount('#app')
