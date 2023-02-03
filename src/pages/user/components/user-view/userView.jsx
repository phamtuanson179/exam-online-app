import { Button, Card, Space, Table, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsersSelector } from "../../../../redux/selectors";
import { convertDate } from "../../../../utils/time";
import { getAllUserThunk } from "pages/user/redux/userThunks";
import UserDelete from "../user-delete/userDelete";
import UserUpdate from "../user-update/userUpdate";
import UserCreate from "../user-create/userCreate";
import { ROLE } from "constants/types";
import { UploadOutlined } from "@ant-design/icons";
import userAPI from "apis/userAPI";

const UserView = () => {
  const user = useSelector(listUsersSelector);
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUserThunk());
  }, []);

  const createBatchUsers = async (event) => {
    console.log(event.target.files[0]);
    const value = event.target.files[0];
    setFile(event.target.value);
    const formData = new FormData();
    formData.append("file", value);
    await userAPI
      .createBatch(formData)
      .then((res) => {
        message.success("Thêm người dùng thành công!");
        dispatch(getAllUserThunk());
      })
      .finally(() => setFile(""));
  };

  const renderExtra = () => {
    return (
      <div className='d-flex justify-content-center align-items-center gap-2'>
        <label for='upload-photo' className='btn btn-primary'>
          <UploadOutlined />
        </label>
        <input
          type='file'
          name='photo'
          id='upload-photo'
          value={file}
          style={{ opacity: 0, position: "absolute", zIndex: -1 }}
          onChange={createBatchUsers}
        />
        <UserCreate />
      </div>
    );
  };

  return (
    <Card title='Danh sách tài khoản' extra={renderExtra()}>
      {user.loading ? null : (
        <Table columns={columns} dataSource={user.listUsers} key='' />
      )}
    </Card>
  );
};
export default UserView;

const columns = [
  {
    title: "Họ tên",
    dataIndex: "fullname",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
  },
  { title: "Email", dataIndex: "email", key: 3 },
  {
    title: "Ngày sinh",
    key: 4,
    render: (record) => convertDate(record.dob),
  },
  {
    title: "Vai trò",
    key: 4,
    render: (record) => ROLE[record.role].meaning,
  },
  { title: "Tên đăng nhập", dataIndex: "username", key: 5 },
  {
    title: "",
    render: (record) => (
      <Space size='middle' key={record}>
        <UserUpdate userElement={record} />
        <UserDelete userElement={record} />
      </Space>
    ),
  },
];
