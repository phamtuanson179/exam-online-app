import { Button, Card, Space, Table } from "antd";
import subjectAPI from "apis/subjectAPI";
import { useEffect, useState } from "react";
import SubjectCreate from "../subject-create/subjectCreate";
import SubjectDelete from "../subject-delete/subjectDelete";
import SubjectUpdate from "../subject-update/subjectUpdate";
import SubjectUploadData from "../subject-upload-data/subjectUploadData";
import { EditOutlined } from "@ant-design/icons";

const SubjectView = () => {
  const [listSubjects, setListSubjects] = useState();
  const [isRefreshData, setIsRefreshData] = useState();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [modifiedElement, setModifiedElement] = useState();

  const columns = [
    {
      title: "Tên môn học",
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    { title: "Mã môn học", dataIndex: "alias", key: "alias" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "",
      key: "actions",
      fixed: "right",
      render: (record) => (
        <Space size='middle' key={record}>
          {/* <SubjectTeacher
            subjectElement={record}
            listTeachers={listTeachers}
            isRefeshData={isRefeshData}
            setIsRefeshData={setIsRefeshData}
          /> */}
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
          
          <SubjectDelete
            subjectElement={record}
            isRefreshData={isRefreshData}
            setIsRefreshData={setIsRefreshData}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getAllSubject();
  }, [isRefreshData]);

  useEffect(() => {
    // getAllTeacher();
    // getAllStudent();
  }, []);

  const getAllSubject = async () => {
    await subjectAPI.get().then((res) => {
      const listSubjects = res.data;
      setListSubjects(listSubjects);
    });
  };

  return (
    <Card
      title='Danh sách môn học'
      extra={
        <div className='d-flex justify-content-center align-items-center gap-2'>
          <SubjectUploadData
            isRefreshData={isRefreshData}
            setIsRefreshData={setIsRefreshData}
          />
          <SubjectCreate />
        </div>
      }
    >
      <Table
        columns={columns}
        dataSource={listSubjects}
        rowKey='id'
        key=''
        scroll={{ x: true }}
      />
      <SubjectUpdate
            subjectElement={modifiedElement}
            isUpdateModalOpen={isUpdateModalOpen}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            isRefreshData={isRefreshData}
            setIsRefreshData={setIsRefreshData}
          />
    </Card>
  );
};
export default SubjectView;
