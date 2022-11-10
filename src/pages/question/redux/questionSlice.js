import { createSlice } from "@reduxjs/toolkit";
import {
  createQuestionThunk,
  deleteQuestionThunk,
  getAllQuestionThunk,
  updateQuestionThunk,
} from "./questionThunks";

export const questionSlice = createSlice({
  name: "question",
  initialState: {
    listQuestions: [],
    error: null,
    loading: true,
  },
  reducers: {},
  extraReducers: {
    [getAllQuestionThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllQuestionThunk.fulfilled]: (state, action) => {
      state.listQuestions = action.payload.data;
      state.loading = false;
    },
    [getAllQuestionThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [createQuestionThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [createQuestionThunk.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [createQuestionThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [updateQuestionThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [updateQuestionThunk.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateQuestionThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [deleteQuestionThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteQuestionThunk.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [deleteQuestionThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const {} = questionSlice.actions;
