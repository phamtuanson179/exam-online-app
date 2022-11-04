import { Button, Popconfirm } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../userThunks";
import { DeleteOutlined } from "@ant-design/icons";

const UserDelete = ({ userElement }) => {
  const dispatch = useDispatch();
  const confirmDeleteUser = () => {
    dispatch(deleteUser({ id: userElement._id }));
  };

  return (
    <Popconfirm
      title='Bạn có muốn xóa người dùng này không?'
      onConfirm={confirmDeleteUser}
      okText='Xác nhận'
      cancelText='Hủy'
    >
      <Button className='btn btn-danger'>
        <DeleteOutlined />
      </Button>
    </Popconfirm>
  );
};
export default UserDelete;
