import { Card, Descriptions, Popconfirm } from "antd";
import moment from "moment";
import { useHistory } from "react-router-dom";

const ListExamsRight = ({ currentExam }) => {
  const history = useHistory();
  const startExam = () => {
    localStorage.setItem("examId", currentExam._id);
    history.push("exam");
  };

  return (
    <>
      <Card title='Chi tiết bài thi'>
        {currentExam ? (
          <>
            <Descriptions bordered column={12}>
              <Descriptions.Item label='Tên môn học' span={6}>
                {currentExam?.name}
              </Descriptions.Item>
              <Descriptions.Item label='Thời gian thi' span={6}>
                {currentExam?.time} giây
              </Descriptions.Item>
              <Descriptions.Item label='Số câu hỏi' span={6}>
                {currentExam?.amountQuestion}
              </Descriptions.Item>
              <Descriptions.Item label='Số câu trả lời đúng tối thiểu' span={6}>
                {currentExam?.minCorrectAnswerToPass}
              </Descriptions.Item>
              <Descriptions.Item label='Thời gian mở' span={6}>
                {moment
                  .unix(currentExam?.openTime / 1000)
                  .format("hh:mm:ss DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label='Thời gian đóng' span={6}>
                {moment
                  .unix(currentExam?.closeTime / 1000)
                  .format("hh:mm:ss DD/MM/YYYY")}
              </Descriptions.Item>
            </Descriptions>
            <div className='mt-3 text-center'>
              <Popconfirm
                title={`Bạn sẽ có ${currentExam?.time} giây để hoàn thành bài thi!`}
                onConfirm={startExam}
                okText='Bắt đầu'
                cancelText='Hủy'
              >
                <button className='btn btn-primary'>Vào thi</button>
              </Popconfirm>
            </div>
          </>
        ) : (
          ""
        )}
      </Card>
    </>
  );
};
export default ListExamsRight;
