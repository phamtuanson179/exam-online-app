import ListExamsLeft from "./ListExamsLeft";
import ListExamsRight from "./ListExamsRight";
import { useEffect, useState } from "react";
import examAPI from "apis/examAPI";
import resultAPI from "apis/resultAPI";

const ListExams = () => {
  const [listExams, setListExams] = useState();
  const [currentExam, setCurrentExam] = useState();
  const [historyOfCurrentExam, setHistoryOfCurrentExam] = useState();

  useEffect(() => {
    getAllExamsOfCurrentUser();
  }, []);

  useEffect(() => {
    getResultByExamId();
  }, [currentExam]);

  const getResultByExamId = async () => {
    if (currentExam?._id)
      await resultAPI.getByExamId({ examId: currentExam?._id }).then(res=>{
        setHistoryOfCurrentExam(res?.data?.[0])
      });
  };

  const getAllExamsOfCurrentUser = async () => {
    await examAPI.getExamOfCurrentUser().then((res) => {
      const listExams = res.data?.map((item, index) => ({
        ...item,
        index: index,
      }));
      setListExams(listExams);
      setCurrentExam(listExams?.[0]);
    });
  };

  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-4'>
            <ListExamsLeft
              listExams={listExams}
              currentExam={currentExam}
              setCurrentExam={setCurrentExam}
            ></ListExamsLeft>
          </div>
          <div className='col-8'>
            <ListExamsRight currentExam={currentExam} historyOfCurrentExam={historyOfCurrentExam}></ListExamsRight>
          </div>
        </div>
      </div>
    </>
  );
};
export default ListExams;
