import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import snotify from "vue3-snotify";
import "vue3-snotify/style";
import { createVuetify } from "vuetify/lib/framework.mjs";
import { VSelect, VSheet } from "vuetify/lib/components/index.mjs";
import { VCalendar } from "vuetify/lib/labs/components.mjs";
import "vuetify/styles";

const app = createApp(App);
const vuetify = createVuetify({
  components: {
    VSelect,
    VSheet,
    VCalendar,
  },
});
app.use(snotify);
app.use(vuetify);
app.component("VueDatePicker", VueDatePicker);
app.use(router).mount("#app");
