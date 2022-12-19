import { Card, Space, Table } from "antd";
import subjectAPI from "apis/subjectAPI";
import userAPI from "apis/userAPI";
import { ROLE } from "constants/types";
import { useEffect, useState } from "react";
import SubjectCreate from "../subject-create/subjectCreate";
import SubjectDelete from "../subject-delete/subjectDelete";
import SubjectTeacher from "../subject-teacher/subjectTeacher";
import SubjectUpdate from "../subject-update/subjectUpdate";

const SubjectView = () => {
  const [listStudents, setListStudents] = useState();
  const [listTeachers, setListTeachers] = useState();
  const [listSubjects, setListSubjects] = useState();
  const [isRefeshData, setIsRefeshData] = useState();

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
          <SubjectTeacher
            subjectElement={record}
            listTeachers={listTeachers}
            isRefeshData={isRefeshData}
            setIsRefeshData={setIsRefeshData}
          />
          <SubjectUpdate
            subjectElement={record}
            isRefeshData={isRefeshData}
            setIsRefeshData={setIsRefeshData}
          />
          <SubjectDelete
            subjectElement={record}
            isRefeshData={isRefeshData}
            setIsRefeshData={setIsRefeshData}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getAllSubject();
  }, [isRefeshData]);

  useEffect(() => {
    getAllTeacher();
    getAllStudent();
  }, []);

  const getAllTeacher = async () => {
    const params = {
      filterString: `role==${ROLE.TEACHER.code}`,
    };

    await userAPI.get(params).then((res) => {
      res.data.forEach((item) => (item.key = item._id));
      setListTeachers(res.data);
    });
  };

  const getAllStudent = async () => {
    const params = {
      filterString: `role==${ROLE.STUDENT.code}`,
    };

    await userAPI.get(params).then((res) => {
      res.data.forEach((item) => (item.key = item._id));
      setListStudents(res.data);
    });
  };

  const getAllSubject = async () => {
    await subjectAPI.get().then((res) => {
      const listSubjects = res.data;
      listSubjects.forEach(async (subject) => {
        await subjectAPI.getTeacher({ subjectId: subject._id }).then((res) => {
          subject.listTeachers = res.data?.map((item) => item.userId);
        });
        await subjectAPI.getStudent({ subjectId: subject._id }).then((res) => {
          subject.listStudents = res.data?.map((item) => item.userId);
        });
      });
      console.log("dsfdsfsdfsd");
      console.log("sdfadsf", listSubjects);
      setListSubjects(res.data);
    });
  };

  return (
    <Card title='Danh sách môn học' extra={<SubjectCreate />}>
      {console.log({ listSubjects })}
      <Table columns={columns} dataSource={listSubjects} rowKey='id' key='' />
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
