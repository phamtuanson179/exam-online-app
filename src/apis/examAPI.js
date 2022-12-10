import axiosClient from "./baseAPI";

const examAPI = {
  url: "/exam",
  get: (params) => {
    return axiosClient.get(examAPI.url, { params });
  },
  getById: () => {
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
  getQuestionOfExam: (params) => {
    return axiosClient.get(`${examAPI.url}/question-of-exam`, { params });
  },
  createQuestionOfExam: (params) => {
    return axiosClient.post(`${examAPI.url}/question-of-exam`, null, {
      params,
    });
  },
  deleteQuestionOfExam: (params) => {
    return axiosClient.delete(`${examAPI.url}/question-of-exam`, { params });
  },
  updateQuestionOfExam: (params, body) => {
    return axiosClient.put(`${examAPI.url}/question-of-exam`, body, { params });
  },
};

export default examAPI;
