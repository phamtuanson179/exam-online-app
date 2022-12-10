import { Button, Popconfirm } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteUserThunk } from "pages/user/redux/userThunks";
import { DeleteOutlined } from "@ant-design/icons";

const UserDelete = ({ userElement }) => {
  const dispatch = useDispatch();
  const confirmDeleteUser = () => {
    dispatch(deleteUserThunk({ id: userElement._id }));
  };

  return (
    <Popconfirm
      title='Bạn có muốn xóa tài khoản này không?'
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
