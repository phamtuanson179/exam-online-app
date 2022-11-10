import { Card, Space, Table } from "antd";
import { getAllSubjectThunk } from "pages/subject/redux/subjectThunks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listSubjectsSelector } from "../../../../redux/selectors";
import SubjectCreate from "../subject-create/subjectCreate";
import SubjectDelete from "../subject-delete/subjectDelete";
import SubjectUpdate from "../subject-update/subjectUpdate";

const SubjectView = () => {
  const subject = useSelector(listSubjectsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSubjectThunk());
  }, []);

  return (
    <Card title='Danh sách môn học' extra={<SubjectCreate />}>
      {subject.loading ? null : (
        <Table
          columns={columns}
          dataSource={subject.listSubjects}
          rowKey='id'
          key=''
        />
      )}
    </Card>
  );
};
export default SubjectView;

const columns = [
  {
    title: "Tên môn học",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Mã môn học",
    dataIndex: "alias",
    key: "alias",
  },
  { title: "Mô tả", dataIndex: "description", key: "description" },
  {
    title: "",
    key: "actions",
    render: (record) => (
      <Space size='middle' key={record}>
        <SubjectUpdate subjectElement={record} />
        <SubjectDelete subjectElement={record} />
      </Space>
    ),
  },
];
