<script setup>
const api = import.meta.env.VITE_API;
</script>

<template>
  <div id="container">
    <div id="content">
      <h1>Explore as métricas do seu negócio</h1>
      <p>
        Descubra insights sobre seu negócio visualizando métricas chaves.
        Carregue uma planilha de assinaturas e obtenha análises precisas em
        gráficos interativos.
      </p>
      <a :href="api + '/template'">BAIXAR MODELO</a>
    </div>
  </div>
</template>

<style scoped>
#container {
  width: 100%;
}

#content {
  max-width: 1280px;
  padding: 0 20px;
  margin: 40px auto 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
}

#content > h1 {
  text-align: center;
  color: var(--purple-900);
  font-weight: 700;
  line-height: 2.25rem;
}

#content > p {
  margin-top: 20px;
  color: var(--text);
}

#content > a {
  margin-top: 20px;
  background-color: var(--green);
  color: var(--background);
  font-weight: 900;
  padding: 10px 20px;
  font-size: 1.25rem;
  text-decoration: none;
}
</style>
