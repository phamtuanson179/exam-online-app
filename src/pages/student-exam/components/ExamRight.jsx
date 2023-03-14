import { Card, Checkbox, Input, Radio, Space } from "antd";
import { ClearOutlined } from "@ant-design/icons";
import { QUESTION_TYPE } from "constants/types";
import { useDispatch, useSelector } from "react-redux";
import { infoCurrentStudentExamSelector } from "redux/selectors";
import { onChangeAnswer } from "../redux/studentExamSlice";
import ExamResult from "./ExamResult";

const ExamRight = () => {
  const infoExam = useSelector(infoCurrentStudentExamSelector);

  const dispatch = useDispatch();

  const renderQuestion = () => {
    const curQuestion = infoExam.curQuestion;
    if (curQuestion.type === QUESTION_TYPE.ONE.code) {
      return (
        <Radio.Group
          value={infoExam.listUserAnswers[infoExam.curQuestionIndex]?.[0]}
        >
          <Space
            direction='vertical'
            onChange={(event) => onChangeUserAnswer([event.target.value])}
          >
            <Radio value={curQuestion.listAnswers[0]}>
              {curQuestion.listAnswers[0]}
            </Radio>
            <Radio value={curQuestion.listAnswers[1]}>
              {curQuestion.listAnswers[1]}
            </Radio>
            <Radio value={curQuestion.listAnswers[2]}>
              {curQuestion.listAnswers[2]}
            </Radio>
            <Radio value={curQuestion.listAnswers[3]}>
              {curQuestion.listAnswers[3]}
            </Radio>
          </Space>
        </Radio.Group>
      );
    } else if (curQuestion.type === QUESTION_TYPE.MANY.code) {
      const listAnswers = [
        {
          label: curQuestion.listAnswers[0],
          value: curQuestion.listAnswers[0],
        },
        {
          label: curQuestion.listAnswers[1],
          value: curQuestion.listAnswers[1],
        },
        {
          label: curQuestion.listAnswers[2],
          value: curQuestion.listAnswers[2],
        },
        {
          label: curQuestion.listAnswers[3],
          value: curQuestion.listAnswers[3],
        },
      ];
      return (
        <Checkbox.Group
          options={listAnswers}
          onChange={(value) => onChangeUserAnswer(value)}
          className='d-flex flex-column justify-content-center align-items-start gap-2'
          value={infoExam.listUserAnswers[infoExam.curQuestionIndex]}
        />
      );
    } else if (curQuestion.type == QUESTION_TYPE.FILL.code) {
      return (
        <div className='d-flex gap-3'>
          <label className='text-nowrap'>Câu trả lời:</label>
          <Input
            onChange={(event) => onChangeUserAnswer([event.target.value])}
            value={infoExam.listUserAnswers[infoExam.curQuestionIndex]?.[0]}
          />
        </div>
      );
    } else {
      return (
        <Radio.Group
          value={infoExam.listUserAnswers[infoExam.curQuestionIndex]?.[0]}
        >
          <Space
            direction='vertical'
            onChange={(event) => onChangeUserAnswer([event.target.value])}
          >
            <Radio value={curQuestion?.listAnswers?.[0]}>
              {curQuestion?.listAnswers?.[0]}
            </Radio>
            <Radio value={curQuestion?.listAnswers?.[1]}>
              {curQuestion?.listAnswers?.[1]}
            </Radio>
          </Space>
        </Radio.Group>
      );
    }
  };

  const onClearAnswer = () => {
    dispatch(onChangeAnswer([]));
  };

  const onChangeUserAnswer = (value) => {
    dispatch(onChangeAnswer(value));
  };

  return (
    <>
      <Card title='Chi tiết câu hỏi' extra={<ExamResult />}>
        {infoExam.curQuestion ? (
          <>
            <Card
              type='inner'
              title={infoExam.curQuestion.content}
              headStyle={{whiteSpace:'normal', textOverflow:'inherit'}}
              extra={
                <button
                  className='btn text-danger'
                  onClick={onClearAnswer}
                >
                  <ClearOutlined />
                </button>
              }
            >
              {infoExam.curQuestion ? renderQuestion() : ""}
            </Card>
          </>
        ) : (
          ""
        )}
      </Card>
    </>
  );
};
export default ExamRight;
