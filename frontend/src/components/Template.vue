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
      <div>
        <a :href="api + '/template'">BAIXAR MODELO</a>
        <a :href="api + '/stub'">TESTAR</a>
        <img src="../assets/report.png" alt="Foto analisando dados" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#container {
  #content {
    padding: 0 20px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    h1 {
      color: var(--purple-900);
      font-weight: 700;
      line-height: 2.25rem;
    }

    p {
      margin-top: 20px;
      color: var(--text);
    }

    > div {
      margin-top: 20px;
      display: flex;
      gap: 10px;

      a {
        font-weight: 900;
        padding: 10px 20px;
        text-decoration: none;
      }

      a:nth-of-type(1) {
        background-image: linear-gradient(
          82deg,
          var(--green-500),
          var(--green-900)
        );
        color: var(--background);
      }

      a:nth-of-type(2) {
        background-color: var(--background);
        color: var(--green-900);
        border: 2px solid var(--green-900);
      }

      > img {
        margin-top: -80px;
        margin-left: auto;
        width: 500px;
      }
    }
  }
}

@media (min-width: 1141px) {
  #content {
    text-align: left;

    h1 {
      font-size: 2.5rem;
    }

    p {
      font-size: 1.25rem;
      width: 600px;
    }

    > div {
      flex-direction: row;

      a {
        background-color: blue;
        font-size: 1.25rem;
        height: 48px;
      }
    }
  }
}

@media (max-width: 1140px) {
  #content {
    text-align: center;

    > div {
      flex-direction: column;

      a {
        font-size: 1.25rem;
      }

      img {
        display: none;
      }
    }
  }
}

@media (max-width: 767px) or (min-width: 1140px) {
  #content {
    max-width: 1140px;
  }
}

@media (min-width: 768px) {
  #container {
    margin-top: 200px;
  }
}

@media (max-width: 768px) {
  #container {
    margin-top: 100px;
  }
}

@media (min-width: 768px) and (max-width: 1140px) {
  #container {
    margin-top: 140px;

    #content {
      max-width: 800px;

      > div {
        flex-direction: column;
      }
    }
  }
}
</style>
