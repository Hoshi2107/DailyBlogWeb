import axios from "axios";

const API = "https://localhost:7181/api/auth";

export const login = (data) => {
  return axios.post(`${API}/login`, data);
};
