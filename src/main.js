import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 引入 Bootstrap 5
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;
// import "bootstrap/scss/bootstrap.scss";
import "@/assets/scss/all.scss";
import "bootstrap-icons/font/bootstrap-icons.scss";

// 引入 Axios
import axios from "axios";
import VueAxios from "vue-axios";

// 引入 VueLoading
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

// import animated from "animate.css";

// 引入 Vee-Validate
import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import ja from "@vee-validate/i18n/dist/locale/ja.json";

// 加入全部規則
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

// 設定 Vee-Validate
configure({
  generateMessage: localize({ ja: ja }),
  validateOnInput: true,
});

// 設定預設日本語系
setLocale("ja");

const app = createApp(App);
app.use(router);

// 使用 VueAxios plugin
app.use(VueAxios, axios);

// 使用 VueLoading plugin
app.use(VueLoading, {
  color: "var(--bs-success)",
  loader: "dots",
});

// app.use(animated);

// 加入 Vee-Validate 元件
app.component("VForm", Form);
app.component("VField", Field);
app.component("ErrorMessage", ErrorMessage);

// filters
app.config.globalProperties.$filters = {
  // 金額加入日幣符號和千分位
  currencyJPY(value) {
    value = "¥ " + value;
    let comma = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
    return value.replace(comma, ",");
  },
  // 單一金額加入千分位
  thousandths(value) {
    value = "" + value;
    let comma = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
    return value.replace(comma, ",");
  },
};

app.mount("#app");
