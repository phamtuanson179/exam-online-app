import { Card, Select, Space, Table } from "antd";
import examAPI from "apis/examAPI";
import questionAPI from "apis/questionAPI";
import subjectAPI from "apis/subjectAPI";
import { QUESTION_TYPE } from "constants/types";
import { useEffect, useState } from "react";
import ExamCreate from "../exam-create/examCreate";
import ExamDelete from "../exam-delete/examDelete";
import ExamQuestion from "../exam-question/examQuestion";
import ExamUpdate from "../exam-update/examUpdate";

const ExamView = () => {
  const [listSubjects, setListSubjects] = useState([]);
  const [listQuestions, setListQuestions] = useState([]);
  const [listExams, setListExams] = useState([]);
  const [listConvertedExams, setListConvertedExams] = useState([]);
  const [subjectIdFilter, setQuestionIdFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshData, setIsRefreshData] = useState(false);

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số câu hỏi",
      dataIndex: "amountQuestion",
      key: "amountQuestion",
    },
    {
      title: "Thời gian làm bài",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "",
      key: "action",
      render: (record) => (
        <Space size='middle' key={record}>
          <ExamQuestion
            examElement={record}
            listSubjects={listSubjects}
            setIsRefreshData={setIsRefreshData}
            isRefreshData={isRefreshData}
            listQuestions={listQuestions}
          />
          <ExamUpdate
            examElement={record}
            listSubjects={listSubjects}
            setIsRefreshData={setIsRefreshData}
            isRefreshData={isRefreshData}
            listQuestions={listQuestions}
          />
          <ExamDelete
            examElement={record}
            setIsRefreshData={setIsRefreshData}
            isRefreshData={isRefreshData}
          />
        </Space>
      ),
    },
  ];

  const questionTableColumn = [
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Câu trả lời đúng",
      render: (record) => record.listCorrectAnswers.join(","),
      key: "listCorrectAnswers",
    },
    {
      title: "Loại câu hỏi",
      render: (record) => QUESTION_TYPE[record.type].meaning,
      key: "type",
    },
  ];

  useEffect(async () => {
    const getAllSubjects = await subjectAPI.getAll();
    setListSubjects(getAllSubjects.data);

    const getAllQuestions = await questionAPI.get();
    setListQuestions(getAllQuestions.data);
  }, []);

  useEffect(() => {
    getAllExams();
  }, [isRefreshData, subjectIdFilter]);

  useEffect(() => {
    if (listExams?.length > 0 && listQuestions?.length > 0) {
      const listConvertedExams = listExams?.map((originExam) => {
        const exam = { ...originExam };
        getQuestionOfExam(exam);
        console.log({ exam });
        return exam;
      });

      setListConvertedExams(listConvertedExams);
    }
  }, [listQuestions, listExams]);

  const getAllExams = async () => {
    setIsLoading(true);
    await examAPI.get().then((res) => {
      setIsLoading(false);
      setListExams(res.data);
    });
  };

  const getQuestionOfExam = async (exam) => {
    const listQuestionOfExamsRes = await examAPI.getQuestionOfExam({
      examId: exam._id,
    });

    const listQuestions = await Promise.all(
      listQuestionOfExamsRes.data.map(async (questionOfExam) => {
        const questionRes = await questionAPI.get({
          id: questionOfExam.questionId,
        });
        // console.log(questionRes?.data);
        return questionRes.data;
      })
    );

    exam.listQuestions = listQuestions ? listQuestions : [];
  };

  const handleChangeSubjectFilter = (value) => {
    setQuestionIdFilter(value);
  };

  const renderTableExtra = () => {
    return (
      <>
        <div
          className='d-flex justify-content-end align-items-center'
          style={{ columnGap: "0.5rem" }}
        >
          <Select
            placeholder='Chọn môn học'
            style={{ width: 180 }}
            onChange={handleChangeSubjectFilter}
            options={listSubjects?.map((question) => ({
              label: question.name,
              value: question._id,
            }))}
          />

          <ExamCreate
            listSubjects={listSubjects}
            setIsRefreshData={setIsRefreshData}
            isRefreshData={isRefreshData}
            listQuestions={listQuestions}
          />
        </div>
      </>
    );
  };

  const renderTableExpanded = (record) => {
    // console.log({ record });
    return (
      <>
        <Table
          dataSource={record.listQuestions}
          columns={questionTableColumn}
          pagination={false}
          style={{ margin: "1rem" }}
        ></Table>
      </>
    );
  };

  return (
    <>
      <Card title='Danh sách đề thi' extra={renderTableExtra()}>
        {isLoading ? null : (
          <Table
            columns={columns}
            dataSource={listConvertedExams}
            expandable={{
              expandedRowRender: (record) => renderTableExpanded(record),
              defaultExpandedRowKeys: ["0"],
            }}
          />
        )}
      </Card>
    </>
  );
};
export default ExamView;
