import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { infoCurrentStudentExamSelector } from "redux/selectors";
import { setIsFinish } from "../redux/studentExamSlice";
import {
  getDetailQuestionOfExamThunk
} from "../redux/studentExamThunks";
import ExamLeft from "./ExamLeft";
import ExamRight from "./ExamRight";

const StudentExam = () => {
  // const exam = useSelector(listExamsSelector);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const infoExam = useSelector(infoCurrentStudentExamSelector);

  useEffect(() => {
    const exam = JSON.parse(localStorage.getItem("exam") || null);
    if (exam) {
      dispatch(getDetailQuestionOfExamThunk({ examId: exam._id }));
    }
  }, []);

  // useEffect(() => {
  //   const load = () => {
  //     setIsFinish(false);
  //   };

  //   window.addEventListener("load", load);

  //   return () => {
  //     window.removeEventListener("load", load);
  //   };
  // }, []);

  useEffect(() => {
    const beforeUnload = () => {
      const isReloadRaw = localStorage.getItem("isReload");
      setIsFinish(false);
      if (isReloadRaw) {
        const isReload = isReloadRaw.toString().split(",");
        const exam = JSON.parse(localStorage.getItem("exam") || null);
        if (exam?._id) {
          isReload?.includes(exam?._id) || isReload.push(exam?._id);
          localStorage.setItem("isReload", isReload);
        }
      } else {
        const exam = JSON.parse(localStorage.getItem("exam") || null);
        if (exam?._id) {
          localStorage.setItem("isReload", [exam?._id]);
        }
      }
    };

    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, []);

  useEffect(() => {
    const hashChange = () => {
      const isReloadRaw = localStorage.getItem("isReload");
      setIsFinish(false);
      if (isReloadRaw) {
        const isReload = isReloadRaw.toString().split(",");
        const exam = JSON.parse(localStorage.getItem("exam") || null);
        if (exam?._id) {
          isReload?.includes(exam?._id) || isReload.push(exam?._id);
          localStorage.setItem("isReload", isReload);
        }
      } else {
        const exam = JSON.parse(localStorage.getItem("exam") || null);
        if (exam?._id) {
          localStorage.setItem("isReload", [exam?._id]);
        }
      }
    };

    window.addEventListener("popstate", hashChange);

    return () => {
      window.removeEventListener("popstate", hashChange);
    };
  }, []);

  useEffect(() => {
    // if (localStorage.getItem("isReload") == 1) {
    const isReloadRaw = localStorage.getItem("isReload");

    if (isReloadRaw) {
      const isReload = isReloadRaw.toString().split(",");
      const exam = JSON.parse(localStorage.getItem("exam") || null);
      if (exam?._id && isReload?.includes(exam?._id)) {
        const index = isReload?.findIndex((item) => item == exam?._id);
        isReload.splice(index, 1);
        localStorage.setItem("isReload", isReload);
        dispatch(setIsFinish(true));
      }
    }

    // }
  }, []);

  return (
    <>
      <div className='container mt-5'>
        <div className='row g-3'>
          <div className='col-12 col-md-4'>
            <ExamLeft></ExamLeft>
          </div>
          <div className='col-12 col-md-8'>
            <ExamRight></ExamRight>
          </div>
        </div>
      </div>
    </>
  );
};
export default StudentExam;
