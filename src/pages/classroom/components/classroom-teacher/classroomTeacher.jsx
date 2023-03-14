import { ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, message, Modal, Select, Table } from "antd";
import classroomAPI from "apis/classroomAPI";
import { ROLE } from "constants/types";
import moment from "moment";
import { useEffect, useState } from "react";

const { Option } = Select;

const ClassroomTeacher = ({
  setIsRefreshData,
  isRefreshData,
  classroomElement,
  listTeachers,
  isTeacherModalOpen,
  setIsTeacherModalOpen,
  currentUser
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
    if (isTeacherModalOpen) getListTeacherOfClassroom();
  }, [isTeacherModalOpen]);

  const getListTeacherOfClassroom = async () => {
    await classroomAPI
      .getTeacherOfClassroom({
        classroomId: classroomElement._id,
      })
      .then((res) => {
        const listTeacherIdOfClassrooms = res.data.map((item) => item.userId);
        onSelectChange(listTeacherIdOfClassrooms);
      });
  };

  const onSubmit = async (value) => {
    await classroomAPI
      .updateTeacherOfClassroom(
        { classroomId: classroomElement._id },
        { listUserIds: selectedRowKeys }
      )
      .then((res) => {
        message.success("Cập nhật danh sách giáo viên thành công!");
        setIsRefreshData(!isRefreshData);
        setIsTeacherModalOpen(false);
      });
  };

  return (
    <>
      <Modal
        getContainer={false}
        title='Danh sách giáo viên'
        visible={isTeacherModalOpen}
        onCancel={()=> setIsTeacherModalOpen(false)}
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
            label='Danh sách giáo viên'
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Alert
              message={`Có ${selectedRowKeys?.length} giáo viên được chọn`}
              type={"info"}
            />
            <Table
              rowSelection={rowSelection}
              columns={column}
              dataSource={listTeachers}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ClassroomTeacher;

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
