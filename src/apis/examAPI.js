import axiosClient from "./baseAPI";

const examAPI = {
  url: "/exam",
  get: (params) => {
    return axiosClient.get(examAPI.url, { params });
  },
  getById: (params) => {
    return axiosClient.get(`${examAPI.url}/get-by-id`, { params });
  },
  getByClassroomId: (params) => {
    return axiosClient.get(`${examAPI.url}/get-by-classroom-id`, { params });
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
  getExamOfCurrentUser: () => {
    return axiosClient.get(`${examAPI.url}/current-user`);
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
