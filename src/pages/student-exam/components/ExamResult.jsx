import { Button, Modal } from "antd";
import { useDispatch, useSelector, } from "react-redux";
import { infoCurrentStudentExamSelector } from "redux/selectors";
import { setIsFinish } from "../redux/studentExamSlice";
import  React,{useState} from 'react'
import { createResultThunk } from "../redux/studentExamThunks";
import { useHistory } from "react-router-dom";


const ExamResult = () => {

  const infoExam = useSelector(infoCurrentStudentExamSelector);
  const dispatch = useDispatch()
  const history = useHistory()
  
  const showModal = () => {
    dispatch(setIsFinish(true))
  };

  const handleOk =async () => {
   await dispatch(createResultThunk(infoExam.result)).then(()=>history.push("list-exams"))
  };

  const handleCancel = () => {
    dispatch(setIsFinish(false))
  };

  return (
    <>
      <Button className='btn btn-primary text-light'  onClick={showModal}>Nộp bài</Button>
      <Modal
        title='Kết quả thi'
        visible={infoExam.isFinish}
        closable={false}
        footer={[
          <Button onClick={handleOk} className="btn btn-primary">
            Xác nhận
          </Button>
        ]}
      >
        <p>Số câu trả lời được: <span>{infoExam?.result?.numberOfCorrectAnswer}/{infoExam?.listQuestions.length}</span></p>
        {infoExam?.result?.isPass ?<p>Bạn đã đạt bài kiểm tra này!</p>:<p>Rất tiếc, bạn chưa đạt bài kiểm tra này!</p>}
      </Modal>
    </>
  );
};

export default ExamResult;
