import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import snotify from 'vue3-snotify';
import 'vue3-snotify/style';

const app = createApp(App);
app.use(snotify);
app.component('VueDatePicker', VueDatePicker);
app.use(router).mount('#app')
