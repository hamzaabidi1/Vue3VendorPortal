import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PrimeVue from "primevue/config";
import Steps from 'primevue/steps';
import Sidebar from 'primevue/sidebar';
import Toast from 'primevue/toast';
import BadgeDirective from 'primevue/badgedirective';
import Tooltip from 'primevue/tooltip';
import { FontAwesomeIcon } from './plugins/font-awesome'
import ToastService from 'primevue/toastservice';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App)
app.use(PrimeVue)
app.use(router)
app.use(store)
app.use(ToastService)
app.directive('badge', BadgeDirective);
app.component("font-awesome-icon", FontAwesomeIcon)
app.component("Steps", Steps)
app.component("Toast",Toast )
app.component("Sidebar",Sidebar)
app.directive('tooltip', Tooltip);
app.mount("#app");

