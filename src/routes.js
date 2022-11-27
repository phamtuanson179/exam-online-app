import { lazy } from "react";

const User = lazy(() => import("pages/user"));
const Subject = lazy(() => import("pages/subject"));
const Question = lazy(() => import("pages/question"));
const Exam = lazy(() => import("pages/exam"));
const Dashboard = lazy(() => import("./pages/Home.jsx"));
const SignIn = lazy(() => import("./pages/SignIn.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
// const UserManager = lazy(()=>import("./pages/Home"))

const routes = [
  {
    path: "/dashboard",
    component: () => <Dashboard />,
    isInMain: true,
  },
  {
    path: "/user",
    component: () => <User />,
    isInMain: true,
  },
  {
    path: "/subject",
    component: () => <Subject />,
    isInMain: true,
  },
  {
    path: "/question",
    component: () => <Question />,
    isInMain: true,
  },
  {
    path: "/exam",
    component: () => <Exam />,
    isInMain: true,
  },
  {
    path: "/sign-in",
    component: () => <SignIn />,
    isInMain: false,
  },
  {
    path: "/sign-up",
    component: () => <SignUp />,
    isInMain: false,
  },
];

export default routes;
