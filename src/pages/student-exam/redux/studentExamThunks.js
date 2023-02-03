import { createAsyncThunk } from "@reduxjs/toolkit";
import examAPI from "apis/examAPI";
import questionAPI from "apis/questionAPI";
import { STUDENT_QUESTION_TYPE } from "constants/types";
import { init, startCountDown } from "./studentExamSlice";
import resultAPI from "apis/resultAPI";
import { useHistory } from "react-router-dom";

export const getExamByIdThunk = createAsyncThunk(
  "studentExam/getExam",
  async (params, thunkParams) => {
    const res = await examAPI.getById(params);
    return res;
  }
);

export const getDetailQuestionOfExamThunk = createAsyncThunk(
  "studentExam/getDetailQuestionOfExam",
  async (params, thunkParams) => {
    let listQuestionOfExams = [];
    await examAPI.getQuestionOfExam(params).then((res) => {
      listQuestionOfExams = res.data;
    });

    const res = await Promise.all(
      listQuestionOfExams.map(async (questionOfExam) => {
        const params = {
          id: questionOfExam.questionId,
        };
        const res = await questionAPI.getById(params);
        return res.data;
      })
    );

    const listDetailQuestions = res?.map((question, index) => ({
      ...question,
    }));

    thunkParams.dispatch(init());
    return listDetailQuestions;
  }
);

export const createResultThunk = createAsyncThunk(
  "studentExam/createResult",
  async (body, thunkParms) => {
    const res = await resultAPI.create(body)
    return res;
  }
);
