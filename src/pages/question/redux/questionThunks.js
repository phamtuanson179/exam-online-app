import { createAsyncThunk } from "@reduxjs/toolkit";
import questionAPI from "../../../apis/questionAPI";

export const getAllQuestionThunk = createAsyncThunk(
  "user/getAllQuestionThunk",
  async (params, thunkParams) => {
    const res = await questionAPI.getAll();
    return res;
  }
);

export const createQuestionThunk = createAsyncThunk(
  "user/createQuestionThunk",
  async (body, thunkParams) => {
    const res = await questionAPI.create(body);
    thunkParams.dispatch(getAllQuestionThunk());
    return res;
  }
);

export const updateQuestionThunk = createAsyncThunk(
  "user/updateQuestionThunk",
  async ({ params, body }, thunkParams) => {
    const res = await questionAPI.update(params, body);
    thunkParams.dispatch(getAllQuestionThunk());
    return res;
  }
);

export const deleteQuestionThunk = createAsyncThunk(
  "user/deleteQuestionThunk",
  async (params, thunkParams) => {
    const res = await questionAPI.delete(params);
    thunkParams.dispatch(getAllQuestionThunk());
    return res;
  }
);
