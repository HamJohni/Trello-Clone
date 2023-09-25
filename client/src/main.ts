import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import 'tailwindcss/tailwind.css'
import axios from "axios";
require('@/store/modules/useSubscriber')
axios.defaults.baseURL = 'http://localhost:5000/api'

store.dispatch('useAuth/attempt', localStorage.getItem('token'))
    .then(() => {
            createApp(App)
                .use(store)
                .use(router)
                .mount('#app')
    })
