import axios from "axios"
import http from './api'

 //const API_URL = "http://chamadosrj.ddns.net:8089/api/auth/";
const API_URL = "http://10.1.1.26:5099/api/auth/";
const FORGOT_URL = "http://10.1.1.26:5099/api/email";

const register = (email, password, tipo, situacao) => {
  return axios.post(API_URL + "signup", {
    email,
    password,
    tipo,
    situacao
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

const esqueci = (email) => {
  return axios
    .get(FORGOT_URL + "?email="+email , {
      email: email,
      acao: esqueci,
    })
    .then((response) => {
      return response.data;
    });
};

const existe = (email) => {
  console.log('email', email)
  return axios
    .get(API_URL + "usuarios?email="+email)
    .then((response) => {
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