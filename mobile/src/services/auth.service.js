import axios from "axios"
import http from './api'

 //const API_URL = "http://chamadosrj.ddns.net:8089/api/auth/";
 const API_URL = "http://10.1.1.26:5099/api/auth/";

 const register = (email, password) => {
  return axios.post(API_URL + "signup", {
    email,
    password,
  });
};
const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};
export default {
  register,
  login,
  logout,
};