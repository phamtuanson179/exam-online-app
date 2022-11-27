import { Button, Popconfirm } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteUserThunk } from "pages/user/redux/userThunks";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteSubjectThunk } from "pages/subject/redux/subjectThunks";
import subjectAPI from "apis/subjectAPI";

const SubjectDelete = ({ subjectElement, isRefeshData, setIsRefeshData }) => {
  const confirmDeleteSubject = async () => {
    await subjectAPI.delete({ id: subjectElement._id }).then((res) => {
      setIsRefeshData(!isRefeshData);
    });
  };

  return (
    <Popconfirm
      title='Bạn có muốn xóa môn học này không?'
      onConfirm={confirmDeleteSubject}
      okText='Xác nhận'
      cancelText='Hủy'
    >
      <Button className='btn btn-danger'>
        <DeleteOutlined />
      </Button>
    </Popconfirm>
  );
};
export default SubjectDelete;
