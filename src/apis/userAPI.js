import axiosClient from "./baseAPI";

const userAPI = {
  getAll: () => {
    const url = "/user";
    return axiosClient.get(url);
  },
};

export default userAPI;
