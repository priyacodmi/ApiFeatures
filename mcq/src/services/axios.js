import axios from "axios";

const API = axios.create({
  withCredentials: true,
  baseURL:'http://localhost:5000/api'
});

export default API;
