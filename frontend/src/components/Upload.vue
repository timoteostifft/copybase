<script setup>
import { ref } from "vue";
import axios from "../services/axios";
import { useToast } from "vue-toastification";

const dropping = ref(false);
const file = ref("");
const toast = useToast();

const emit = defineEmits(["upload"]);

function send() {
  const data = new FormData();
  data.append("file", file.value);

  axios
    .post("/metrics", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      emit("upload", response.data);
    })
    .catch((err) => {
      if (err.response.status === 422) {
        toast.error("Formato inválido de arquivo.");
        return;
      }
      toast.error("Erro inesperado. Tente novamente mais tarde.");
    });
}

function toggleDropping() {
  dropping.value = !dropping.value;
}

function drop(e) {
  toggleDropping();
  file.value = e.dataTransfer.files[0];
  send();
}

function select() {
  const selected = document.getElementById("file").files;
  file.value = selected[0];
  send();
}
</script>

<template>
  <div id="container">
    <div id="content">
      <h2>Envie seu modelo</h2>
      <div
        @dragenter.prevent="toggleDropping"
        @dragleave.prevent="toggleDropping"
        @dragover.prevent
        @drop.prevent="drop"
        :class="{ active: dropping }"
        id="dropzone"
      >
        <img src="../assets/upload.svg" alt="" />
        <span>Arraste seu arquivo</span>
        <span>ou</span>
        <label for="file">SELECIONAR</label>
        <input type="file" id="file" @change="select" />
      </div>
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
    max-width: 1280px;
    padding: 0 20px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 20px;
    color: var(--background);

    #dropzone {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      border-radius: 6px;
      text-align: center;
      font-weight: 400;
      border: 1px dashed var(--background);
      transition: 0.3s ease all;

      span {
        line-height: 1rem;
        margin-top: 10px;
      }

      img {
        width: 30px;
      }

      label {
        margin-top: 10px;
        background-image: linear-gradient(
          82deg,
          var(--green-500),
          var(--green-900)
        );
        color: var(--background);
        font-weight: 900;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 6px;
        cursor: pointer;
        transition: filter 0.6s;
      }

      label:hover {
        filter: brightness(1.2);
      }

      input {
        display: none;
      }
    }

    > span {
      margin: 20px;
      text-align: center;
      font-size: 0.75rem;
    }

    .active {
      filter: brightness(0.8);
    }
  }
}
</style>
