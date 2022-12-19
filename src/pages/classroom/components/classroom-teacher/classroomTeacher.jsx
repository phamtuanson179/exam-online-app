import { ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, message, Modal, Select, Table } from "antd";
import classroomAPI from "apis/classroomAPI";
import moment from "moment";
import { useEffect, useState } from "react";

const { Option } = Select;

const ClassroomTeacher = ({
  setIsRefreshData,
  isRefreshData,
  classroomElement,
  listTeachers,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    if (isModalOpen) getListTeacherOfClassroom();
  }, [isModalOpen]);

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
        setIsModalOpen(false);
      });
  };

  return (
    <>
      <Button type='primary' className='btn btn-info' onClick={showModal}>
        <UserOutlined />
      </Button>
      <Modal
        getContainer={false}
        title='Danh sách giáo viên'
        visible={isModalOpen}
        onCancel={handleCancel}
        onOk={onSubmit}
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
  {
    title: "Ngày sinh",
    render: (record) => moment.unix(record?.dob / 1000).format("DD/MM/YYYY"),
  },
];
