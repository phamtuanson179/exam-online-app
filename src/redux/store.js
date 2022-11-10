import { configureStore } from "@reduxjs/toolkit";
import { questionSlice } from "pages/question/redux/questionSlice";
import { subjectSlice } from "pages/subject/redux/subjectSlice";
import { userSlice } from "pages/user/redux/userSlice";
import thunk from "redux-thunk";
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    subject: subjectSlice.reducer,
    question: questionSlice.reducer,
  },
  middleware: [thunk],
});

export default store;
