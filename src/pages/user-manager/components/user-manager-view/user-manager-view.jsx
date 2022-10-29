import { Space, Table, Card } from "antd";
import React, { useState, useEffect } from "react";
import userAPI from "../../../../apis/userAPI";
import UserManagerCreate from "../user-manager-create";

const UserManagerView = () => {
  const [dataSource, setDataSource] = useState();

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    await userAPI.getAll().then((res) => {
      console.log({ res });
      setDataSource(res?.data);
    });
  };

  return (
    <Card title='Danh sách tài khoản' extra={<UserManagerCreate />}>
      <Table columns={columns} dataSource={dataSource} />
    </Card>
  );
};
export default UserManagerView;

const columns = [
  {
    title: "Họ tên",
    dataIndex: "fullname",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
  },
  { title: "Email", dataIndex: "email" },
  { title: "Ngày sinh", dataIndex: "dob" },
  { title: "Tên đăng nhập", dataIndex: "username" },
  {
    title: "Action",
    render: (record) => (
      <Space size='middle'>
        <a>Delete</a>
      </Space>
    ),
  },
];
