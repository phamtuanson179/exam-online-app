import { Form, Input, Select } from "antd";
import { PLACEHOLDER } from "constants/configs";
const { Option } = Select;
export const renderQuestionOneCorrectAnswer = () => {
  return (
    <>
      <Form.Item
        label='Nội dung câu hỏi'
        name='content'
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
        label='1.'
        name='1'
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
        label='2.'
        name='2'
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
        label='3.'
        name='3'
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
        label='4.'
        name='4'
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
        label='Câu trả lời đúng'
        name='listCorrectAnswers'
        rules={[
          {
            required: true,
            message: "Trường này bắt buộc!",
          },
        ]}
      >
        <Select placeholder={PLACEHOLDER.CORRECT_ANSWERS}>
          {Array.from(Array(4).keys()).map((value, key) => (
            <Option key={key + 1} value={value + 1}>
              {value + 1}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export const renderQuestionTrueFalse = () => {
  return (
    <>
      <Form.Item
        label='Nội dung câu hỏi'
        name='content'
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
        label='Câu trả lời đúng'
        name='listCorrectAnswers'
        rules={[
          {
            required: true,
            message: "Trường này bắt buộc!",
          },
        ]}
      >
        <Select placeholder={PLACEHOLDER.SUBJECT}>
          <Option value='đúng'>Đúng</Option>
          <Option value='sai'>Sai</Option>
        </Select>
      </Form.Item>
    </>
  );
};

export const renderQuestionManyCorrectAnswer = () => {
  return (
    <>
      <Form.Item
        label='Nội dung câu hỏi'
        name='content'
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
        label='1.'
        name='1'
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
        label='2.'
        name='2'
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
        label='3.'
        name='3'
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
        label='4.'
        name='4'
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
        label='Câu trả lời đúng'
        name='listCorrectAnswers'
        rules={[
          {
            required: true,
            message: "Trường này bắt buộc!",
          },
        ]}
      >
        <Select placeholder={PLACEHOLDER.CORRECT_ANSWERS} mode='multiple'>
          {Array.from(Array(4).keys()).map((value, key) => (
            <Option key={key + 1} value={value + 1}>
              {value + 1}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export const renderQuestionFillCorrectAnswer = () => {
  return (
    <>
      <Form.Item
        label='Nội dung câu hỏi'
        name='content'
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
        label='Câu trả lời đúng'
        name='listCorrectAnswers'
        rules={[
          {
            required: true,
            message: "Trường này bắt buộc!",
          },
        ]}
      >
        <Input placeholder={PLACEHOLDER.CORRECT_ANSWERS} />
      </Form.Item>
    </>
  );
};
