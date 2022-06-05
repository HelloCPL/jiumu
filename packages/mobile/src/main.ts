import { createApp, App } from 'vue'
import myApp from './App.vue'
import '@/assets/style/reset.css'

const app: App = createApp(myApp)
app.mount('#app')
