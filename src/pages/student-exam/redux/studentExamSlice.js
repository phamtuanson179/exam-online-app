import { createSlice, current } from "@reduxjs/toolkit";
import {
  createResultThunk,
  getDetailQuestionOfExamThunk,
  getExamByIdThunk,
} from "./studentExamThunks";
import { isTwoStringArraySimilar } from "utils/common";
import { useHistory } from "react-router-dom";

export const studentExamSlice = createSlice({
  name: "studentExam",
  initialState: {
    listQuestions: [],
    listQuestionOfExams: [],
    curQuestion: {},
    curQuestionIndex: 0,
    listUserAnswers: [],
    curTime: {},
    error: false,
    loading: false,
    exam: {},
    isFinish: false,
    result: {},
  },
  reducers: {
    init: (state, action) => {
      state.listUserAnswers = Array(state.listQuestions.length).fill([]);
      state.curQuestion = state.listQuestions?.[0];
      state.curQuestionIndex = 0;
    },
    onChangeQuestion: (state, action) => {
      const questionIndex = action.payload;
      state.curQuestion = state.listQuestions[questionIndex];
      state.curQuestionIndex = questionIndex;
    },
    onChangeAnswer: (state, action) => {
      state.listUserAnswers[state.curQuestionIndex] = action.payload;
    },
    setCurTime: (state, action) => {
      state.curTime = action.payload;
    },
    setExam: (state, action) => {
      state.exam = action.exam;
    },
    setIsFinish: (state, action) => {
      state.isFinish = action.payload;
      console.log(state);

      if (state.isFinish) {
        const exam = JSON.parse(localStorage.getItem("exam"));

        state.result = {
          examId: exam._id,
          time: exam.time - state.curTime,
          listUserAnswers: state.listQuestions.map((question, index) => ({
            id: question._id,
            userAnswer: state.listUserAnswers?.[index],
            status: isTwoStringArraySimilar(
              state.listUserAnswers?.[index],
              question?.listCorrectAnswers
            ),
          })),
        };

        state.result.numberOfCorrectAnswer =
          state.result.listUserAnswers.filter(
            (item) => item.status == true
          )?.length;

        state.result.isPass = state.result.numberOfCorrectAnswer >= exam.minCorrectAnswerToPass ? true : false
        console.log(current(state))
      }
    },
    processResult: (state, action) => {
      console.log(state.exam.id);
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
      state.curQuestion = state.listQuestions?.[0]
      state.curQuestionIndex = 0
      state.loading = false;
    },
    [getDetailQuestionOfExamThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [createResultThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [createResultThunk.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [createResultThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const {
  onChangeQuestion,
  startCountDown,
  setCurTime,
  setIsFinish,
  init,
  onChangeAnswer,
  setExam,
} = studentExamSlice.actions;
