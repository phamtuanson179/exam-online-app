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
  getTeacher: (params) => {
    return axiosClient.get(`${userAPI.url}/teacher`, { params });
  },
  getStudent: (params) => {
    return axiosClient.get(`${userAPI.url}/student`, { params });
  },
};

export default userAPI;
