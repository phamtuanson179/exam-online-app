import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../pages/user/userSlice";
import thunk from "redux-thunk";
const store = configureStore({
  reducer: {
    userManager: userSlice.reducer,
  },
  middleware: [thunk],
});

export default store;
