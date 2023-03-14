import { Button, Card, Select, Space, Table, Tooltip } from "antd";
import classroomAPI from "apis/classroomAPI";
import examAPI from "apis/examAPI";
import resultAPI from "apis/resultAPI";
import { useEffect, useState } from "react";
import ResultDelete from "../result-delete/resultDelete";
import { DownCircleOutlined, DownloadOutlined } from "@ant-design/icons";
import fileSaver from "file-saver";
import excel from "exceljs";
import moment from "moment";

const ResultView = () => {
  const [listExams, setListExams] = useState([]);
  const [listResults, setListResults] = useState([]);
  const [listClassrooms, setListClassrooms] = useState([]);
  const [curExamId, setCurExamId] = useState();
  const [curClassroomId, setcurClassroomId] = useState();

  useEffect(() => {
    if (curClassroomId && curExamId) {
      getAllResult();
    }
  }, [curExamId, curClassroomId]);

  useEffect(() => {
    // getAllExam();
    getClassroom();
  }, []);

  useEffect(() => {
    if (curClassroomId) {
      getExamByClassroomId();
    }
  }, [curClassroomId]);

  // const getClassByExamId = async () => {
  //   const params = {
  //     examId: curExamId
  //   }
  //   await classroomAPI.getClassByExamId(params).then((res) => {
  //     if (res?.data?.length > 0) {
  //       setListClassrooms(res?.data);
  //       setcurClassroomId(res?.data[0]?._id);
  //     }
  //   });
  // };

  const getExamByClassroomId = async () => {
    const params = {
      classroomId: curClassroomId,
    };

    await examAPI.getByClassroomId(params).then((res) => {
      if (res?.data?.length > 0) {
        setListExams(res?.data);
        setCurExamId(res?.data[0]?._id);
      }
    });
  };

  const getClassroom = async () => {
    await classroomAPI.get().then((res) => {
      if (res?.data?.length > 0) {
        setListClassrooms(res?.data);
        setcurClassroomId(res?.data[0]?._id);
      }
    });
  };

  // const getAllExam = async () => {
  //   await examAPI.get().then((res) => {
  //     if (res?.data?.length > 0) {
  //       setListExams(res?.data);
  //       setCurExamId(res?.data[0]?._id);
  //     }
  //   });
  // };

  const columns = [
    {
      title: "Học sinh",
      render: (record) => record.user.fullname,
      fixed: "left",
    },
    {
      title: "Email",
      render: (record) => record.user.email,
    },
    {
      title: "Số câu trả lời đúng",
      render: (record) => record.numberOfCorrectAnswer,
    },
    {
      title: "Thời gian thi",
      render: (record) => record.time,
    },
    {
      title: "Trạng thái",
      render: (record) => (record?.isPass ? "Đạt" : "Không đạt"),
    },
    // {
    //   title: "",
    //   key: "actions",
    //   render: (record) => (
    //     <Space size='middle' key={record}>
    //       <ResultDelete classroomElement={record} />
    //     </Space>
    //   ),
    // },
  ];

  // const getClassByExamId = async () => {
  //   const params = {
  //     examId: curExamId,
  //   };
  //   await classroomAPI.getClassByExamId(params).then((res) => {
  //     if (res?.data?.length > 0) {
  //       setListClassrooms(res?.data);
  //       setcurClassroomId(res?.data[0]?._id);
  //     }
  //   });
  // };

  const getAllResult = async () => {
    const params = {
      classroomId: curClassroomId,
      examId: curExamId,
    };
    await resultAPI.get(params).then((res) => {
      if (res?.data?.length > 0) setListResults(res.data);
    });
  };

  const onChangeExam = (value) => {
    setCurExamId(value);
  };

  const onChangeClassroom = (value) => {
    setcurClassroomId(value);
  };

  const downloadResult = async () => {
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Lịch sử thi");
    worksheet.columns = [
      { header: "Tên học sinh", key: "fullname", width: 25 },
      { header: "Email", key: "email", width: 25 },
      { header: "Số điện thoại", key: "phoneNumber", width: 25 },
      {
        header: "Số câu trả lời đúng",
        key: "numberOfCorrectAnswer",
        width: 25,
      },
      { header: "Thời gian thi (giây)", key: "time", width: 25 },
      { header: "Thời gian nộp bài", key: "createdAt", width: 25 },
      { header: "Kết quả thi", key: "isPass", width: 25 },
    ];
    let convertDataToExcelData = listResults?.map((data) => ({
      fullname: data.user?.fullname,
      email: data.user?.email,
      phoneNumber: data.user?.phoneNumber,
      numberOfCorrectAnswer: data?.numberOfCorrectAnswer,
      time: data?.time,
      createdAt: moment(data?.result.createdAt).format("hh:mm:ss DD/MM/YYYY"),
      isPass: data?.isPass === 1 ? "Đạt" : "Không đạt",
    }));
    worksheet.addRows(convertDataToExcelData);

    await workbook.xlsx.writeBuffer(`./src/assets/users.xlsx`).then((res) => {
      var blob = new Blob([res], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fileSaver.saveAs(blob, "lich_su_thi.xlsx");
    });
  };

  const renderTableExtra = () => {
    return (
      <>
        <div
          className='d-flex justify-content-end align-items-center'
          style={{ columnGap: "0.5rem" }}
        >
          <Tooltip title='Chọn đề thi'>
            <Select
              className='w-100'
              value={curExamId}
              onChange={onChangeExam}
              options={listExams?.map((exam) => ({
                value: exam?._id,
                label: exam?.name,
              }))}
            />
          </Tooltip>
          <Tooltip title='Chọn lớp học'>
            <Select
              className='w-100'
              value={curClassroomId}
              onChange={onChangeClassroom}
              disabled={!curExamId}
              options={listClassrooms?.map((classroom) => ({
                value: classroom?._id,
                label: classroom?.name,
              }))}
            />
          </Tooltip>
          <Button onClick={downloadResult} type="primary">
            <DownloadOutlined />
          </Button>
        </div>
      </>
    );
  };

  return (
    <>
      <Card title='Danh sách lịch sử thi' extra={renderTableExtra()}>
        <Table columns={columns} dataSource={listResults} scroll={{x:true}} />
      </Card>
    </>
  );
};
export default ResultView;
