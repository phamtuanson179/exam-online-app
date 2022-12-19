import ListExamsLeft from "./ListExamsLeft";
import ListExamsRight from "./ListExamsRight";
import { useEffect, useState } from "react";
import examAPI from "apis/examAPI";

const ListExams = () => {
  const [listExams, setListExams] = useState();
  const [currentExam, setCurrentExam] = useState();

  useEffect(() => {
    getAllExamsOfCurrentUser();
  }, []);

  const getAllExamsOfCurrentUser = async () => {
    await examAPI.getExamOfCurrentUser().then((res) => {
      console.log({ res });
      const listExams = res.data.map((item, index) => ({
        ...item,
        index: index,
      }));
      setListExams(listExams);
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
            <ListExamsRight currentExam={currentExam}></ListExamsRight>
          </div>
        </div>
      </div>
    </>
  );
};
export default ListExams;
