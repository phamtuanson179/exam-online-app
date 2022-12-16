import { QUESTION_TYPE } from "./types";
import { Form, Radio } from "antd";

export const PLACEHOLDER = {
  NAME: "Điền tên của bạn",
  DOB: "Chọn ngày sinh của bạn",
  EMAIL: "Điền email của bạn",
  USERNAME: "Điền tên tài khoản của bạn",
  ROLE: "Chọn quyền của bạn",
  ADDRESS: "Điền địa chỉ của bạn",
  QUESTION_TYPE: "Chọn một loại câu hỏi",
  SUBJECT: "Chọn môn học",
  QUESTION_CONTENT: "Điền nội dung câu hỏi",
  CORRECT_ANSWERS: "Chọn câu trả lời đúng",
  PHONE_NUMBER: "",
};

// export const RENDER_QUESTION = (questionType, onChange) => {
//   if (questionType == QUESTION_TYPE.ONE.code) {
//     return <>
//       <Form.Item value={ }>
//         <Radio.Group value={value}>
//           <Radio value={1}> <Form.Item
//             label='Nội dung câu hỏi'
//             name='fullname'
//             rules={[
//               {
//                 required: true,
//                 message: "Trường này bắt buộc!",
//               },
//             ]}
//           >
//             <Input placeholder={PLACEHOLDER.QUESTION_CONTENT} />
//           </Form.Item></Radio>
//           <Radio value={2}>B</Radio>
//           <Radio value={3}>C</Radio>
//           <Radio value={4}>D</Radio>
//         </Radio.Group>
//       </Form.Item>

//     </>
//   }
// }
