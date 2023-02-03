import { Button, Col, Form, Input, Layout, Row, Typography } from "antd";
import signinbg from "../../../assets/images/img-signin.jpg";
import authAPI from "apis/authAPI";
import { useHistory } from "react-router-dom";
import userAPI from "apis/userAPI";
import { ROLE } from "constants/types";

const { Title } = Typography;
const { Content } = Layout;

const SignIn = () => {
  const [signInForm] = Form.useForm();
  const history = useHistory();

  const onFinish = async (values) => {
    const body = values;
    await authAPI.login(body).then(async (res) => {
      console.log({ res });
      localStorage.setItem("token", res.access_token);
      await userAPI.getCurrentUser().then((res) => {
        console.log(res);
        localStorage.setItem("currentUser",JSON.stringify(res?.data));
        if (res.data.role === ROLE.STUDENT.code) {
          history.push("student/list-exams");
        } else {
          history.push("dashboard");
        }
      });
    });
  };

  return (
    <>
      <Layout
        className='layout-default layout-signin'
        style={{ height: "100vh" }}
      >
        <Content className='signin d-flex justify-content-center alidn-items-center'>
          <Row gutter={[24, 0]} justify='space-around'>
            <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 2 }}>
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
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder='Email' />
                </Form.Item>

                <Form.Item
                  className='username'
                  label='Password'
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input placeholder='Password' />
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
              className='sign-img'
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 10 }}
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
