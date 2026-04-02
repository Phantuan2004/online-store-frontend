import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import './assets/css/vendor/bootstrap.min.css'
import './assets/css/vendor/remixicon.css'
import './assets/css/style.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
