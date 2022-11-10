import { Card, Space, Spin, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsersSelector } from "../../../../redux/selectors";
import { convertDate } from "../../../../utils/time";
import { getAllUserThunk } from "pages/user/redux/userThunks";
import UserDelete from "../user-delete/userDelete";
import UserUpdate from "../user-update/userUpdate";
import UserCreate from "../user-create/userCreate";

const UserView = () => {
  const user = useSelector(listUsersSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUserThunk());
  }, []);

  return (
    <Card title='Danh sách tài khoản' extra={<UserCreate />}>
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
