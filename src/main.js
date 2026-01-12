import { createApp } from "vue";
import "./style.css";

//import js from bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App.vue";
import router from "./router";
createApp(App).use(router).mount("#app");
// createApp(App).mount("#app");
