import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import UploadImage from "../../../../components/upload-image";
import { PLACEHOLDER } from "../../../../constants/configs";
import { QUESTION_TYPE, ROLE } from "../../../../constants/types";

const { Option } = Select;

const QuestionCreate = ({ listSubjects }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionForm] = Form.useForm();
  const listQuestionTypeKeys = Object.keys(QUESTION_TYPE);

  useEffect(() => {

  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (value) => {
  };

  const renderQuestionAnswers = () => {
    console.log(questionForm.getFieldValue("type"));
    if (questionForm.getFieldValue("type") == QUESTION_TYPE.ONE.code) {
      return <>
        <Form.Item
          label='Nội dung câu hỏi'
          name='fullname'
          rules={[
            {
              required: true,
              message: "Trường này bắt buộc!",
            },
          ]}
        >
          <Input placeholder={PLACEHOLDER.QUESTION_CONTENT} />
        </Form.Item>
        <Form.Item
          label=''
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 12 }}
          name='fullname'
          rules={[
            {
              required: true,
              message: "Trường này bắt buộc!",
            },
          ]}
        >
          <Input placeholder={PLACEHOLDER.QUESTION_CONTENT} />
        </Form.Item>
        <Form.Item
          label='Câu trả lời thứ hai'
          name='fullname'
          rules={[
            {
              required: true,
              message: "Trường này bắt buộc!",
            },
          ]}
        >
          <Input placeholder={PLACEHOLDER.QUESTION_CONTENT} />
        </Form.Item>
        <Form.Item
          label='Câu trả lời thứ ba'
          name='fullname'
          rules={[
            {
              required: true,
              message: "Trường này bắt buộc!",
            },
          ]}
        >
          <Input placeholder={PLACEHOLDER.QUESTION_CONTENT} />
        </Form.Item>
        <Form.Item
          label='Câu trả lời thứ tư'
          name='fullname'
          rules={[
            {
              required: true,
              message: "Trường này bắt buộc!",
            },
          ]}
        >
          <Input placeholder={PLACEHOLDER.QUESTION_CONTENT} />
        </Form.Item>
      </>
    } else return <></>
  }
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
        <Form
          layout={"vertical"}
          form={questionForm}
          onFinish={onSubmit}
          id='questionCreateForm'
        >
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
            <Select placeholder={PLACEHOLDER.QUESTION_TYPE}>
              {listQuestionTypeKeys.map((questionType, key) => (
                <Option key={key} value={questionType}>
                  {QUESTION_TYPE[questionType].meaning}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Card style={{ display: questionForm.getFieldValue('type') ? 'block' : 'none' }}>
            <Form.Item
              label='Nội dung câu hỏi'
              name='fullname'
              rules={[
                {
                  required: true,
                  message: "Trường này bắt buộc!",
                },
              ]}
            >
              <Input placeholder={PLACEHOLDER.QUESTION_CONTENT} />
            </Form.Item>

          </Card>
        </Form>
      </Modal>
    </>
  );
};
export default QuestionCreate;
