import instance from "axios";

const axios = instance.create({
  baseURL: import.meta.env.VITE_API,
});

export default axios;
