import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:9090/api/costopti/be",
  timeout: 5000,
});

export default client;
