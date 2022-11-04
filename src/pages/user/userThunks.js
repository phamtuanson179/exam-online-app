import { createAsyncThunk } from "@reduxjs/toolkit";
import userAPI from "../../apis/userAPI";
import { pushUserToListUsers, updateUserToListUsers } from "./userSlice";

export const getAllUser = createAsyncThunk(
  "user/getAllUser",
  async (params, thunkParams) => {
    const res = await userAPI.getAll();
    return res;
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (body, thunkParams) => {
    const res = await userAPI.create(body);
    thunkParams.dispatch(getAllUser());
    return res;
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ params, body }, thunkParams) => {
    const res = await userAPI.update(params, body);
    thunkParams.dispatch(getAllUser());
    return res;
  }
);

export const deleteUser = createAsyncThunk(
  "user/updateUser",
  async (params, thunkParams) => {
    const res = await userAPI.delete(params);
    thunkParams.dispatch(getAllUser());
    return res;
  }
);
