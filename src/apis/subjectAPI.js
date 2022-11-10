import axiosClient from "./baseAPI";

const subjectAPI = {
  url: "/subject",
  getAll: () => {
    return axiosClient.get(subjectAPI.url);
  },
  create: (body) => {
    return axiosClient.post(subjectAPI.url, body);
  },
  update: (params, data) => {
    return axiosClient.put(subjectAPI.url, data, { params });
  },
  delete: (params) => {
    console.log({ params });
    return axiosClient.delete(subjectAPI.url, { params });
  },
};

export default subjectAPI;
