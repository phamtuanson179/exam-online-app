import { unwrapResult } from "@reduxjs/toolkit";
import { Space, Table, Card } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userAPI from "../../../../apis/userAPI";
import { fetchAllUser, listUserSelector } from "../../redux/slice";
import UserManagerCreate from "../user-manager-create";

const UserManagerView = () => {
  const [dataSource, setDataSource] = useState();
  const listUsers = useSelector(listUserSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    // await dispatch(fetchAllUser());
    const res = await userAPI.getAll();
    setDataSource(res.data);
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
  { title: "Email", dataIndex: "email", key: 3 },
  { title: "Ngày sinh", dataIndex: "dob", key: 4 },
  { title: "Tên đăng nhập", dataIndex: "username", key: 5 },
  {
    title: "Action",
    render: (record) => (
      <Space size='middle'>
        <a>Delete</a>
      </Space>
    ),
  },
];
