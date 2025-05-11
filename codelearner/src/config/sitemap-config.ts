import Code from "../pages/Code";
import Home from "../pages/Home";
import DashBoard from "../pages/DashBoard";
import ProtectedRoutes from "../context/routes/ProtectedRoute";
import MemberLogin from "../pages/member/MemberLogin";
import MemberRegister from "../pages/member/MemberRegister";
import Org from "../pages/Org/Org";
import CoursePage from "../pages/Org/CoursesPage";
import ProblemSetPage from "../pages/Org/ProblemSetPage";
import TestView from "../components/TestView";
import OrgDetail from "../pages/DetailPage/OrgDetail";
import CourseDetail from "../pages/DetailPage/CourseDetail";
import ProblemSetDetail from "../pages/DetailPage/ProblemSetDetail";
import ProblemsPage from "../pages/ListPage/ProblemsPage";
import DashBoardRight from "../components/dash-board/DashBoardRight";
import DashBoardOrg from "../components/dash-board/DashBoardOrg";
import DashBoardCourse from "../components/dash-board/DashBoardCourse";
import { Children } from "react";

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
  // Org
  {
    path: "/orgs",
    Component: Org,
  },
  {
    path: "/orgs/:id",
    Component: OrgDetail,
  },

  {
    path: "/courses",
    Component: CoursePage,
  },
  {
    path: "/courses/:course_id",
    Component: CourseDetail,
  },
  {
    path: "/problem-sets",
    Component: ProblemSetPage,
  },
  {
    path: "/problem-sets/:problem_set",
    Component: ProblemSetDetail,
  },
  {
    path: "/problems",
    Component: ProblemsPage,
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
        children: [
          {
            index: true,
            Component: DashBoardRight,
          },
          {
            path: "/dashboard/org-manage",
            children: [
              {
                index: true,
                Component: DashBoardOrg,
              },
              {
                path: "/dashboard/org-manage/:org",
                Component: DashBoardOrg,
              },
            ],
          },
          {
            path: "/dashboard/course",
            Component: DashBoardCourse,
          },
        ],
      },
    ],
  },
];

export default routes_map;
