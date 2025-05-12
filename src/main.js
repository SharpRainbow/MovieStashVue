import './assets/global.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import ru from './locales/ru.json'
import router from './router'

const i18n = createI18n({
  locale: 'ru',
  fallbackLocale: 'ru',
  messages: { ru }
})
const app = createApp(App)

app.use(router).use(i18n)

app.mount('#app')
