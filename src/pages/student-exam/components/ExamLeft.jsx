import { Card } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { infoCurrentStudentExamSelector } from "redux/selectors";
import { convertSecondToTime } from "utils/time";
import { onChangeQuestion, setCurTime, setIsFinish } from "../redux/studentExamSlice";

const ExamLeft = () => {
  const infoExam = useSelector(infoCurrentStudentExamSelector);
  const dispatch = useDispatch();
  const [countDown, setCountdown] = useState();
  const [countDownString, setCountdownString] = useState();

  useEffect(() => {
    const exam = JSON.parse(localStorage.getItem("exam"))
    setCountdown(exam.time);
    dispatch(setCurTime(exam.time))
  }, []);

  useEffect(() => {
    if (!infoExam.isFinish) {
      if (countDown < 0) {
        dispatch(setIsFinish(true));
      } else {
        setTimeout(() => {
          if (countDown || countDown === 0)
            setCountdownString(convertSecondToTime(countDown));
          setCountdown(countDown - 1);
          dispatch(setCurTime(countDown - 1))
        }, 1000);
      }
    }
  }, [countDown]);



  const renderListExam = () => {
    return infoExam.listQuestions.map((exam, index) => {
      return (
        <div className='col-2'>
          <button
            className={`btn ${
              infoExam.curQuestionIndex === index ? "btn-warning text-light" : infoExam.listUserAnswers[index] && infoExam.listUserAnswers[index]?.length > 0 ? 'btn-primary text-light':''
            }`}
            onClick={() => onClickButton(index)}
          >
            {index + 1}
          </button>
        </div>
      );
    });
  };

  const onClickButton = (questionIndex) => {
    dispatch(onChangeQuestion(questionIndex));
  };

  const renderExtra = () => {
    return (
      <>
        <div className='fw-bold'>{countDownString}</div>
      </>
    );
  };

  return (
    <>
      <Card title='Danh sách câu hỏi' extra={renderExtra()}>
        <div className='row justify-content-between flex-wrap'>
          {infoExam ? renderListExam() : ""}
        </div>
      </Card>
    </>
  );
};
export default ExamLeft;
