import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.css";
import { lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./components/layout/Main";
import "./styles/customs/style.scss";
import "./styles/main.scss";
import "./styles/responsive.scss";

const User = lazy(() => import("pages/user"));
const Subject = lazy(() => import("pages/subject"));
const Classroom = lazy(() => import("pages/classroom"));
const Question = lazy(() => import("pages/question"));
const Exam = lazy(() => import("pages/exam"));
const Dashboard = lazy(() => import("./pages/Home.jsx"));
const SignIn = lazy(() => import("./pages/sign-in"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const StudentListExams = lazy(() => import("pages/student-list-exams/index"));
const StudentExam = lazy(() => import("pages/student-exam/index"));

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/dashboard' />
        </Route>
        <Route path='/sign-in' component={SignIn} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/student/list-exams' component={StudentListExams} />
        <Route path='/student/exam' component={StudentExam} />
        <Main>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/user' component={User} />
          <Route path='/subject' component={Subject} />
          <Route path='/classroom' component={Classroom} />
          <Route path='/question' component={Question} />
          <Route path='/exam' component={Exam} />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
