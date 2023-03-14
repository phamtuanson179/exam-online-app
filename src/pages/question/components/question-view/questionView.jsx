import {
  CheckCircleOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Select, Space, Table, Tooltip } from "antd";
import questionAPI from "apis/questionAPI";
import subjectAPI from "apis/subjectAPI";
import { QUESTION_TYPE } from "constants/types";
import { useEffect, useState } from "react";
import { convertToFilterString } from "utils/filter";
import QuestionCreate from "../question-create/questionCreate";
import QuestionDelete from "../question-delete/questionDelete";
import QuestionUpdate from "../question-update/questionUpdate";

const QuestionView = () => {
  const [listSubjects, setListSubjects] = useState([]);
  const [listQuestions, setListQuestions] = useState([]);
  const [subjectIdFilter, setSubjectIdFilter] = useState("");
  const [questionTypeFilter, setQuestionTypeFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const listQuestionTypeKeys = Object.keys(QUESTION_TYPE);
  const [isRefreshData, setIsRefreshData] = useState(false);
  const [modifiedElement, setModifiedElement] = useState();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const columns = [
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      fixed: "left",
      render: (content) => (
        <Tooltip placement='topLeft' title={content}>
          <div style={{maxWidth: '16rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:"ellipsis"}}> {content}</div>
        </Tooltip>
      ),
    },

    {
      title: "Câu trả lời đúng",
      render: (record) => <>{record.listCorrectAnswers.map(item=><div>{item}</div>)}</>,
      key: "listCorrectAnswers",
    },
    {
      title: "Loại câu hỏi",
      render: (record) => QUESTION_TYPE[record.type].meaning,
      key: "type",
    },
    {
      title: "",
      fixed: "right",
      width: 100,
      key: "action",
      render: (record) => (
        <Space size='middle' key={record}>
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
          <QuestionDelete
            questionElement={record}
            setIsRefreshData={setIsRefreshData}
            isRefreshData={isRefreshData}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getAllSubjects();
  }, []);

  useEffect(() => {
    if (subjectIdFilter) getAllQuestions();
  }, [isRefreshData, questionTypeFilter, subjectIdFilter]);

  const getAllSubjects = async () => {
    await subjectAPI.get().then((res) => {
      if (res?.data?.length > 0) {
        setListSubjects(res.data);
        setSubjectIdFilter(res.data?.[0]?._id);
      }
    });
  };

  const getAllQuestions = async () => {
    setIsLoading(true);
    const filterString = convertToFilterString([
      { key: "subjectId", operator: "==", value: subjectIdFilter },
      { key: "type", operator: "==", value: questionTypeFilter },
    ]);

    const params = {
      filterString: filterString,
    };

    await questionAPI.get(params).then((res) => {
      setListQuestions(res.data);
      setIsLoading(false);
    });
  };

  const handleChangeSubjectFilter = (value) => {
    setSubjectIdFilter(value);
  };

  const handleChangeQuestionTypeFilter = (value) => {
    setQuestionTypeFilter(value);
  };

  const isCorrectAnswer = (answer, listCorrectAnswers) => {
    return listCorrectAnswers.find((correctAnswer) => correctAnswer == answer);
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
            options={listSubjects.map((subject) => ({
              label: subject.name,
              value: subject._id,
            }))}
          />
          <Select
            placeholder='Chọn loại câu hỏi'
            style={{ width: 180 }}
            allowClear
            onChange={handleChangeQuestionTypeFilter}
            options={listQuestionTypeKeys.map((key) => ({
              label: QUESTION_TYPE[key].meaning,
              value: QUESTION_TYPE[key].code,
            }))}
          />
          <QuestionCreate
            listSubjects={listSubjects}
            setIsRefreshData={setIsRefreshData}
            isRefreshData={isRefreshData}
          />
        </div>
      </>
    );
  };

  const renderTableExpanded = (record) => {
    const columns = [
      {
        title: "Câu trả lời",
        render: (answer) => answer,
      },
      {
        title: "Trạng thái",
        render: (answer) =>
          isCorrectAnswer(answer, record.listCorrectAnswers) ? (
            <CheckCircleOutlined className='text-success' />
          ) : (
            <InfoCircleOutlined className='text-danger' />
          ),
      },
    ];
    return (
      <>
        <Table
          dataSource={record.listAnswers}
          columns={columns}
          pagination={false}
          style={{ margin: "1rem" }}
        ></Table>
      </>
    );
  };

  return (
    <>
      <Card title='Danh sách câu hỏi' extra={renderTableExtra()}>
        {isLoading ? null : (
          <Table
            columns={columns}
            dataSource={listQuestions}
            expandable={{
              expandedRowRender: (record) => renderTableExpanded(record),
              defaultExpandedRowKeys: ["0"],
            }}
            scroll={{ x: true }}
          />
        )}
        <QuestionUpdate
          questionElement={modifiedElement}
          listSubjects={listSubjects}
          setIsRefreshData={setIsRefreshData}
          isRefreshData={isRefreshData}
          isUpdateModalOpen={isUpdateModalOpen}
          setIsUpdateModalOpen={setIsUpdateModalOpen}
        />
      </Card>
    </>
  );
};
export default QuestionView;
