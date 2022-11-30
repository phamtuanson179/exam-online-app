import { Button, Popconfirm } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteUserThunk } from "pages/user/redux/userThunks";
import { DeleteOutlined } from "@ant-design/icons";
import questionAPI from "apis/questionAPI";
import examAPI from "apis/examAPI";

const ExamDelete = ({ examElement, setIsRefreshData, isRefreshData }) => {
  const confirmDelete = async () => {
    await examAPI.delete({ id: examElement?._id }).then((res) => {
      setIsRefreshData(!isRefreshData);
    });
  };

  return (
    <Popconfirm
      title='Bạn có muốn xóa đề thi này không?'
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
export default ExamDelete;
