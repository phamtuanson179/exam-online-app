import { configureStore } from "@reduxjs/toolkit";
import { studentExamSlice } from "pages/student-exam/redux/studentExamSlice";
import { subjectSlice } from "pages/subject/redux/subjectSlice";
import { userSlice } from "pages/user/redux/userSlice";
import thunk from "redux-thunk";
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    subject: subjectSlice.reducer,
    studentExam: studentExamSlice.reducer,
  },
  middleware: [thunk],
});

export default store;
