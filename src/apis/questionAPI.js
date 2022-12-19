import axiosClient from "./baseAPI";

const questionAPI = {
  url: "/question",
  get: (params) => {
    return axiosClient.get(questionAPI.url, { params });
  },
  getById: (params) => {
    return axiosClient.get(`${questionAPI.url}/get-by-id`, { params });
  },
  create: (body) => {
    return axiosClient.post(questionAPI.url, body);
  },
  update: (params, data) => {
    return axiosClient.put(questionAPI.url, data, { params });
  },
  delete: (params) => {
    return axiosClient.delete(questionAPI.url, { params });
  },
};

export default questionAPI;
