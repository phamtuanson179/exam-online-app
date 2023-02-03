import reportAPI from "apis/reportAPI";
import { QUESTION_TYPE } from "constants/types";
import { useEffect, useState } from "react";
import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Card } from "antd";

const dynamicColors = () => {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
};

const createListColors = () => {
  return Array.from(Array(100).keys()).map(() => {
    return dynamicColors();
  });
};

ChartJS.register(ArcElement, Tooltip, Legend);

const DetailQuestion = ({ classroomId, examId }) => {
  const [detailQuestionData, setDetailQuestionData] = useState();
  const [listColors, setListColors] = useState();
  useEffect(() => {
    if (classroomId && examId) getTestedAmount();
  }, [classroomId, examId]);

  useEffect(() => {
    setListColors(createListColors());
  }, []);

  const getTestedAmount = async () => {
    await reportAPI
      .getDetailQuestion({ classroomId: classroomId, examId: examId })
      .then((res) => {
        console.log("data", res.data);
        setDetailQuestionData(res.data);
      });
  };

  const renderQuestionSection = (question) => {
    const data = {
      labels: question?.detail.map((item) => item.value),
      datasets: [
        {
          label: "Số người trả lời",
          data: question?.detail.map((item) => item.amount),
          backgroundColor: listColors,
          // borderColor: [
          //   "rgba(255, 99, 132, 1)",
          //   "rgba(54, 162, 235, 1)",
          //   "rgba(255, 206, 86, 1)",
          //   "rgba(75, 192, 192, 1)",
          // ],
          borderWidth: 1,
        },
      ],
    };
    console.log({ data });
    return (
      <>
        <Pie data={data} />
      </>
    );
  };
  return (
    <>
      <Card title='Thống kê chi tiết câu hỏi'>
        <div className='row g-3'>
          {detailQuestionData &&
            detailQuestionData?.map((question) => (
              <div className='col-3'>
                <Card
                  size='small'
                  className='h-100'
                  bodyStyle={{ height: "100%" }}
                >
                  <div className='d-flex flex-column justify-content-between h-100'>
                    <div> {question.question.content}</div>
                    <div>{renderQuestionSection(question)}</div>
                  </div>
                </Card>
              </div>
            ))}
        </div>
      </Card>
    </>
  );
};

export default DetailQuestion;
