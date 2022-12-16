import { Card, Select, Space, Table } from "antd";
import classroomAPI from "apis/classroomAPI";
import examAPI from "apis/examAPI";
import subjectAPI from "apis/subjectAPI";
import userAPI from "apis/userAPI";
import { useEffect, useState } from "react";
import { searchElementById } from "utils/common";
import { convertToFilterString } from "utils/filter";
import ClassroomCreate from "../classroom-create/classroomCreate";
import ClassroomDelete from "../classroom-delete/classroomDelete";
import ClassroomExam from "../classroom-exam/classroomExam";
import ClassroomStudent from "../classroom-student/classroomStudent";
import ClassroomTeacher from "../classroom-teacher/classroomTeacher";
import ClassroomUpdate from "../classroom-update/classroomUpdate";

const ClassroomView = () => {
  const [listSubjects, setListSubjects] = useState([]);
  const [listClassrooms, setListClassrooms] = useState([]);
  const [listTeachers, setListTeachers] = useState([]);
  const [listExams, setListExams] = useState([]);
  const [listStudents, setListStudents] = useState([]);
  const [subjectIdFilter, setQuestionIdFilter] = useState("");
  const [isRefreshData, setIsRefreshData] = useState(false);
  const columns = [
    {
      title: "Tên lớp hợc",
      dataIndex: "name",
      key: "content",
    },
    {
      title: "Môn học",
      render: (record) => record?.subject?.name,
      key: "subject",
    },
    {
      title: "",
      key: "actions",
      render: (record) => (
        <Space size='middle' key={record}>
          <ClassroomExam
            classroomElement={record}
            isRefreshData={isRefreshData}
            setIsRefreshData={setIsRefreshData}
            listExams={listExams}
          />
          <ClassroomStudent
            classroomElement={record}
            isRefreshData={isRefreshData}
            setIsRefreshData={setIsRefreshData}
            listStudents={listStudents}
          />
          <ClassroomTeacher
            classroomElement={record}
            isRefreshData={isRefreshData}
            setIsRefreshData={setIsRefreshData}
            listTeachers={listTeachers}
          />
          <ClassroomUpdate
            classroomElement={record}
            listSubjects={listSubjects}
            isRefreshData={isRefreshData}
            setIsRefreshData={setIsRefreshData}
          />
          <ClassroomDelete
            classroomElement={record}
            isRefreshData={isRefreshData}
            setIsRefreshData={setIsRefreshData}
          />
        </Space>
      ),
    },
  ];
  useEffect(() => {
    getAllSubjects();
    getAllTeacher();
    getAllStudent();
    getAllExam();
  }, []);

  useEffect(() => {
    getAllClassroom();
  }, [isRefreshData, subjectIdFilter]);

  const getAllSubjects = async () => {
    await subjectAPI.getAll().then((res) => {
      setListSubjects(res.data);
      setIsRefreshData(!isRefreshData);
    });
  };

  const getAllTeacher = async () => {
    await userAPI.getTeacher().then((res) => {
      const listTeacherAddKeyFields = res?.data?.map((item) => ({
        ...item,
        key: item?._id,
      }));
      setListTeachers(listTeacherAddKeyFields);
    });
  };

  const getAllStudent = async () => {
    await userAPI.getStudent().then((res) => {
      const listStudentAddKeyFields = res?.data?.map((item) => ({
        ...item,
        key: item?._id,
      }));
      setListStudents(listStudentAddKeyFields);
    });
  };

  const getAllExam = async () => {
    await examAPI.get().then((res) => {
      const listExamAddKeyFields = res?.data?.map((item) => ({
        ...item,
        key: item?._id,
      }));
      setListExams(listExamAddKeyFields);
    });
  };

  const getAllClassroom = async () => {
    const filterString = convertToFilterString([
      { key: "subjectId", operator: "==", value: subjectIdFilter },
    ]);

    const params = {
      filterString: filterString,
    };

    await classroomAPI.getAll(params).then((res) => {
      const listClassrooms = res.data;
      listClassrooms?.forEach(
        (classroom) =>
          (classroom.subject = searchSubjectById(classroom.subjectId))
      );
      setListClassrooms(listClassrooms);
    });
  };

  const searchSubjectById = (id) => {
    return searchElementById(id, listSubjects);
  };

  const handleChangeSubjectFilter = (value) => {
    setQuestionIdFilter(value);
    setIsRefreshData(!isRefreshData);
  };

  const renderTableExtra = () => {
    return (
      <>
        <div
          className='d-flex justify-content-end align-items-center'
          style={{ columnGap: "0.5rem" }}
        >
          <Select
            placeholder='Chọn môn học'
            style={{ width: 180 }}
            onChange={handleChangeSubjectFilter}
            options={listSubjects.map((question) => ({
              label: question.name,
              value: question._id,
            }))}
          />

          <ClassroomCreate
            listSubjects={listSubjects}
            setIsRefreshData={setIsRefreshData}
            isRefreshData={isRefreshData}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <Card title='Danh sách lớp' extra={renderTableExtra()}>
        <Table columns={columns} dataSource={listClassrooms} />
      </Card>
    </>
  );
};
export default ClassroomView;
