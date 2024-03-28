<script setup lang="ts">
import Header from "./components/Header.vue";
import Template from "./components/Template.vue";
import Upload from "./components/Upload.vue";
import Charts from "./components/Charts.vue";
import { Metrics as TypeOfMetrics } from "./types/metric.ts";
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
  <Charts :data="metricsData" />
</template>

<style scoped></style>
