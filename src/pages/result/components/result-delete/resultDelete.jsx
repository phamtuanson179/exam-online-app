import { DeleteOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm } from "antd";
import classroomAPI from "apis/classroomAPI";

const ResultDelete = ({
  classroomElement,
  setIsRefreshData,
  isRefreshData,
}) => {
  const confirmDelete = async () => {
    await classroomAPI.delete({ id: classroomElement?._id }).then((res) => {
      message.success("Xóa lớp học thành công!");
      setIsRefreshData(!isRefreshData);
    });
  };

  return (
    <Popconfirm
      title='Bạn có muốn xóa lớp học này không?'
      onConfirm={confirmDelete}
      okText='Xác nhận'
      cancelText='Hủy'
    >
      <Button className='btn btn-danger'>
        <DeleteOutlined />
      </Button>
    </Popconfirm>
  );
};
export default ResultDelete;
