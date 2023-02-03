import { Card, Select, Tooltip } from "antd";
import classroomAPI from "apis/classroomAPI";
import examAPI from "apis/examAPI";
import { useEffect, useState } from "react";
import NoPassAmount from "./component/noPassAmount";
import NoTestAmount from "./component/noTestAmount";
import PassedAmount from "./component/passedAmount";
import SpectrumPoint from "./component/spectrumPoint";
import TestedAmount from "./component/testedAmount";
import DetailQuestion from "./component/detailQuestion";
import Rating from "./component/rating";

const Dashboard = () => {
  const [listExams, setListExams] = useState([]);
  const [listClassrooms, setListClassrooms] = useState([]);
  const [curExamId, setCurExamId] = useState();
  const [curClassroomId, setcurClassroomId] = useState();

  useEffect(() => {
    // getAllExam();
    getClassroom()
  }, []);

  useEffect(() => {
    if(curClassroomId){
      getExamByClassroomId()
    }
  }, [curClassroomId]);

  // const getClassByExamId = async () => {
  //   const params = {
  //     examId: curExamId
  //   }
  //   await classroomAPI.getClassByExamId(params).then((res) => {
  //     if (res?.data?.length > 0) {
  //       setListClassrooms(res?.data);
  //       setcurClassroomId(res?.data[0]?._id);
  //     }
  //   });
  // };

  const getExamByClassroomId = async ()=>{
    const params = {
      classroomId: curClassroomId
    }

    await examAPI.getByClassroomId(params).then((res) => {
      if (res?.data?.length > 0) {
        setListExams(res?.data);
        setCurExamId(res?.data[0]?._id);
      }
    });
  }

  const getClassroom =  async ()=>{
    await classroomAPI.get().then((res)=>{
      if(res?.data?.length > 0){
        setListClassrooms(res?.data)
        setcurClassroomId(res?.data[0]?._id)
      }
    })
  }

  // const getAllExam = async () => {
  //   await examAPI.get().then((res) => {
  //     if (res?.data?.length > 0) {
  //       setListExams(res?.data);
  //       setCurExamId(res?.data[0]?._id);
  //     }
  //   });
  // };

  const onChangeExam = (value) => {
    setCurExamId(value);
  };

  const onChangeClassroom = (value) => {
    setcurClassroomId(value);
  };

  return (
    <>
      <div className='layout-content row g-3'>
        <div className='col-12'>
          <Card>
            <div className='row g-3'>
              <div className='col-8'>
                <div>{}</div>
              </div>
              <div className='col-4'>
                <div className='row'>
                  <div className='col-6'>
                    <div className='mb-2'>Đề thi:</div>
                    <Tooltip title='Chọn đề thi'>
                      <Select
                        className='w-100'
                        value={curExamId}
                        onChange={onChangeExam}
                        options={listExams?.map((exam) => ({
                          value: exam?._id,
                          label: exam?.name,
                        }))}
                      />
                    </Tooltip>
                  </div>
                  <div className='col-6'>
                    <div className='mb-2'>Lớp học:</div>
                    <Tooltip title='Chọn lớp học'>
                      <Select
                        className='w-100'
                        value={curClassroomId}
                        onChange={onChangeClassroom}
                        disabled={!curExamId}
                        options={listClassrooms?.map((classroom) => ({
                          value: classroom?._id,
                          label: classroom?.name,
                        }))}
                      />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className='col-3'>
          <TestedAmount classroomId={curClassroomId} examId={curExamId}/>
        </div>
        <div className='col-3'>
          <NoTestAmount classroomId={curClassroomId} examId={curExamId}/>
        </div>
        <div className='col-3'>
          <PassedAmount classroomId={curClassroomId} examId={curExamId}/>
        </div>
        <div className='col-3'>
          <NoPassAmount classroomId={curClassroomId} examId={curExamId}/>
        </div>
        <div className="col-8">
          <SpectrumPoint classroomId={curClassroomId} examId={curExamId}/>
        </div>
        <div className="col-4">
          <Rating classroomId={curClassroomId} examId={curExamId}/>
        </div>
        <div className="col-12">
          <DetailQuestion classroomId={curClassroomId} examId={curExamId}/>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
