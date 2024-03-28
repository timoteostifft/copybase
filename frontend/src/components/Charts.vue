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
            backgroundColor: "#4c1191",
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
            backgroundColor: "#4c1191",
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
        <img src="../assets/empty.svg" alt="Copybase" />
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
    padding: 0px 20px;
    margin: 0 auto;

    img {
      margin-top: 20px;

      opacity: 0.2;
    }

    h2 {
      color: var(--purple-900);
      font-weight: 700;
    }

    h4 {
      color: var(--purple-900);
      font-weight: 700;
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
    }
  }
}

@media (min-width: 1141px) {
  #content {
    h2 {
      font-size: 2rem;
    }

    h4 {
      font-size: 1.5rem;
      line-height: 2rem;
    }

    h4:not(:first-of-type) {
      margin-top: 80px;
    }

    img {
      width: 140px;
      opacity: 0.2;
    }

    p {
      font-size: 1.25rem;
      width: 600px;
      margin: 0 auto;
    }
  }
}

@media (max-width: 1140px) {
  img {
    width: 100px;
  }

  h4 {
    margin-top: 20px;
  }

  h4:nth-of-type(2) {
    margin-top: 60px;
  }
}

@media (max-width: 767px) or (min-width: 1140px) {
  #content {
    max-width: 1140px;
  }
}

@media (min-width: 768px) and (max-width: 1140px) {
  #content {
    max-width: 800px;
  }
}
</style>

<script></script>
