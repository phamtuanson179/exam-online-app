import { message } from "antd";
import axiosInstance from "axios";
import { useNavigate } from "react-router-dom";

const axiosClient = axiosInstance.create({
  baseURL: "http://localhost:8080/api",
});

axiosClient.interceptors.request.use(function (config) {
  //add handle token
  let headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };
  if (config.headers?.["Content-Type"]) {
    delete headers?.["Content-Type"];
  }

  if (localStorage.getItem("token")) {
    headers = {
      ...headers,
      Authorization: localStorage.getItem("token"),
    };
  }

  config.headers = headers;
  return config;
});

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    message.error("Lỗi hệ thống");
    return Promise.reject(err);
  }
);

export default axiosClient;
