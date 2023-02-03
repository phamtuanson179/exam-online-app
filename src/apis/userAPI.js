import axiosClient from "./baseAPI";

const userAPI = {
  url: "/user",
  get: () => {
    return axiosClient.get(userAPI.url);
  },
  create: (body) => {
    return axiosClient.post(userAPI.url, body);
  },
  createBatch: (body) => {
    return axiosClient.post(`${userAPI.url}/batch`, body, {
      headers: { "Content-Type": "Multipart/formData" },
    });
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
  getCurrentUser: () => {
    return axiosClient.get(`${userAPI.url}/currentUser`);
  },
};

export default userAPI;
