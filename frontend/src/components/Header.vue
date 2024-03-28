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
    margin: 0 auto;
    padding: 10px 20px;
  }
}

@media (min-width: 768px) {
  #content {
    a > img {
      width: 200px;
      padding: 10px 20px;
    }
  }
}

@media (max-width: 767px) {
  a > img {
    width: 130px;
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
