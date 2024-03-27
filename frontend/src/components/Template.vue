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
      <a :href="api + '/stub'">TESTAR</a>
    </div>
  </div>
</template>

<style scoped lang="scss">
#container {
  margin-top: 40px;
  #content {
    max-width: 1280px;
    padding: 0 20px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      text-align: center;
      color: var(--purple-900);
      font-weight: 700;
      line-height: 2.25rem;
    }

    p {
      margin-top: 20px;
      color: var(--text);
    }

    a {
      font-weight: 900;
      padding: 10px 20px;
      font-size: 1.25rem;
      text-decoration: none;
    }

    a:nth-of-type(1) {
      margin-top: 20px;
      background-image: linear-gradient(
        82deg,
        var(--green-500),
        var(--green-900)
      );
      color: var(--background);
    }

    a:nth-of-type(2) {
      margin-top: 10px;
      background-color: var(--background);
      color: var(--green-900);
      border: 2px solid var(--green-900);
    }
  }
}
</style>
