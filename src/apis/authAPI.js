import axiosClient from "./baseAPI";

const authAPI = {
  url: "/auth",
  login: (body) => {
    return axiosClient.post(`${authAPI.url}/sign-in`, body);
  },
};

export default authAPI;
