import reportAPI from "apis/reportAPI";
import { useEffect, useState } from "react";
import { Card } from "antd";
import { convertSecondToTime } from "utils/time";

const Rating = ({ classroomId, examId }) => {
  const [listResults, setListResulst] = useState();

  useEffect(() => {
    if (classroomId && examId) getRating();
  }, [classroomId, examId]);

  const getRating = async () => {
    await reportAPI
      .getRating({ classroomId: classroomId, examId: examId })
      .then((res) => {
        setListResulst(res?.data);
      });
  };

  return (
    <Card
      bordered={false}
      className='h-100 pb-5'
      bodyStyle={{ height: "100%" }}
    >
      <div className='h-100'>
        <span>Xếp hạng bài thi</span>
        <div className='row align-items-center g-2'>
          <div className='col-6 text-center'>
            <div className='font-bold fs-1'>1</div>
          </div>
          <div className='col-6'>
            <div className=''>
              Họ tên:{" "}
              <b>
                {listResults?.[0] ? listResults?.[0]?.user?.fullname : "---"}
              </b>
            </div>
            <div>
              Số câu trả lời đúng:{" "}
              <b>
                {listResults?.[0]?.numberOfCorrectAnswer
                  ? listResults?.[0]?.numberOfCorrectAnswer
                  : "---"}
              </b>{" "}
            </div>
            <div>
              Thời gian làm bài:{" "}
              <b>
                {convertSecondToTime(listResults?.[0]?.time)}{" "}
                phút
              </b>
            </div>
          </div>

          <div className='col-6 text-center'>
            <div className='font-bold fs-1'>2</div>
          </div>
          <div className='col-6 '>
            {" "}
            <div className=''>
              Họ tên:{" "}
              <b>
                {listResults?.[1] ? listResults?.[1]?.user?.fullname : "---"}
              </b>
            </div>
            <div>
              Số câu trả lời đúng:{" "}
              <b>
                {listResults?.[1]?.numberOfCorrectAnswer
                  ? listResults?.[1]?.numberOfCorrectAnswer
                  : "---"}
              </b>{" "}
            </div>
            <div>
              Thời gian làm bài:{" "}
              <b>
                {convertSecondToTime(listResults?.[1]?.time)}{" "}
                phút
              </b>
            </div>
          </div>

          <div className='col-6 text-center'>
            <div className='font-bold fs-1'>3</div>
          </div>
          <div className='col-6'>
            <div className=''>
              Họ tên:{" "}
              <b>
                {listResults?.[2] ? listResults?.[2]?.user?.fullname : "---"}
              </b>
            </div>
            <div>
              Số câu trả lời đúng:{" "}
              <b>
                {listResults?.[2]?.numberOfCorrectAnswer
                  ? listResults?.[2]?.numberOfCorrectAnswer
                  : "---"}
              </b>{" "}
            </div>
            <div>
              Thời gian làm bài:{" "}
              <b>
                {convertSecondToTime(listResults?.[2]?.time)}{" "}
                phút
              </b>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Rating;
