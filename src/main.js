import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import CKEditor from '@ckeditor/ckeditor5-vue';
import Notifications from '@kyvg/vue3-notification'
import store from "./store";
import NavItem from "./components/NavItem"
import { notify } from "@kyvg/vue3-notification";

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.request.use(function (config) {
    const token = store.getters.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Content-Type"] = 'application/json';
    
    return config;
}, function (err) {
    return Promise.reject(err);
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    console.log(error.response)
    
    if (error.response && error.response.status === 400) {

        if (error.response.statusText !== "") {
            notify({
                title: 'Ошибка',
                type: 'error',
                text: error.response.statusText
            })
        }

        if (Array.isArray(error.response.data)) {
            let errors = error.response.data?.errors

            if (errors) {
                for (const error in errors) {
                    notify({
                        title: error,
                        type: 'error',
                        text: errors[error]
                    })
                }
            }
        } else {
            notify({
                title: 'Ошибка',
                type: 'error',
                text: error.response.data
            })

        }
    }

    return Promise.reject(error);
});

const app = createApp(App).use(router)
app.use(VueAxios, axios)
app.use(Notifications)
app.use(CKEditor)
app.use(store)
app.component('nav-item', NavItem)

store.commit('init')

app.mount('#app')

