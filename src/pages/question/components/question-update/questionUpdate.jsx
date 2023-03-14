import { Card, Form, Modal, Select, message } from "antd";
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

const QuestionUpdate = ({
  listSubjects,
  setIsRefreshData,
  questionElement,
  isRefreshData,
  isUpdateModalOpen,
  setIsUpdateModalOpen,
}) => {
  const [questionForm] = Form.useForm();
  const listQuestionTypeKeys = Object.keys(QUESTION_TYPE);
  const [questionType, setQuestionType] = useState("");

  useEffect(() => {
    setQuestionType(questionElement?.type);
    questionForm.setFieldsValue({
      subjectId: questionElement?.subjectId,
      type: questionElement?.type,
    });

    if (questionType == QUESTION_TYPE.ONE.code) {
      questionForm.setFieldsValue({
        content: questionElement?.content,
        1: questionElement.listAnswers[0],
        2: questionElement.listAnswers[1],
        3: questionElement.listAnswers[2],
        4: questionElement.listAnswers[3],
        listCorrectAnswers: questionElement.listCorrectAnswers[0],
      });
    } else if (questionType == QUESTION_TYPE.MANY.code) {
      questionForm.setFieldsValue({
        content: questionElement?.content,
        1: questionElement.listAnswers[0],
        2: questionElement.listAnswers[1],
        3: questionElement.listAnswers[2],
        4: questionElement.listAnswers[3],
        listCorrectAnswers: questionElement.listCorrectAnswers,
      });
    } else if (questionType == QUESTION_TYPE.TRUE_FALSE.code) {
      questionForm.setFieldsValue({
        content: questionElement?.content,
        listCorrectAnswers: questionElement.listCorrectAnswers[0],
      });
    } else if (questionType == QUESTION_TYPE.FILL.code) {
      questionForm.setFieldsValue({
        content: questionElement?.content,
        listCorrectAnswers: questionElement.listCorrectAnswers[0],
      });
    }
  }, [isUpdateModalOpen]);

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
    await questionAPI.update({ id: questionElement?._id }, body).then((res) => {
      message.success("Cập nhật câu hỏi thành công!");
      setIsRefreshData(!isRefreshData);
      setIsUpdateModalOpen(false);
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
      <Modal
        getContainer={false}
        title='Cập nhật câu hỏi'
        visible={isUpdateModalOpen}
        onCancel={() => setIsUpdateModalOpen(false)}
        okButtonProps={{
          htmlType: "submit",
          form: "questionUpdateForm",
        }}
      >
        <Form form={questionForm} onFinish={onSubmit} id='questionUpdateForm'>
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
export default QuestionUpdate;
