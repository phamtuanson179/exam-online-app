import { lazy } from "react";

const UserManager = lazy(() => import("./pages/user-manager/index.js"));
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
    path: "/user-manager",
    component: () => <UserManager />,
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
