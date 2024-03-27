<script setup lang="ts">
import { Metric } from "../types/metric.ts";

defineProps<{
  data: Metric | null;
}>();
</script>

<template>
  <div id="container">
    <div id="content">
      <h2>Visualizar métricas</h2>
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
  }

  h2 {
    color: var(--purple-900);
    font-weight: 700;
  }
}
</style>
