import { createAsyncThunk } from "@reduxjs/toolkit";
import subjectAPI from "apis/subjectAPI";

export const getAllSubjectThunk = createAsyncThunk(
  "user/getAllSubjectThunk",
  async (params, thunkParams) => {
    const res = await subjectAPI.getAll();
    return res;
  }
);

export const createSubjectThunk = createAsyncThunk(
  "user/createSubjectThunk",
  async (body, thunkParams) => {
    const res = await subjectAPI.create(body);
    thunkParams.dispatch(getAllSubjectThunk());
    return res;
  }
);

export const updateSubjectThunk = createAsyncThunk(
  "user/updateSubjectThunk",
  async ({ params, body }, thunkParams) => {
    const res = await subjectAPI.update(params, body);
    thunkParams.dispatch(getAllSubjectThunk());
    return res;
  }
);

export const deleteSubjectThunk = createAsyncThunk(
  "user/deleteSubjectThunk",
  async (params, thunkParams) => {
    const res = await subjectAPI.delete(params);
    thunkParams.dispatch(getAllSubjectThunk());
    return res;
  }
);
