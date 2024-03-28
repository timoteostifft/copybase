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
    max-width: 1280px;
    padding: 40px 20px 40px 20px;
    margin: 0 auto;

    a > img {
      width: 160px;
    }

    > p {
      margin-top: 40px;
      font-size: 0.8rem;
      color: var(--background);
    }

    > span {
      margin-top: 20px;
      font-size: 0.8rem;
      color: var(--background);
      text-align: right;
    }
  }
}
</style>
