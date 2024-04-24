//@ts-ignore
import VCalendar from "v-calendar";
//@ts-ignore
import VueApexCharts from "vue3-apexcharts";
import app from "../../config/configApp";

app.use(VueApexCharts);
app.use(VCalendar, {});
