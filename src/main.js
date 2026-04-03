import { createApp, nextTick } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import './assets/user/css/vendor/materialdesignicons.min.css'
import './assets/user/css/vendor/remixicon.css'
import './assets/user/css/vendor/animate.css'
import './assets/user/css/vendor/bootstrap.min.css'
import './assets/user/css/vendor/aos.min.css'
import './assets/user/css/vendor/range-slider.css'
import './assets/user/css/vendor/swiper-bundle.min.css'
import './assets/user/css/vendor/jquery.slick.css'
import './assets/user/css/vendor/slick-theme.css'
import './assets/user/css/style.css'

const app = createApp(App)
app.use(router)
app.mount('#app')

nextTick(() => {
  window.__ONLINE_STORE_APP_MOUNTED__ = true
  window.dispatchEvent(new Event('online-store:app-mounted'))
})
