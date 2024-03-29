import { EditOutlined, ProfileOutlined } from "@ant-design/icons";
import { Button, Card, Select, Space, Table } from "antd";
import examAPI from "apis/examAPI";
import questionAPI from "apis/questionAPI";
import subjectAPI from "apis/subjectAPI";
import { useEffect, useState } from "react";
import ExamCreate from "../exam-create/examCreate";
import ExamDelete from "../exam-delete/examDelete";
import ExamQuestion from "../exam-question/examQuestion";
import ExamUpdate from "../exam-update/examUpdate";

const ExamView = () => {
  const [listSubjects, setListSubjects] = useState([]);
  const [listQuestions, setListQuestions] = useState([]);
  const [listExams, setListExams] = useState([]);
  const [subjectIdFilter, setSubjectIdFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshData, setIsRefreshData] = useState(false);
  const [modifiedElement, setModifiedElement] = useState();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

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
            setIsRefreshData={setIsRefreshData}
            isRefreshData={isRefreshData}
            listQuestions={listQuestions}
          />
          <Button
            type='warning'
            className='btn btn-warning'
            onClick={() => {
              setModifiedElement(record);
              setIsUpdateModalOpen(true);
            }}
          >
            <EditOutlined />
          </Button>

          <ExamDelete
            examElement={record}
            setIsRefreshData={setIsRefreshData}
            isRefreshData={isRefreshData}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getAllSubject();
    getAllQuestion();
  }, []);

  useEffect(() => {
    if (subjectIdFilter) getAllExams();
  }, [isRefreshData, subjectIdFilter, listQuestions]);

  const getAllSubject = async () => {
    await subjectAPI.get().then((res) => {
      if (res.data?.length > 0) {
        setListSubjects(res.data);
        setSubjectIdFilter(res.data?.[0]?._id);
      }
    });
  };

  const getAllQuestion = async () => {
    const getAllQuestions = await questionAPI.get();
    setListQuestions(getAllQuestions.data);
  };

  const getAllExams = async () => {
    setIsLoading(true);
    await examAPI.get().then((res) => {
      setIsLoading(false);
      setListExams(res.data);
    });
  };

  // const getQuestionOfExam = async (exam) => {
  //   const listQuestionOfExamsRes = await examAPI.getQuestionOfExam({
  //     examId: exam._id,
  //   });

  //   const listQuestions = await Promise.all(
  //     listQuestionOfExamsRes.data.map(async (questionOfExam) => {
  //       const questionRes = await questionAPI.get({
  //         id: questionOfExam.questionId,
  //       });
  //       return questionRes.data;
  //     })
  //   );

  //   exam.listQuestions = listQuestions ? listQuestions : [];
  // };

  const handleChangeSubjectFilter = (value) => {
    setSubjectIdFilter(value);
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
            value={subjectIdFilter}
            options={listSubjects?.map((subject) => ({
              label: subject.name,
              value: subject._id,
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

  return (
    <>
      <Card title='Danh sách đề thi' extra={renderTableExtra()}>
        {isLoading ? null : <Table columns={columns} dataSource={listExams} />}
        <ExamUpdate
          examElement={modifiedElement}
          listSubjects={listSubjects}
          setIsRefreshData={setIsRefreshData}
          isRefreshData={isRefreshData}
          listQuestions={listQuestions}
          isUpdateModalOpen={isUpdateModalOpen}
          setIsUpdateModalOpen={setIsUpdateModalOpen}
        />
      </Card>
    </>
  );
};
export default ExamView;
