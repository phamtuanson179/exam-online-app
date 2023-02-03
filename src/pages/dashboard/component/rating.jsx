import reportAPI from "apis/reportAPI";
import { useEffect, useState } from "react";
import { Card } from "antd";

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
    <Card bordered={false} className='h-100' bodyStyle={{ height: "100%" }}>
      <div className='h-100'>
        <span>Xếp hạng bài thi</span>
        <div className='d-flex flex-column text-center h-100 align-items-center justify-content-evenly'>
          <div>
            <div className='font-bold fs-1'>1</div>
            <div>
              {listResults?.[0] ? listResults?.[0]?.user?.fullname : "---"}
            </div>
          </div>
          <div>
            <div className='font-bold fs-3 mt-5'>2</div>
            <div>
              {listResults?.[1] ? listResults?.[1]?.user?.fullname : "---"}
            </div>
          </div>
          <div>
            <div className='font-bold fs-3 mt-5'>3</div>
            <div>
              {listResults?.[2] ? listResults?.[2]?.user?.fullname : "---"}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Rating;
