import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PrimeVue from "primevue/config";
import Steps from 'primevue/steps';
import Sidebar from 'primevue/sidebar';
import Toast from 'primevue/toast';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from './plugins/font-awesome'
import ToastService from 'primevue/toastservice';
createApp(App)
  .use(PrimeVue)
  .use(router)
  .use(store)
  .use(ToastService)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("Steps", Steps)
  .component("Toast",Toast )
  .component("Sidebar",Sidebar)
  .mount("#app");
