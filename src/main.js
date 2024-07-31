import './assets/main.css'
import router from "@/router/index.js";

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
app.use(router);
app.mount('#app');

const token = localStorage.getItem('token');

if (!token) {
    router.push("/iniciar-sesion");
}
