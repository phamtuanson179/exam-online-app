import reportAPI from "apis/reportAPI";
import { useEffect, useState } from "react";

const { Card, Row, Col, Typography } = require("antd");

const { Title } = Typography;

const TestedAmount = ({ classroomId, examId }) => {
  const [amount, setAmount] = useState();

  useEffect(() => {
    if (classroomId && examId) getTestedAmount();
  }, [classroomId, examId]);

  const getTestedAmount = async () => {
    await reportAPI
      .getTestedAmount({ classroomId: classroomId, examId: examId })
      .then((res) => {
        if (res?.data) {
          setAmount(res?.data);
        }
      });
  };
  return (
    <Card bordered={false} className='criclebox '>
      <div className='number'>
        <Row align='middle' gutter={[24, 0]}>
          <Col xs={18}>
            <span>Số học sinh đã thi</span>
            <Title level={3}>
              {amount ? amount : 0}
              {/* <small className={c.bnb}>{c.persent}</small> */}
            </Title>
          </Col>
          {/* <Col xs={6}>
              <div className='icon-box'>{c.icon}</div>
            </Col> */}
        </Row>
      </div>
    </Card>
  );
};

export default TestedAmount;
