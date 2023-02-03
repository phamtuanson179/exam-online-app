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
import { ROLE } from "constants/types";

const ClassroomView = () => {
  const [listSubjects, setListSubjects] = useState([]);
  const [listClassrooms, setListClassrooms] = useState([]);
  const [listTeachers, setListTeachers] = useState([]);
  const [listExams, setListExams] = useState([]);
  const [listStudents, setListStudents] = useState([]);
  const [subjectIdFilter, setSubjectIdFilter] = useState("");
  const [isRefreshData, setIsRefreshData] = useState(false);
  const [currentUser, setCurrentUser] = useState();
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
          {currentUser?.role === ROLE.TEACHER.code && (
            <ClassroomExam
              classroomElement={record}
              isRefreshData={isRefreshData}
              setIsRefreshData={setIsRefreshData}
              listExams={listExams}
            />
          )}
          {currentUser?.role === ROLE.ADMIN.code && (
            <ClassroomStudent
              classroomElement={record}
              isRefreshData={isRefreshData}
              setIsRefreshData={setIsRefreshData}
              listStudents={listStudents}
            />
          )}
          {currentUser?.role === ROLE.ADMIN.code && (
            <ClassroomTeacher
              classroomElement={record}
              isRefreshData={isRefreshData}
              setIsRefreshData={setIsRefreshData}
              listTeachers={listTeachers}
            />
          )}
          {currentUser?.role === ROLE.ADMIN.code && (
            <ClassroomUpdate
              classroomElement={record}
              listSubjects={listSubjects}
              isRefreshData={isRefreshData}
              setIsRefreshData={setIsRefreshData}
            />
          )}
          {currentUser?.role === ROLE.ADMIN.code && (
            <ClassroomDelete
              classroomElement={record}
              isRefreshData={isRefreshData}
              setIsRefreshData={setIsRefreshData}
            />
          )}
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
    const currentUserString = localStorage.getItem("currentUser");
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      setCurrentUser(currentUser);
    }
  }, []);

  useEffect(() => {
    getAllClassroom();
  }, [isRefreshData, subjectIdFilter]);

  const getAllSubjects = async () => {
    await subjectAPI.get().then((res) => {
      if (res.data?.length > 0) {
        setListSubjects(res.data);
        setSubjectIdFilter(res.data?.[0]?._id);
        // setIsRefreshData(!isRefreshData);
      }
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
    console.log(subjectIdFilter);
    const filterString = convertToFilterString([
      { key: "subjectId", operator: "==", value: subjectIdFilter },
    ]);

    const params = {
      filterString: filterString,
    };

    await classroomAPI.get(params).then((res) => {
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
    console.log({ value });
    setSubjectIdFilter(value || "");
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
            value={subjectIdFilter}
            onChange={handleChangeSubjectFilter}
            allowClear={true}
            options={listSubjects.map((subject) => ({
              label: subject.name,
              value: subject._id,
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
