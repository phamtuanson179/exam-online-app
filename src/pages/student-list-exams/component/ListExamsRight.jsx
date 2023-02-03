import { Button, Card, Descriptions, Popconfirm } from "antd";
import moment from "moment";
import { useHistory } from "react-router-dom";

const ListExamsRight = ({ currentExam, historyOfCurrentExam }) => {
  const history = useHistory();
  const startExam = () => {
    localStorage.setItem("exam", JSON.stringify(currentExam));
    history.push("exam");
  };

  const isDisableStartExam = () => {
    const openTime = currentExam?.openTime;
    const closeTime = currentExam?.closeTime;
    const now = new Date().getTime();
    console.log(historyOfCurrentExam, openTime, closeTime, now);
    if (historyOfCurrentExam || openTime > now || now > closeTime) {
      return true;
    } else return false;
  };

  return (
    <>
      <Card title='Chi tiết bài thi' className='mb-4'>
        {currentExam ? (
          <>
            <Descriptions bordered column={12} className='mb-4'>
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
          </>
        ) : (
          ""
        )}
      </Card>

      {historyOfCurrentExam && (
        <Card title='Lịch sử thi'>
          <Descriptions bordered column={12}>
            <Descriptions.Item label='Thời gian nộp bài' span={6}>
              {moment(historyOfCurrentExam.createdAt).format(
                "HH:mm:ss DD/mm/yyyy"
              )}
            </Descriptions.Item>
            <Descriptions.Item label='Thời gian làm bài' span={6}>
              {historyOfCurrentExam?.time} giây
            </Descriptions.Item>
            <Descriptions.Item label='Số câu trả lời đúng' span={6}>
              {historyOfCurrentExam?.numberOfCorrectAnswer} /{" "}
              {currentExam.amountQuestion}
            </Descriptions.Item>
            <Descriptions.Item label='Trạng thái bài thi' span={6}>
              {historyOfCurrentExam?.isPass ? "Đạt" : "Không đạt"}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}

      <div className='mt-3 text-center'>
        <Popconfirm
          title={`Bạn sẽ có ${currentExam?.time} giây để hoàn thành bài thi!`}
          onConfirm={startExam}
          okText='Bắt đầu'
          cancelText='Hủy'
          disabled={isDisableStartExam()}
        >
          <Button type='primary' disabled={isDisableStartExam()}>
            Vào thi
          </Button>
        </Popconfirm>
      </div>
    </>
  );
};
export default ListExamsRight;
