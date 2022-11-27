import { UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Modal, Table } from "antd";
import subjectAPI from "apis/subjectAPI";
import { useEffect, useState } from "react";
import { convertDate } from "utils/time";

const SubjectTeacher = ({
  subjectElement,
  listTeachers,
  isRefreshData,
  setIsRefreshData,
}) => {
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSelectChange = (newSelectedUserIds) => {
    console.log({ newSelectedUserIds });
    setSelectedUserIds(newSelectedUserIds);
  };

  const rowSelection = {
    selectedUserIds,
    onChange: onSelectChange,
  };

  useEffect(() => {
    if (isModalOpen && subjectElement.listTeachers) {
      onSelectChange(subjectElement.listTeachers);
    }
  }, [isModalOpen]);

  const onSubmit = async () => {
    const params = {
      subjectId: subjectElement._id,
      listUserIds: selectedUserIds.join(","),
    };
    await subjectAPI.updateTeacher(params).then((res) => {
      setSelectedUserIds([]);
      setIsModalOpen(false);
      setIsRefreshData(!isRefreshData);
    });
  };

  return (
    <>
      <Button type='primary' className='btn btn-info' onClick={showModal}>
        <UserOutlined />
      </Button>
      <Modal
        title='Cập nhật danh sách dạy học'
        visible={isModalOpen}
        onCancel={handleCancel}
        getContainer={false}
        width={1000}
        onOk={onSubmit}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          labelAlign='left'
        >
          <Form.Item label='Tên môn học:'>
            <div className='fw-bold'>{subjectElement.name}</div>
          </Form.Item>
          <Form.Item
            label='Danh sách câu hỏi'
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Alert
              message={`Có ${selectedUserIds.length} người được chọn`}
              type='info'
            />
            <Table
              rowSelection={rowSelection}
              columns={teacherTableColumn}
              dataSource={listTeachers}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default SubjectTeacher;

const teacherTableColumn = [
  {
    title: "Họ tên",
    dataIndex: "fullname",
    key: "fullname",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
  },
  { title: "Email", dataIndex: "email", key: "email" },
  {
    title: "Ngày sinh",
    render: (record) => convertDate(record.dob),
    key: "dob",
  },
];
