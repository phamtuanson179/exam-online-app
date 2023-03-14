import { ProfileOutlined, TeamOutlined } from "@ant-design/icons";
import { Alert, Button, Form, message, Modal, Select, Table } from "antd";
import classroomAPI from "apis/classroomAPI";
import { ROLE } from "constants/types";
import moment from "moment";
import { useEffect, useState } from "react";

const ClassroomStudent = ({
  setIsRefreshData,
  isRefreshData,
  classroomElement,
  listStudents,
  setIsStudentModalOpen,
  isStudentModalOpen,
  currentUser,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    if (newSelectedRowKeys) {
      setSelectedRowKeys(newSelectedRowKeys);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    if (isStudentModalOpen) getListStudentOfClassroom();
  }, [isStudentModalOpen]);

  const getListStudentOfClassroom = async () => {
    await classroomAPI
      .getStudentOfClassroom({
        classroomId: classroomElement._id,
      })
      .then((res) => {
        const listStudentIdOfClassrooms = res.data.map((item) => item.userId);
        onSelectChange(listStudentIdOfClassrooms);
      });
  };

  const onSubmit = async (value) => {
    await classroomAPI
      .updateStudentOfClassroom(
        { classroomId: classroomElement._id },
        { listUserIds: selectedRowKeys }
      )
      .then((res) => {
        message.success("Cập nhật danh sách học sinh thành công!");
        setIsRefreshData(!isRefreshData);
        setIsStudentModalOpen(false);
      });
  };

  return (
    <>
      <Modal
        getContainer={false}
        title='Danh sách học sinh'
        visible={isStudentModalOpen}
        onCancel={() => setIsStudentModalOpen(false)}
        onOk={() => {
          if (currentUser?.role === ROLE.ADMIN.code) onSubmit();
          else message.warning("Bạn không có quyền với hành động này!");
        }}
        width={1000}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          labelAlign='left'
        >
          <Form.Item
            label='Danh sách học sinh'
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Alert
              message={`Có ${selectedRowKeys?.length} học sinh được chọn`}
              type={"info"}
            />
            <Table
              rowSelection={rowSelection}
              columns={column}
              dataSource={listStudents}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ClassroomStudent;

const column = [
  {
    title: "Tên",
    dataIndex: "fullname",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
  },
];
