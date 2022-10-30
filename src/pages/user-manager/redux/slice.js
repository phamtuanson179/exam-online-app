import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "../../../apis/userAPI";
export const fetchAllUser = createAsyncThunk(
  "userManager/fetchAllUser",
  async (params, thunkParams) => {
    const res = await userAPI.getAll();
    return res;
  }
);

export const userManagerSlice = createSlice({
  name: "userManager",
  initialState: {
    listUsers: [],
    error: {},
    loading: true,
  },
  reducers: {
    getAllUser: () => {},
  },
  extraReducers: {
    [fetchAllUser.pending]: (state) => {
      state.loading = true;
    },
    [fetchAllUser.fulfilled]: (state, action) => {
      console.log(action.payload.data);
      state.listUsers = action.payload.data;
    },
    [fetchAllUser.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.error;
    },
  },
});

export const { getAllUser } = userManagerSlice.actions;
export const listUserSelector = (state) => state?.userManager?.listUsers;
