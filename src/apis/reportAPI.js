import axiosClient from "./baseAPI";

const reportAPI = {
  url: "/report",
  getTestedAmount: (params) => {
    return axiosClient.get(reportAPI.url + "/get-tested-amount", { params });
  },

  getNoTestAmount: (params) => {
    return axiosClient.get(reportAPI.url + "/get-no-test-amount", { params });
  },

  getPassedAmount: (params) => {
    return axiosClient.get(reportAPI.url + "/get-passed-amount", { params });
  },

  getNoPassAmount: (params) => {
    return axiosClient.get(reportAPI.url + "/get-no-pass-amount", { params });
  },

  getSpectrumPoint: (params) => {
    return axiosClient.get(reportAPI.url + "/get-spectrum-point", { params });
  },

  getDetailQuestion: (params) => {
    return axiosClient.get(reportAPI.url + "/get-detail-question", { params });
  },

  getRating: (params) => {
    return axiosClient.get(reportAPI.url + "/get-rating", { params });
  },
};

export default reportAPI;
