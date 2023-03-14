import { Button, Col, Form, Input, Layout, Row, Typography } from "antd";
import authAPI from "apis/authAPI";
import userAPI from "apis/userAPI";
import { ROLE } from "constants/types";
import { useNavigate } from "react-router-dom";
import signinbg from "../../../assets/images/img-signin.jpg";
import { useEffect } from "react";

const { Title } = Typography;
const { Content } = Layout;

const SignIn = () => {
  const [signInForm] = Form.useForm();
  const navigate = useNavigate();

  useEffect(()=>{ 
    const rawData = localStorage.getItem("currentUser");
    if(rawData){
      const currentUser = JSON.parse(rawData)
      if (currentUser?.role === ROLE.STUDENT.code) {
        navigate("/exam/list-exams", { replace: true });
      } else if (currentUser?.role === ROLE.ADMIN.code) {
        navigate("/manager/user", { replace: true });
      } else {
        navigate("/manager/dashboard", { replace: true });
      }
    }
  },[])

  const onFinish = async (values) => {
    const body = values;
    await authAPI.login(body).then(async (res) => {
      localStorage.setItem("token", res.access_token);
      await userAPI.getCurrentUser().then((res) => {
        localStorage.setItem("currentUser", JSON.stringify(res?.data));
        if (res.data?.role === ROLE.STUDENT.code) {
          navigate("/exam/list-exams", { replace: true });
        } else if (res.data?.role === ROLE.ADMIN.code) {
          navigate("/manager/user", { replace: true });
        } else {
          navigate("/manager/dashboard", { replace: true });
        }
      });
    });
  };

  return (
    <>
      <Layout
        className='layout-default layout-signin'
        style={{ minHeight: "100vh" }}
      >
        <Content className='signin d-flex justify-content-center alidn-items-center'>
          <Row gutter={[24, 0]} justify='space-around'>
            <Col xs={{ span: 24, offset: 0 }} md={{ span: 12, offset: 2 }}>
              <Title className='mb-15'>Đăng nhập</Title>
              <Title className='font-regular text-muted' level={5}>
                Nhập email và mật khẩu của bạn để đăng nhập
              </Title>
              <Form
                onFinish={onFinish}
                form={signInForm}
                layout='vertical'
                className='row-col'
              >
                <Form.Item
                  className='username'
                  label='Email'
                  name='email'
                  rules={[
                    {
                      required: true,
                      message: "Trường này bắt buộc!",
                    },
                  ]}
                >
                  <Input placeholder='Email' />
                </Form.Item>

                <Form.Item
                  className='username'
                  label='Mật khẩu'
                  name='password'
                  type='password'
                  rules={[
                    {
                      required: true,
                      message: "Trường này bắt buộc!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Mật khẩu" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type='primary'
                    htmlType='submit'
                    style={{ width: "100%" }}
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col
              className='sign-img d-none d-md-block'
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              md={{ span: 10 }}
            >
              <img src={signinbg} alt='' />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default SignIn;
