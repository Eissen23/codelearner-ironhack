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
import DashBoardOrg from "../components/dash-board/head/DashBoardOrg";
import DashBoardCourse from "../components/dash-board/head/DashBoardCourse";
import SimpleOutlet from "../components/SimpleOutlet";
import ProblemDetail from "../pages/DetailPage/ProblemDetail";
import OrgSetting from "../components/dash-board/head/OrgSetting";
import AddCoursePage from "../pages/OrgHead/AddCoursePage";
import AddProblemSetPage from "../pages/OrgHead/AddProblemSetPage";
import DashBoardProblemSet from "../components/dash-board/head/DashBoardProblemSet";
import CourseSettingPage from "../pages/Setting/CourseSettingPage";
import ProblemSetSetting from "../pages/Setting/ProblemSetSetting";
import YourSubmission from "../components/dash-board/user/YourSubmission";

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
    component: SimpleOutlet,
    children: [
      {
        index: true,
        Component: ProblemSetPage,
      },
      {
        path: "/problem-sets/:problem_set",
        Component: ProblemSetDetail,
      },
    ],
  },

  {
    path: "/problems",
    Component: SimpleOutlet,
    children: [
      {
        index: true,
        Component: ProblemsPage,
      },
      {
        path: "/problems/:problem_id",
        Component: ProblemDetail,
      },
    ],
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
      // dashboard
      {
        path: "/dashboard",
        Component: DashBoard,
        children: [
          {
            index: true,
            Component: DashBoardRight,
          },
          {
            path: "/dashboard/head/org-manage",
            children: [
              {
                index: true,
                Component: DashBoardOrg,
              },
              {
                path: "/dashboard/head/org-manage/:org_id",
                Component: OrgSetting,
              },
              {
                path: "/dashboard/head/org-manage/:org_id/add-course",
                Component: AddCoursePage,
              },
              {
                path: "/dashboard/head/org-manage/:org_id/add-problem-set",
                Component: AddProblemSetPage,
              },
            ],
          },
          {
            path: "/dashboard/head/course",
            Component: DashBoardCourse,
          },
          {
            path: "/dashboard/head/problemset",
            Component: DashBoardProblemSet,
          },

          {
            path: "/dashboard/your-submission",
            Component: YourSubmission,
          },
        ],
      },
      //
      {
        path: "/setting",
        component: SimpleOutlet,
        children: [
          { index: true, component: CourseSettingPage },
          {
            path: "/setting/course/:course_id",
            Component: CourseSettingPage,
          },
          {
            path: "/setting/problem-set/:problemSetId",
            Component: ProblemSetSetting,
          },
        ],
      },
    ],
  },
];

export default routes_map;
