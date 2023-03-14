import "antd/dist/antd.min.css";
import "bootstrap/dist/css/bootstrap.css";
import StudentMain from "components/layout/StudentMain";
import Classroom from "pages/classroom";
import Exam from "pages/exam";
import Question from "pages/question";
import Result from "pages/result";
import SignIn from "pages/sign-in";
import StudentExam from "pages/student-exam";
import ListExams from "pages/student-list-exams";
import Subject from "pages/subject";
import User from "pages/user";
import { Route, Routes } from "react-router-dom";
import ProtectedRouter from "utils/ProtectedRouter";
import Main from "./components/layout/Main";
import Dashboard from "./pages/dashboard";
import "./styles/customs/style.scss";
import "./styles/main.scss";
import "./styles/responsive.scss";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='sign-in' element={<SignIn />} />

        <Route element={<ProtectedRouter />}>
          <Route path='manager' element={<Main />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='user' element={<User />} />
            <Route path='subject' element={<Subject />} />
            <Route path='classroom' element={<Classroom />} />
            <Route path='question' element={<Question />} />
            <Route path='exam' element={<Exam />} />
            <Route path='result' element={<Result />} />
          </Route>
        </Route>
        <Route element={<ProtectedRouter />}>
          <Route path='exam' element={<StudentMain />}>
            <Route path='list-exams' element={<ListExams />} />
            <Route path='' element={<StudentExam />} />
          </Route>
        </Route>
        <Route path='*' element={<SignIn />}></Route>
      </Routes>
      {/* <Switch>
        <Route exact path='/'>
          <Redirect to='/dashboard' />
        </Route>
        <Route path='/sign-in' component={SignIn} />
        <Route path='/sign-up' component={SignUp} />

        <Main>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/user' component={User} />
          <Route path='/subject' component={Subject} />
          <Route path='/classroom' component={Classroom} />
          <Route path='/question' component={Question} />
          <Route path='/exam' component={Exam} />
          <Route path='/result' component={Result} />
        </Main>

        <StudentMain>
          <Route path='/student/list-exams' component={StudentListExams} />
          <Route path='/student/exam' component={StudentExam} />
        </StudentMain>
      </Switch> */}
    </div>
  );
}

export default App;
