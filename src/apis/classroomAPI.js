import axiosClient from "./baseAPI";

const classroomAPI = {
  url: "/classroom",
  getAll: () => {
    return axiosClient.get(classroomAPI.url);
  },
  create: (body) => {
    return axiosClient.post(classroomAPI.url, body);
  },
  update: (params, data) => {
    return axiosClient.put(classroomAPI.url, data, { params });
  },
  delete: (params) => {
    return axiosClient.delete(classroomAPI.url, { params });
  },
  getExamOfClassroom: (params) => {
    return axiosClient.get(`${classroomAPI.url}/exam-of-classroom`, { params });
  },
  updateExamOfClassroom: (params, body) => {
    return axiosClient.put(`${classroomAPI.url}/exam-of-classroom`, body, {
      params,
    });
  },
  getTeacherOfClassroom: (params) => {
    console.log({ params });
    return axiosClient.get(`${classroomAPI.url}/teacher-of-classroom`, {
      params,
    });
  },
  updateTeacherOfClassroom: (params, body) => {
    return axiosClient.put(`${classroomAPI.url}/teacher-of-classroom`, body, {
      params,
    });
  },
  getStudentOfClassroom: (params) => {
    return axiosClient.get(`${classroomAPI.url}/student-of-classroom`, {
      params,
    });
  },
  updateStudentOfClassroom: (params, body) => {
    return axiosClient.put(`${classroomAPI.url}/student-of-classroom`, body, {
      params,
    });
  },
};

export default classroomAPI;
