import { configureStore } from "@reduxjs/toolkit";
import { userManagerSlice } from "../pages/user-manager/redux/slice";

const store = configureStore({
  reducer: {
    userManager: userManagerSlice.reducer,
  },
});

export default store;
