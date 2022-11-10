import { createSlice } from "@reduxjs/toolkit";
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
  reducers: {
    // pushUserToListUsers: (state, action) => {
    //   state.listUsers.push(action.payload);
    // },
    // updateUserThunkToListUsers: (state, action) => {
    //   const updatedUser = action.payload;
    //   const indexElement = state.listUsers.findIndex(
    //     (user) => user.id == updateUserThunk.id
    //   );
    //   if (indexElement) {
    //     state.listUsers[indexElement] = updatedUser;
    //   }
    // },
  },
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
