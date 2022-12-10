import { Button, message, Popconfirm } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteUserThunk } from "pages/user/redux/userThunks";
import { DeleteOutlined } from "@ant-design/icons";
import questionAPI from "apis/questionAPI";

const QuestionDelete = ({
  questionElement,
  setIsRefreshData,
  isRefreshData,
}) => {
  const confirmDelete = async () => {
    await questionAPI.delete({ id: questionElement?._id }).then((res) => {
      message.delete("Xóa câu hỏi thành công!");
      setIsRefreshData(!isRefreshData);
    });
  };

  return (
    <Popconfirm
      title='Bạn có muốn xóa câu hỏi này không?'
      onConfirm={confirmDelete}
      okText='Xác nhận'
      cancelText='Hủy'
    >
      <Button className='btn btn-danger'>
        <DeleteOutlined />
      </Button>
    </Popconfirm>
  );
};
export default QuestionDelete;
