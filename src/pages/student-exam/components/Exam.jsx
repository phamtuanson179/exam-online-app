import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getDetailQuestionOfExamThunk,
  getExamByIdThunk,
} from "../redux/studentExamThunks";
import ExamLeft from "./ExamLeft";
import ExamRight from "./ExamRight";

const Exam = () => {
  // const exam = useSelector(listExamsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    const examId = localStorage.getItem("examId");
    if (examId) {
      dispatch(getExamByIdThunk({ id: examId }));
      dispatch(getDetailQuestionOfExamThunk({ examId: examId }));
    }
  }, []);

  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-4'>
            <ExamLeft></ExamLeft>
          </div>
          <div className='col-8'>
            <ExamRight></ExamRight>
          </div>
        </div>
      </div>
    </>
  );
};
export default Exam;
