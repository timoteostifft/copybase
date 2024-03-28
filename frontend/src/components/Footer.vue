<template>
  <div id="container">
    <div id="content">
      <a href="">
        <img src="../assets/logo.svg" alt="Copybase" />
      </a>
      <p>
        A Copybase é uma ferramenta baseada em inteligência artificial (GPT-4)
        treinada com conteúdos de marketing, em português, para entregar
        resultados eficientes para profissionais da área.
      </p>
      <span>Copyright © 2024 | Timóteo Stifft</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
#container {
  margin-top: 40px;
  background-image: linear-gradient(
    82deg,
    var(--purple-500),
    var(--purple-900)
  );

  #content {
    display: flex;
    flex-direction: column;
    padding: 40px 20px 40px 20px;
    margin: 0 auto;

    > p {
      margin-top: 40px;
      color: var(--background);
    }

    > span {
      margin-top: 20px;
      color: var(--background);
      text-align: right;
    }
  }
}

@media (min-width: 768px) {
  #content {
    max-width: 1140px;

    a > img {
      width: 200px;
    }

    > p {
      font-size: 1rem;
    }

    > span {
      font-size: 1rem;
    }
  }
}

@media (max-width: 767px) {
  #content {
    a > img {
      width: 160px;
    }
    > p {
      font-size: 0.8rem;
    }

    > span {
      font-size: 0.8rem;
    }
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
