import { createSlice } from "@reduxjs/toolkit";
import { createUser, deleteUser, getAllUser, updateUser } from "./userThunks";

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
    // updateUserToListUsers: (state, action) => {
    //   const updatedUser = action.payload;
    //   const indexElement = state.listUsers.findIndex(
    //     (user) => user.id == updateUser.id
    //   );
    //   if (indexElement) {
    //     state.listUsers[indexElement] = updatedUser;
    //   }
    // },
  },
  extraReducers: {
    [getAllUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllUser.fulfilled]: (state, action) => {
      state.listUsers = action.payload.data;
      state.loading = false;
    },
    [getAllUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [createUser.pending]: (state, action) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [updateUser.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [deleteUser.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { pushUserToListUsers, updateUserToListUsers } = userSlice.actions;
