import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Modal, message } from "antd";
import classroomAPI from "apis/classroomAPI";
import { useEffect, useState } from "react";

const ClassroomUploadData = ({ isRefreshData, setIsRefreshData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState();

  useEffect(() => {}, []);

  const createBatchClassrooms = async (event) => {
    const value = event.target.files[0];
    setFile(event.target.value);
    const formData = new FormData();
    formData.append("file", value);
    await classroomAPI
      .createBatch(formData)
      .then((res) => {
        message.success("Thêm lớp học thành công!");
        setIsRefreshData(!isRefreshData);
        setIsModalOpen(false);
      })
      .finally(() => setFile(""));
  };

  const downloadSampleFile = () => {
    let alink = document.createElement("a");
    alink.href = "http://localhost:3000/classrooms.xlsx";
    alink.download = "classrooms.xlsx";
    document.body.appendChild(alink);
    alink.click();
    document.removeChild(alink);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type='primary' className='btn btn-primary' onClick={showModal}>
        <UploadOutlined />
      </Button>
      <Modal
        title='Tải lên lớp học'
        visible={isModalOpen}
        onCancel={handleCancel}
      >
        <div className='d-flex justify-content-evenly align-items-center'>
          <div className='d-flex flex-column align-items-center gap-2'>
            <Button className='btn btn-warning' onClick={downloadSampleFile}>
              <DownloadOutlined />
            </Button>
            <div>Tải về file mẫu</div>
          </div>
          <div className='d-flex flex-column align-items-center gap-2'>
            <div>
              <label for='upload-photo' className='btn btn-primary'>
                <UploadOutlined />
              </label>
              <input
                type='file'
                name='photo'
                id='upload-photo'
                value={file}
                style={{ opacity: 0, position: "absolute", zIndex: -1 }}
                onChange={createBatchClassrooms}
              />
            </div>
            <div>Tải lên file dữ liệu</div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ClassroomUploadData;
