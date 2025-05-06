import Code from "../pages/Code";
import Home from "../pages/Home";
import DashBoard from "../pages/DashBoard";
import ProtectedRoutes from "../context/routes/ProtectedRoute";
import MemberLogin from "../pages/member/MemberLogin";
import MemberRegister from "../pages/member/MemberRegister";
import Org from "../pages/Org/Org";
import CoursePage from "../pages/Org/CoursesPage";
import ProblemSetPage from "../pages/Org/ProblemSetPage";
import { Component } from "react";
import TestView from "../components/TestView";

const routes_map = [
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: MemberLogin,
  },
  {
    path: "/signup",
    Component: MemberRegister,
  },
  {
    path: "/orgs",
    Component: Org,
  },
  {
    path: "/courses",
    Component: CoursePage,
  },
  {
    path: "/problem-sets",
    Component: ProblemSetPage,
  },
  {
    path: "/test-view",
    Component: TestView,
  },
  {
    path: "/",
    Component: ProtectedRoutes,
    children: [
      {
        path: "/code",
        Component: Code,
      },
      {
        path: "/dashboard",
        Component: DashBoard,
      },
    ],
  },
];

export default routes_map;
