import { SolutionOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, message, Modal, Select, Table } from "antd";
import classroomAPI from "apis/classroomAPI";
import moment from "moment";
import { useEffect, useState } from "react";

const ClassroomExam = ({
  setIsRefreshData,
  isRefreshData,
  classroomElement,
  listExams,
}) => {
  const [listExamInSubjectOfClassrooms, setListExamInSubjectOfClassrooms] =
    useState([]);
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
    if (isModalOpen) {
      getListExamOfClassroom();
      filterExamInSubjectOfClassroom();
    }
  }, [isModalOpen]);

  const filterExamInSubjectOfClassroom = () => {
    console.log({ listExams });
    const listExamInSubjectOfClassrooms = listExams.filter(
      (item) => item?.subjectId == classroomElement?.subjectId
    );

    setListExamInSubjectOfClassrooms(listExamInSubjectOfClassrooms);
  };

  const getListExamOfClassroom = async () => {
    await classroomAPI
      .getExamOfClassroom({
        classroomId: classroomElement._id,
      })
      .then((res) => {
        console.log({ res });
        const listExamIdOfClassrooms = res.data.map((item) => item.examId);
        onSelectChange(listExamIdOfClassrooms);
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
      .updateExamOfClassroom(
        { classroomId: classroomElement._id },
        { listExamIds: selectedRowKeys }
      )
      .then((res) => {
        message.success("Cập nhật danh sách đề thi thành công!");
        setIsRefreshData(!isRefreshData);
        setIsModalOpen(false);
      });
  };

  return (
    <>
      <Button type='primary' className='btn btn-info' onClick={showModal}>
        <SolutionOutlined />
      </Button>
      <Modal
        getContainer={false}
        title='Danh sách đề thi'
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
            label='Danh sách đề thi'
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Alert
              message={`Có ${selectedRowKeys?.length} đề thi được chọn`}
              type={"info"}
            />
            <Table
              rowSelection={rowSelection}
              columns={column}
              dataSource={listExamInSubjectOfClassrooms}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ClassroomExam;

const column = [
  {
    title: "Tên",
    dataIndex: "name",
  },
  {
    title: "Thời gian làm bài",
    dataIndex: "time",
  },
  {
    title: "Số lượng câu hỏi",
    dataIndex: "amountQuestion",
  },
  {
    title: "Thời điểm mở",
    render: (record) =>
      moment.unix(record?.openTime / 1000).format("DD/MM/YYYY hh:mm:ss"),
  },
  {
    title: "Thời điểm đóng",
    render: (record) =>
      moment.unix(record?.closeTime / 1000).format("DD/MM/YYYY hh:mm:ss"),
  },
];
