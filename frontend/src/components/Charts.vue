<script setup lang="ts">
import { watch } from "vue";
import { Metrics } from "../types/metric";
import { Bar } from "vue-chartjs";
import { ChartData } from "chart.js";

const props = defineProps<{
  data: Metrics | null;
}>();

const emtpy = {
  labels: [],
  datasets: [],
} as ChartData<"bar", (number | [number, number] | null)[], unknown>;

let churn = emtpy;

watch(
  () => props.data,
  () => {
    if (props.data) {
      const filtered = props.data.churn.filter((item) => item.percentage > 0);

      churn = {
        labels: filtered.map((item) => {
          if (item.percentage > 0) {
            const index = item.month.toString().indexOf("T");
            return item.month.toString().substring(0, index);
          }
        }),
        datasets: [
          {
            label: "Porcentagem",
            data: filtered.map((item) => item.percentage),
            backgroundColor: "#5f13b6",
            borderColor: "#41167f",
            borderWidth: 2,
          },
        ],
      };
    }
  }
);
</script>

<template>
  <div id="container">
    <div id="content">
      <h2>Visualizar métricas</h2>
      <h4>Taxa de rotatividade</h4>
      <div v-if="churn.datasets.length">
        <Bar
          :data="churn"
          :options="{
            maintainAspectRatio: false,
          }"
        />
      </div>
      <div v-else>
        <p>VAZIO</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#container {
  margin-top: 40px;
  #content {
    max-width: 1280px;
    padding: 0px 20px;
    margin: 0 auto;

    h2 {
      color: var(--purple-900);
      font-weight: 700;
    }

    h4 {
      margin-top: 20px;
      color: var(--purple-900);
      font-weight: 700;
      text-align: center;
    }

    > div {
      height: 320px;
      overflow-y: scroll;
    }
  }
}
</style>

<script></script>
