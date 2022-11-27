import axiosClient from "./baseAPI";

const userAPI = {
  url: "/user",
  getAll: () => {
    return axiosClient.get(userAPI.url);
  },
  create: (body) => {
    return axiosClient.post(userAPI.url, body);
  },
  update: (params, data) => {
    return axiosClient.put(userAPI.url, data, { params });
  },
  delete: (params) => {
    return axiosClient.delete(userAPI.url, { params });
  },
};

export default userAPI;
