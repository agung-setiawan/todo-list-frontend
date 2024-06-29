import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/main.css'
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import DashboardPage from './components/pages/DashboardPage';
import NewPage from './components/pages/crud/NewPage';
import EditPage from './components/pages/crud/EditPage';
import ShowPage from './components/pages/crud/ShowPage';

axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.interceptors.request.use(function (config) {
  config.headers['X-Api-Key'] = process.env.VUE_APP_API_KEY;
  config.headers['Accept'] = process.env.HEADERS;
  return config;
});

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: LoginPage },
      { path: '/register', component: RegisterPage },
      { path: '/dashboard', component: DashboardPage },
      { path: '/create', component: NewPage },
      { path: '/edit/:id', component: EditPage },
      { path: '/show/:id', component: ShowPage },
    ],
  });

createApp(App).use(router).mount('#app');