import { createApp } from 'vue'
import { i18n } from './i18n'
import App from './App.vue'
import './style/global.css'

createApp(App).use(i18n).mount('#app')
