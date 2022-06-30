import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = "https://reqres.in/api";
const token = Cookies.get("token");

axios.interceptors.request.use((request) => {
  request.headers["type"] = "web";
  return request;
});

if (token) {
  axios.interceptors.request.use((request) => {
    request.headers["Authorization"] = `bearer ${token}`;
    return request;
  });
}

export default baseUrl;
