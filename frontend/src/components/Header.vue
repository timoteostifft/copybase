<template>
  <div id="container">
    <div id="content">
      <a href="">
        <img src="../assets/logo.svg" alt="Copybase" />
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
#container {
  position: fixed;
  width: 100%;
  top: 0;
  background-image: linear-gradient(
    82deg,
    var(--purple-500),
    var(--purple-900)
  );

  #content {
    max-width: 1280px;
    padding: 10px 20px;
    margin: 0 auto;
  }

  a > img {
    width: 130px;
  }
}
</style>
