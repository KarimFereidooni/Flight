import Vue from "vue";
import Vuetify from "vuetify";
import { Framework } from "vuetify";
import { icons } from "./mdi";
import "vuetify/dist/vuetify.css";

Vue.use(Vuetify);

declare module "vue/types/vue" {
  interface Vue {
    $vuetify: Framework;
  }
}

export default new Vuetify({
  icons: { iconfont: "mdi", values: icons },
  rtl: false,
  theme: {
    dark: false,
    themes: {
      light: {
        primary: "#f8654e"
      }
    }
  },
});
