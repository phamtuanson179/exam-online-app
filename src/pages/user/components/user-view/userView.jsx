import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Space, Table } from "antd";
import { ROLE } from "constants/types";
import { getAllUserThunk } from "pages/user/redux/userThunks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsersSelector } from "../../../../redux/selectors";
import { convertDate } from "../../../../utils/time";
import UserCreate from "../user-create/userCreate";
import UserDelete from "../user-delete/userDelete";
import UserUpdate from "../user-update/userUpdate";
import UserUploadData from "../user-upload-data/userUploadData";

const UserView = () => {
  const user = useSelector(listUsersSelector);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [modifiedElement, setModifiedElement] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUserThunk());
  }, []);

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "fullname",
      fixed: "left",
      width: 100,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    { title: "Email", dataIndex: "email", key: 3 },
    {
      title: "Vai trò",
      key: 4,
      render: (record) => ROLE[record.role].meaning,
    },
    // { title: "Tên đăng nhập", dataIndex: "username", key: 5 },
    {
      title: "",
      fixed: "right",
      width: 100,
      render: (record) => (
        <Space size='middle' key={record}>
          <Button
            type='warning'
            className='btn btn-warning'
            onClick={() => {
              setModifiedElement(record);
              setIsUpdateModalOpen(true);
            }}
          >
            <EditOutlined />
          </Button>
          <UserDelete userElement={record} />
        </Space>
      ),
    },
  ];

  const renderExtra = () => {
    return (
      <div className='d-flex justify-content-center align-items-center gap-2'>
        <UserUploadData />
        <UserCreate />
      </div>
    );
  };

  return (
    <Card title='Danh sách tài khoản' extra={renderExtra()}>
      {user.loading ? null : (
        <Table
          columns={columns}
          dataSource={user.listUsers}
          scroll={{
            x: true,
          }}
        />
      )}
      <UserUpdate
        userElement={modifiedElement}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        isUpdateModalOpen={isUpdateModalOpen}
      />
    </Card>
  );
};
export default UserView;
