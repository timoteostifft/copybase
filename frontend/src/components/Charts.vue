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
let mrr = emtpy;

watch(
  () => props.data,
  () => {
    if (props.data) {
      const filtered = props.data.filter((e) => e.churn);

      churn = {
        labels: filtered.map((e) => {
          const index = e.month.toString().indexOf("T");
          return e.month.toString().substring(0, index);
        }),
        datasets: [
          {
            label: "Porcentagem",
            data: filtered.map((e) => e.churn),
            backgroundColor: "#5f13b6",
            borderColor: "#FFF",
            borderWidth: 2,
          },
        ],
      };

      mrr = {
        labels: filtered.map((e) => {
          const index = e.month.toString().indexOf("T");
          return e.month.toString().substring(0, index);
        }),
        datasets: [
          {
            label: "Valor",

            data: filtered.map((e) => e.mrr),
            backgroundColor: "#5f13b6",
            borderColor: "#FFF",
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
      <div v-if="churn.datasets.length">
        <h4>Taxa de rotatividade</h4>
        <div>
          <Bar
            :data="churn"
            :options="{
              maintainAspectRatio: false,
            }"
          />
        </div>
        <h4>Receita recorrente</h4>
        <div>
          <Bar
            :data="mrr"
            :options="{
              maintainAspectRatio: false,
            }"
          />
        </div>
      </div>
      <div v-else>
        <img src="../assets/file-unknown-svgrepo-com.svg" alt="Copybase" />
        <p>
          Parece que nenhuma planilha foi carregada. Envie seu modelo para que
          possamos gerar as métricas.
        </p>
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
    }

    h4:nth-of-type(2) {
      margin-top: 20px;
    }
    p {
      margin-top: 20px;
      color: var(--text);
    }

    > div {
      margin-top: 20px;
      text-align: center;

      > div {
        height: 320px;
      }

      img {
        margin-top: 20px;
        width: 100px;
        opacity: 0.2;
      }
    }
  }
}
</style>

<script></script>
