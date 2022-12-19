import { Card } from "antd";

const ListExamsLeft = ({ listExams, currentExam, setCurrentExam }) => {
  const renderListExam = () => {
    return listExams.map((exam, index) => (
      <button
        className={`btn ${"btn-primary" ? currentExam?.index == index : ""}`}
        onClick={(event) => {
          console.log({ index });
          onClickExamButton(index);
        }}
      >
        {exam?.name}
      </button>
    ));
  };

  const onClickExamButton = (index) => {
    console.log(listExams, index);
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
