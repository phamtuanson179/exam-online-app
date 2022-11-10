import { createSlice } from "@reduxjs/toolkit";
import {
  createSubjectThunk,
  deleteSubjectThunk,
  getAllSubjectThunk,
  updateSubjectThunk,
} from "./subjectThunks";

export const subjectSlice = createSlice({
  name: "user",
  initialState: {
    listSubjects: [],
    error: null,
    loading: true,
  },
  reducers: {},
  extraReducers: {
    [getAllSubjectThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllSubjectThunk.fulfilled]: (state, action) => {
      state.listSubjects = action.payload.data;
      state.loading = false;
    },
    [getAllSubjectThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [createSubjectThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [createSubjectThunk.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [createSubjectThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [updateSubjectThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [updateSubjectThunk.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateSubjectThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [deleteSubjectThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteSubjectThunk.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [deleteSubjectThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const {} = subjectSlice.actions;
