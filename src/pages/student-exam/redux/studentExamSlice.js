import { createSlice } from "@reduxjs/toolkit";
import {
  getDetailQuestionOfExamThunk,
  getExamByIdThunk,
} from "./studentExamThunks";

export const studentExamSlice = createSlice({
  name: "studentExam",
  initialState: {
    listQuestions: [],
    listQuestionOfExams: [],
    curQuestion: {},
    curQuesitonIndex: {},
    listUserAnswers: [],
    curTime: {},
    error: false,
    loading: false,
    exam: {},
    isFinish: false,
  },
  reducers: {
    init: (state, action) => {
      state.listUserAnswers = Array(state.listQuestions.length).fill([]);
    },
    onChangeQuestion: (state, action) => {
      const questionIndex = action.payload;
      state.curQuestion = state.listQuestions[questionIndex];
      state.curQuesitonIndex = questionIndex;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    minusTimePerSecond: (state, action) => {
      state.time = state.time - 1;
    },
    setIsFinish: (state, action) => {
      state.isFinish = action.payload;
    },
  },
  extraReducers: {
    [getExamByIdThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [getExamByIdThunk.fulfilled]: (state, action) => {
      state.exam = action.payload.data;
      state.time = action.payload.data.time;
      state.loading = false;
    },
    [getExamByIdThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getDetailQuestionOfExamThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [getDetailQuestionOfExamThunk.fulfilled]: (state, action) => {
      state.listQuestions = action.payload;
      state.loading = false;
    },
    [getDetailQuestionOfExamThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // [getQuestionOfExam.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [getQuestionOfExam.fulfilled]: (state, action) => {
    //   state.listQuestionOfExams = action.payload.data;
    //   state.loading = false;
    // },
    // [getQuestionOfExam.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.error;
    // },
  },
});

export const {
  onChangeQuestion,
  startCountDown,
  minusTimePerSecond,
  setTime,
  setIsFinish,
  init,
} = studentExamSlice.actions;
