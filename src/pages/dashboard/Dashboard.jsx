import { Card, Descriptions, Select, Tooltip } from "antd";
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
import moment from "moment";
import { convertSecondToTime } from "utils/time";

const Dashboard = () => {
  const [listExams, setListExams] = useState([]);
  const [listClassrooms, setListClassrooms] = useState([]);
  const [curExamId, setCurExamId] = useState();
  const [curExam, setCurExam] = useState();
  const [curClassroomId, setcurClassroomId] = useState();

  useEffect(() => {
    getClassroom();
  }, []);

  useEffect(() => {
    if (curClassroomId) {
      getExamByClassroomId();
    }
  }, [curClassroomId]);

  useEffect(() => {
    if (curExamId) {
      const curExam = listExams?.find((item) => item._id == curExamId);
      if (curExam) {
        setCurExam(curExam);
      }
    }
  }, [curExamId]);

  const getExamByClassroomId = async () => {
    const params = {
      classroomId: curClassroomId,
    };

    await examAPI.getByClassroomId(params).then((res) => {
      console.log(res);
      if (res?.data) {
        setListExams(res?.data);
        setCurExamId(res?.data[0]?._id);
      }
    });
  };

  const getClassroom = async () => {
    await classroomAPI.get().then((res) => {
      if (res?.data?.length > 0) {
        setListClassrooms(res?.data);
        setcurClassroomId(res?.data[0]?._id);
      }
    });
  };

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
          <div className='row g-3'>
            <div className='col-12 col-lg-8'>
              <Card className='h-100' title={curExam?.name}>
                {/* <div className='fs-5 fw-bold mb-2'>{curExam?.name}</div>
                <div className='row'>
                  <div className='col-6'>Số lượng câu hỏi: </div>
                  <div className='col-6 fw-bold'>{curExam?.amountQuestion}</div>
                  <div className='col-6'>Số lượng câu hỏi: </div>
                  <div className='col-6 fw-bold'>{curExam?.amountQuestion}</div>
                </div> */}
                <Descriptions bordered column={{ xs: 24, lg: 12 }}>
                  <Descriptions.Item label='Thời gian thi' span={6}>
                    {convertSecondToTime(curExam?.time)} phút
                  </Descriptions.Item>
                  <Descriptions.Item label='Danh sách câu hỏi' span={6}>
                    {curExam?.isRandomInAll ?'Ngẫu nhiên trong ngân hàng đề thi':'Các câu hỏi cố định'}
                  </Descriptions.Item>
                  <Descriptions.Item label='Số câu hỏi' span={6}>
                    {curExam?.amountQuestion}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label='Số câu trả lời đúng tối thiểu'
                    span={6}
                  >
                    {curExam?.minCorrectAnswerToPass}
                  </Descriptions.Item>
                  <Descriptions.Item label='Thời gian mở' span={6}>
                    {moment
                      .unix(curExam?.openTime / 1000)
                      .format("hh:mm:ss DD/MM/YYYY")}
                  </Descriptions.Item>
                  <Descriptions.Item label='Thời gian đóng' span={6}>
                    {moment
                      .unix(curExam?.closeTime / 1000)
                      .format("hh:mm:ss DD/MM/YYYY")}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </div>
            <div className='col-12 col-lg-4'>
              <Card className="h-100">
                <div className='row'>
                  <div className='col-12'>
                    <div className='mb-2'>Lớp học:</div>
                    <Tooltip title='Chọn lớp học'>
                      <Select
                        className='w-100'
                        value={curClassroomId}
                        onChange={onChangeClassroom}
                        options={listClassrooms?.map((classroom) => ({
                          value: classroom?._id,
                          label: classroom?.name,
                        }))}
                      />
                    </Tooltip>
                  </div>
                  <div className='col-12'>
                    <div className='mb-2'>Đề thi:</div>
                    <Tooltip title='Chọn đề thi'>
                      <Select
                        className='w-100'
                        value={curExamId}
                        onChange={onChangeExam}
                        disabled={!curExamId}
                        options={listExams?.map((exam) => ({
                          value: exam?._id,
                          label: exam?.name,
                        }))}
                      />
                    </Tooltip>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div className='col-12 col-sm-6 col-md-3 h-100'>
          <TestedAmount classroomId={curClassroomId} examId={curExamId} />
        </div>
        <div className='col-12 col-sm-6 col-md-3 h-100'>
          <NoTestAmount classroomId={curClassroomId} examId={curExamId} />
        </div>
        <div className='col-12 col-sm-6 col-md-3 h-100'>
          <PassedAmount classroomId={curClassroomId} examId={curExamId} />
        </div>
        <div className='col-12 col-sm-6 col-md-3 h-100'>
          <NoPassAmount classroomId={curClassroomId} examId={curExamId} />
        </div>
        <div className='col-12 col-md-8'>
          <SpectrumPoint classroomId={curClassroomId} examId={curExamId} />
        </div>
        <div className='col-12 col-md-4'>
          <Rating classroomId={curClassroomId} examId={curExamId} />
        </div>
        <div className='col-12'>
          <DetailQuestion classroomId={curClassroomId} examId={curExamId} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
