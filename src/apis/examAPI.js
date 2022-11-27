import axiosClient from "./baseAPI";

const examAPI = {
  url: "/exam",
  getAll: () => {
    return axiosClient.get(examAPI.url);
  },
  create: (body) => {
    return axiosClient.post(examAPI.url, body);
  },
  update: (params, data) => {
    return axiosClient.put(examAPI.url, data, { params });
  },
  delete: (params) => {
    return axiosClient.delete(examAPI.url, { params });
  },
};

export default examAPI;
