import reportAPI from "apis/reportAPI";
import { useEffect, useState } from "react";

import { Card, Table } from "antd";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";

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
          // backgroundColor: listColors,
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(255, 99, 13, 1)",
            "rgba(54, 162, 23, 1)",
            "rgba(255, 26, 8, 1)",
            "rgba(75, 19, 192, 1)",
            "rgba(255, 9, 132, 1)",
            "rgba(5, 16d, 235, 1)",
            "rgba(23, 220, 86, 1)",
            "rgba(75, 190, 199, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    return (
      <>
        <Pie data={data} />
      </>
    );
  };

  const isCorrectAnswer = (answer, listCorrectAnswers) => {
    return listCorrectAnswers?.find((correctAnswer) => correctAnswer == answer);
  };

  const renderDetailQuestion = (record) => {
    const columns = [
      {
        title: "Câu trả lời",
        dataIndex: "value",
        render: (answer) => (
          <div
            style={{
              maxWidth: "5rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={answer}
          >
            {answer}
          </div>
        ),
      },
      {
        title: "Trạng thái",
        render: (answer) =>
          isCorrectAnswer(answer?.value, record?.question?.listCorrectAnswers) ? (
            <CheckCircleOutlined className='text-success' />
          ) : (
            <InfoCircleOutlined className='text-danger' />
          ),
      },
      {
        title: "Số lượng người trả lời",
        render: (answer) => (
          <>
            {record?.detail?.find((item) => item.value == answer?.value)?.amount || 0}
          </>
        ),
      },
    ];
    return (
      <>
        <Table
          dataSource={record?.detail}
          columns={columns}
          pagination={false}
          style={{ margin: "1rem" }}
        ></Table>
      </>
    );
  };
  return (
    <>
      <Card title='Thống kê chi tiết câu hỏi'>
        <div className='row g-3'>
          {detailQuestionData &&
            detailQuestionData?.map((question) => (
              <div className='col-12'>
                <Card
                  size='small'
                  className='h-100'
                  bodyStyle={{ height: "100%" }}
                >
                  <div className='d-flex justify-content-between h-100 align-items-center align-items-md-start gap-3 flex-column flex-md-row'>
                    <div>{renderQuestionSection(question)}</div>
                    <div className='text-start flex-grow-1 w-100'>
                      <div>
                        Câu hỏi: <b>{question.question.content}</b>
                      </div>
                      <div>{renderDetailQuestion(question)}</div>
                    </div>
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
