import { createAsyncThunk } from "@reduxjs/toolkit";
import examAPI from "apis/examAPI";
import questionAPI from "apis/questionAPI";
import { STUDENT_QUESTION_TYPE } from "constants/types";
import { init, setIsFinish, startCountDown } from "./studentExamSlice";
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
    let listQuestionIds = [];
    await examAPI.getQuestionOfExam(params).then((res) => {
      listQuestionIds = res.data;
    });

    const res = await Promise.all(
      listQuestionIds.map(async (questionId) => {
        const params = {
          id: questionId,
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
    thunkParms.dispatch(setIsFinish(false))
    return res;
  }
);
