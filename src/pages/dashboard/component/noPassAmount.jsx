import reportAPI from "apis/reportAPI";
import { useEffect, useState } from "react";

const { Card, Row, Col, Typography } = require("antd");

const { Title } = Typography;

const NoPassAmount = ({ classroomId, examId }) => {
  const [amount, setAmount] = useState();

  useEffect(() => {
    if (classroomId && examId) getNoPassAmount();
  }, [classroomId, examId]);

  const getNoPassAmount = async () => {
    await reportAPI
      .getNoPassAmount({ classroomId: classroomId, examId: examId })
      .then((res) => {
        setAmount(res?.data);
      });
  };

  return (
    <Card bordered={false} className='criclebox '>
      <div className='number'>
        <Row align='middle' gutter={[24, 0]}>
          <Col xs={18}>
            <span>Số bài thi chưa đạt</span>
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

export default NoPassAmount;
