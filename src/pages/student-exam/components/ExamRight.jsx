import { Card, Checkbox, Descriptions, Input, Radio, Space } from "antd";
import { QUESTION_TYPE } from "constants/types";
import { useDispatch, useSelector } from "react-redux";
import { infoCurrentStudentExamSelector } from "redux/selectors";

const ExamRight = () => {
  const infoExam = useSelector(infoCurrentStudentExamSelector);
  const dispatch = useDispatch();
  const startExam = () => {};

  const renderExtra = () => {
    return (
      <>
        <button className='btn btn-primary text-light'>Nộp bài</button>
      </>
    );
  };

  const renderQuestion = () => {
    if (infoExam.curQuestion.type == QUESTION_TYPE.ONE.code) {
      return (
        <Radio.Group>
          <Space direction='vertical' onChange={onChangeUserAnswer}>
            <Radio value={infoExam.curQuestion.listAnswers[0]}>
              {infoExam.curQuestion.listAnswers[0]}
            </Radio>
            <Radio value={infoExam.curQuestion.listAnswers[1]}>
              {infoExam.curQuestion.listAnswers[1]}
            </Radio>
            <Radio value={infoExam.curQuestion.listAnswers[2]}>
              {infoExam.curQuestion.listAnswers[2]}
            </Radio>
            <Radio value={infoExam.curQuestion.listAnswers[3]}>
              {infoExam.curQuestion.listAnswers[3]}
            </Radio>
          </Space>
        </Radio.Group>
      );
    } else if (infoExam.curQuestion.type == QUESTION_TYPE.MANY.code) {
      return (
        <>
          <Checkbox>Checkbox</Checkbox>
          <Checkbox>Checkbox</Checkbox>
          <Checkbox>Checkbox</Checkbox>
          <Checkbox>Checkbox</Checkbox>
        </>
      );
    }
  };

  const onChangeUserAnswer = (value) => {
    console.log({ value });
  };

  return (
    <>
      <Card title='Chi tiết câu hỏi' extra={renderExtra()}>
        {infoExam.curQuestion ? (
          <>
            <Descriptions bordered column={12} layout='vertical'>
              <Descriptions.Item label={infoExam.curQuestion.content} span={6}>
                {/* {currentExam?.name} */}
                {infoExam.curQuestion ? renderQuestion() : ""}
              </Descriptions.Item>
            </Descriptions>
          </>
        ) : (
          ""
        )}
      </Card>
    </>
  );
};
export default ExamRight;
