<script setup lang="ts">
import Header from "./components/Header.vue";
import Template from "./components/Template.vue";
import Upload from "./components/Upload.vue";
import Metrics from "./components/Metrics.vue";
import { Metric as TypeOfMetrics } from "./types/metric.ts";
import { ref } from "vue";

const metricsData = ref<TypeOfMetrics | null>(null);

function generateGraphics(data: TypeOfMetrics) {
  metricsData.value = data;
}
</script>

<template>
  <Header />
  <Template />
  <Upload @upload="generateGraphics" />
  <Metrics :data="metricsData" />
</template>

<style scoped></style>
