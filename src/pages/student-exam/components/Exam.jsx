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
    const exam = JSON.parse(localStorage.getItem("exam"));
    console.log({exam})
    if (exam) {
      dispatch(getDetailQuestionOfExamThunk({ examId: exam._id }));
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
