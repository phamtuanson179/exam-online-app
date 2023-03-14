import axiosClient from "./baseAPI";

const classroomAPI = {
  url: "/classroom",
  get: (params) => {
    return axiosClient.get(classroomAPI.url,{params});
  },
  getClassByExamId: (params) => {
    return axiosClient.get(classroomAPI.url+'/get-class-by-exam-id',{params});
  },
  create: (body) => {
    return axiosClient.post(classroomAPI.url, body);
  },
  createBatch: (body) => {
    return axiosClient.post(`${classroomAPI.url}/batch`, body, {
      headers: { "Content-Type": "Multipart/formData" },
    });
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
