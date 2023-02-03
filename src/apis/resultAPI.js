import axiosClient from "./baseAPI";

const resultAPI = {
  url: "/result",
  get: (params) => {
    return axiosClient.get(resultAPI.url, { params });
  },
  create: (body) => {
    return axiosClient.post(resultAPI.url, body);
  },
  getByExamId: (params) => {
    return axiosClient.get(`${resultAPI.url}/get-by-exam-id`, { params });
  },
  downloadResult: (params) => {
    return axiosClient.get(
      `${resultAPI.url}/download`,
      { params },
      { responseType: "arraybuffer" }
    );
  },
};

export default resultAPI;
