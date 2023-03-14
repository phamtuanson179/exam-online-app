import { Button, Card, Select, Space, Table } from "antd";
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
import ClassroomUploadData from "../classroom-upload-data/classroomUploadData";
import {
  EditOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const ClassroomView = () => {
  const [listSubjects, setListSubjects] = useState([]);
  const [listClassrooms, setListClassrooms] = useState([]);
  const [listTeachers, setListTeachers] = useState([]);
  const [listExams, setListExams] = useState([]);
  const [listStudents, setListStudents] = useState([]);
  const [subjectIdFilter, setSubjectIdFilter] = useState("");
  const [isRefreshData, setIsRefreshData] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [modifiedElement, setModifiedElement] = useState();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState();
  const [isStudentModalOpen, setIsStudentModalOpen] = useState();
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState();
  const [isExamModalOpen, setIsExamModalOpen] = useState();
  const columns = [
    {
      title: "Tên lớp hợc",
      dataIndex: "name",
      key: "content",
      fixed: "left",
      width: 100,
    },
    {
      title: "Môn học",
      render: (record) => record?.subject?.name,
      key: "subject",
    },
    {
      title: "",
      fixed: "right",
      key: "actions",
      width: 100,
      render: (record) => (
        <Space size='middle' key={record}>
          {currentUser?.role === ROLE.TEACHER.code && (
            <Button
              type='primary'
              className='btn btn-info'
              onClick={() => {
                setModifiedElement(record);
                setIsExamModalOpen(true);
              }}
            >
              <SolutionOutlined />
            </Button>
          )}
          {(currentUser?.role === ROLE.ADMIN.code ||
            currentUser?.role === ROLE.TEACHER.code) && (
            <Button
              type='primary'
              className='btn btn-info'
              onClick={() => {
                setModifiedElement(record);
                setIsStudentModalOpen(true);
              }}
            >
              <TeamOutlined />
            </Button>
          )}
          {(currentUser?.role === ROLE.ADMIN.code ||
            currentUser?.role === ROLE.TEACHER.code) && (
            <Button
              type='primary'
              className='btn btn-info'
              onClick={() => {
                setModifiedElement(record);
                setIsTeacherModalOpen(true);
              }}
            >
              <UserOutlined />
            </Button>
          )}
          {currentUser?.role === ROLE.ADMIN.code && (
            <Button
              type='primary'
              className='btn btn-warning'
              onClick={() => {
                setModifiedElement(record);
                setIsUpdateModalOpen(true);
              }}
            >
              <EditOutlined />
            </Button>
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
    if (listSubjects?.length > 0) getAllClassroom();
  }, [isRefreshData, subjectIdFilter, listSubjects]);

  const getAllSubjects = async () => {
    await subjectAPI.get().then((res) => {
      if (res.data?.length > 0) {
        setListSubjects(res.data);
        // setSubjectIdFilter(res.data?.[0]?._id);
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

          <ClassroomUploadData
            setIsRefreshData={setIsRefreshData}
            isRefreshData={isRefreshData}
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
        <Table
          columns={columns}
          dataSource={listClassrooms}
          scroll={{ x: true }}
        />
        <ClassroomExam
          classroomElement={modifiedElement}
          isExamModalOpen={isExamModalOpen}
          setIsExamModalOpen={setIsExamModalOpen}
          isRefreshData={isRefreshData}
          setIsRefreshData={setIsRefreshData}
          listExams={listExams}
        />
        <ClassroomTeacher
          classroomElement={modifiedElement}
          isRefreshData={isRefreshData}
          setIsRefreshData={setIsRefreshData}
          listTeachers={listTeachers}
          isTeacherModalOpen={isTeacherModalOpen}
          setIsTeacherModalOpen={setIsTeacherModalOpen}
          currentUser={currentUser}
        />
        <ClassroomStudent
          classroomElement={modifiedElement}
          isRefreshData={isRefreshData}
          setIsRefreshData={setIsRefreshData}
          listStudents={listStudents}
          isStudentModalOpen={isStudentModalOpen}
          setIsStudentModalOpen={setIsStudentModalOpen}
          currentUser={currentUser}
        />
        <ClassroomUpdate
          classroomElement={modifiedElement}
          listSubjects={listSubjects}
          isRefreshData={isRefreshData}
          setIsRefreshData={setIsRefreshData}
          isUpdateModalOpen={isUpdateModalOpen}
          setIsUpdateModalOpen={setIsUpdateModalOpen}
        />
      </Card>
    </>
  );
};
export default ClassroomView;
