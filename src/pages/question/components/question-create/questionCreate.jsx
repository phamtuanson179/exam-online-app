import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, message, Modal, Select } from "antd";
import questionAPI from "apis/questionAPI";
import { useEffect, useState } from "react";
import {
  renderQuestionFillCorrectAnswer,
  renderQuestionManyCorrectAnswer,
  renderQuestionOneCorrectAnswer,
  renderQuestionTrueFalse,
} from "utils/renderAnswer";
import { PLACEHOLDER } from "../../../../constants/configs";
import { QUESTION_TYPE } from "../../../../constants/types";

const { Option } = Select;

const QuestionCreate = ({ listSubjects, setIsRefreshData, isRefreshData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionForm] = Form.useForm();
  const listQuestionTypeKeys = Object.keys(QUESTION_TYPE);
  const [questionType, setQuestionType] = useState("");

  useEffect(() => {}, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeQuestionType = (value) => {
    setQuestionType(value);
    const subjectId = questionForm.getFieldValue("subjectId");
    questionForm.resetFields();
    questionForm.setFieldsValue({ subjectId: subjectId, type: value });
  };

  const onSubmit = async (value) => {
    let body;
    if (questionType == QUESTION_TYPE.ONE.code) {
      body = {
        subjectId: value?.subjectId,
        content: value?.content,
        type: value?.type,
        listAnswers: [value?.[1], value?.[2], value?.[3], value?.[4]],
        listCorrectAnswers: [value?.[value?.listCorrectAnswers]],
      };
    } else if (questionType == QUESTION_TYPE.MANY.code) {
      body = {
        subjectId: value?.subjectId,
        content: value?.content,
        type: value?.type,
        listAnswers: [value?.[1], value?.[2], value?.[3], value?.[4]],
        listCorrectAnswers: value?.listCorrectAnswers.map(
          (index) => value[index]
        ),
      };
    } else if (questionType == QUESTION_TYPE.TRUE_FALSE.code) {
      body = {
        subjectId: value?.subjectId,
        content: value?.content,
        type: value?.type,
        listAnswers: ["đúng", "sai"],
        listCorrectAnswers: [value?.listCorrectAnswers],
      };
    } else if (questionType == QUESTION_TYPE.FILL.code) {
      body = {
        subjectId: value?.subjectId,
        content: value?.content,
        type: value?.type,
        listAnswers: [value?.listCorrectAnswers],
        listCorrectAnswers: [value?.listCorrectAnswers],
      };
    }
    await questionAPI.create(body).then((res) => {
      message.success("Thêm câu hỏi thành công!");
      setQuestionType("");
      questionForm.resetFields();
      setIsRefreshData(!isRefreshData);
      setIsModalOpen(false);
    });
  };

  const renderQuestionAnswers = () => {
    if (questionType == QUESTION_TYPE.ONE.code) {
      return renderQuestionOneCorrectAnswer();
    } else if (questionType == QUESTION_TYPE.TRUE_FALSE.code) {
      return renderQuestionTrueFalse();
    } else if (questionType == QUESTION_TYPE.MANY.code) {
      return renderQuestionManyCorrectAnswer();
    } else if (questionType == QUESTION_TYPE.FILL.code) {
      return renderQuestionFillCorrectAnswer();
    }
  };

  return (
    <>
      <Button type='primary' className='btn btn-success' onClick={showModal}>
        <PlusOutlined />
      </Button>
      <Modal
        getContainer={false}
        title='Thêm câu hỏi'
        visible={isModalOpen}
        onCancel={handleCancel}
        okButtonProps={{
          htmlType: "submit",
          form: "questionCreateForm",
        }}
      >
        <Form form={questionForm} onFinish={onSubmit} id='questionCreateForm'>
          <Form.Item
            label='Môn học'
            name='subjectId'
            rules={[
              {
                required: true,
                message: "Trường này bắt buộc!",
              },
            ]}
          >
            <Select placeholder={PLACEHOLDER.SUBJECT}>
              {listSubjects.map((subject, key) => (
                <Option key={key} value={subject._id}>
                  {subject?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label='Loại câu hỏi'
            name='type'
            rules={[
              {
                required: true,
                message: "Trường này bắt buộc!",
              },
            ]}
          >
            <Select
              placeholder={PLACEHOLDER.QUESTION_TYPE}
              onChange={onChangeQuestionType}
            >
              {listQuestionTypeKeys.map((questionType, key) => (
                <Option key={key} value={questionType}>
                  {QUESTION_TYPE[questionType].meaning}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Card style={{ display: questionType ? "block" : "none" }}>
            {questionType ? renderQuestionAnswers() : null}
          </Card>
        </Form>
      </Modal>
    </>
  );
};
export default QuestionCreate;
