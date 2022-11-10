import { createAsyncThunk } from "@reduxjs/toolkit";
import userAPI from "../../../apis/userAPI";
import { pushUserToListUsers, updateUserThunkToListUsers } from "./userSlice";

export const getAllUserThunk = createAsyncThunk(
  "user/getAllUserThunk",
  async (params, thunkParams) => {
    const res = await userAPI.getAll();
    return res;
  }
);

export const createUserThunk = createAsyncThunk(
  "user/createUserThunk",
  async (body, thunkParams) => {
    const res = await userAPI.create(body);
    thunkParams.dispatch(getAllUserThunk());
    return res;
  }
);

export const updateUserThunk = createAsyncThunk(
  "user/updateUserThunk",
  async ({ params, body }, thunkParams) => {
    const res = await userAPI.update(params, body);
    thunkParams.dispatch(getAllUserThunk());
    return res;
  }
);

export const deleteUserThunk = createAsyncThunk(
  "user/deleteUserThunk",
  async (params, thunkParams) => {
    const res = await userAPI.delete(params);
    thunkParams.dispatch(getAllUserThunk());
    return res;
  }
);
