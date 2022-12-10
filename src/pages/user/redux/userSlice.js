import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import {
  createUserThunk,
  deleteUserThunk,
  getAllUserThunk,
  updateUserThunk,
} from "./userThunks";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    listUsers: [],
    error: null,
    loading: true,
  },
  reducers: {},
  extraReducers: {
    [getAllUserThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllUserThunk.fulfilled]: (state, action) => {
      state.listUsers = action.payload.data;
      state.loading = false;
    },
    [getAllUserThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [createUserThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [createUserThunk.fulfilled]: (state, action) => {
      message.success("Thêm người dùng thành công!");
      state.loading = false;
    },
    [createUserThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [updateUserThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUserThunk.fulfilled]: (state, action) => {
      message.success("Cập nhật người dùng thành công!");
      state.loading = false;
    },
    [updateUserThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [deleteUserThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteUserThunk.fulfilled]: (state, action) => {
      message.success("Xóa người dùng thành công!");
      state.loading = false;
    },
    [deleteUserThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { pushUserToListUsers, updateUserThunkToListUsers } =
  userSlice.actions;
