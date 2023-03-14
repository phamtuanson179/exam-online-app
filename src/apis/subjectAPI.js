import axiosClient from "./baseAPI";

const subjectAPI = {
  url: "/subject",
  get: () => {
    return axiosClient.get(subjectAPI.url);
  },
  create: (body) => {
    return axiosClient.post(subjectAPI.url, body);
  },
  createBatch: (body) => {
    return axiosClient.post(`${subjectAPI.url}/batch`, body, {
      headers: { "Content-Type": "Multipart/formData" },
    });
  },
  update: (params, data) => {
    return axiosClient.put(subjectAPI.url, data, { params });
  },
  delete: (params) => {
    return axiosClient.delete(subjectAPI.url, { params });
  },
  getTeacher: (params) => {
    return axiosClient.get(`${subjectAPI.url}/teacher`, { params });
  },
  updateTeacher: (body) => {
    return axiosClient.put(`${subjectAPI.url}/teacher`, body);
  },
  getStudent: (params) => {
    return axiosClient.get(`${subjectAPI.url}/student`, { params });
  },
  updateStudent: (body) => {
    return axiosClient.put(`${subjectAPI.url}/student`, body);
  },
};

export default subjectAPI;
