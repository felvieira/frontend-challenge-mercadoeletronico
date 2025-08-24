import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import router from './router'
import { queryClient } from './providers/queryClient'
import './styles/tailwind.css'

const app = createApp(App)

app.use(router)
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')