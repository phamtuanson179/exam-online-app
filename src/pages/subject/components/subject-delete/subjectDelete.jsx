import { Button, Popconfirm } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteUserThunk } from "pages/user/redux/userThunks";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteSubjectThunk } from "pages/subject/redux/subjectThunks";

const SubjectDelete = ({ subjectElement }) => {
  const dispatch = useDispatch();
  const confirmDeleteSubject = () => {
    dispatch(deleteSubjectThunk({ id: subjectElement._id }));
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
