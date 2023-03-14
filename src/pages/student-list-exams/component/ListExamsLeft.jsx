import { Card } from "antd";

const ListExamsLeft = ({ listExams, currentExam, setCurrentExam }) => {
  const renderListExam = () => {
    return listExams.map((exam, index) => (
      <button
        className={`btn w-100 ${currentExam?.index == index ? "btn-primary" : ""}`}
        onClick={(event) => {
          onClickExamButton(index);
        }}
      >
        {exam?.name}
      </button>
    ));
  };

  const onClickExamButton = (index) => {
    setCurrentExam(listExams[index]);
  };

  return (
    <>
      <Card title='Danh sách đề thi'>
        <div className='d-flex flex-column'>
          {listExams ? renderListExam() : ""}
        </div>
      </Card>
    </>
  );
};
export default ListExamsLeft;
