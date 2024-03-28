import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

const app = createApp(App);

app.use(Toast, {
  position: POSITION.TOP_CENTER,
});

app.mount("#app");

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement
);
