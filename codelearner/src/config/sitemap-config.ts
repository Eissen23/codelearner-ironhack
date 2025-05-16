import { lazy } from "react";
import { RouteObject } from "react-router";

// Lazy-loaded components
const Home = lazy(() => import("../pages/Home"));
const MemberLogin = lazy(() => import("../pages/member/MemberLogin"));
const MemberRegister = lazy(() => import("../pages/member/MemberRegister"));
const Org = lazy(() => import("../pages/Org/Org"));
const OrgDetail = lazy(() => import("../pages/DetailPage/OrgDetail"));
const CoursePage = lazy(() => import("../pages/Org/CoursesPage"));
const CourseDetail = lazy(() => import("../pages/DetailPage/CourseDetail"));
const ProblemSetPage = lazy(() => import("../pages/Org/ProblemSetPage"));
const ProblemSetDetail = lazy(
  () => import("../pages/DetailPage/ProblemSetDetail")
);
const ProblemsPage = lazy(() => import("../pages/ListPage/ProblemsPage"));
const ProblemDetail = lazy(() => import("../pages/DetailPage/ProblemDetail"));
const TestView = lazy(() => import("../components/TestView"));
const Code = lazy(() => import("../pages/Code"));
const DashBoard = lazy(() => import("../pages/DashBoard"));
const DashBoardRight = lazy(
  () => import("../components/dash-board/DashBoardRight")
);
const DashBoardOrg = lazy(
  () => import("../components/dash-board/head/DashBoardOrg")
);
const DashBoardCourse = lazy(
  () => import("../components/dash-board/head/DashBoardCourse")
);
const DashBoardProblemSet = lazy(
  () => import("../components/dash-board/head/DashBoardProblemSet")
);
const OrgSetting = lazy(
  () => import("../components/dash-board/setting/OrgSetting")
);
const AddCoursePage = lazy(() => import("../pages/OrgHead/AddCoursePage"));
const AddProblemSetPage = lazy(
  () => import("../pages/OrgHead/AddProblemSetPage")
);
const YourSubmission = lazy(
  () => import("../components/dash-board/user/YourSubmission")
);
const OrgMod = lazy(() => import("../components/dash-board/moderator/OrgMod"));
const CourseSettingPage = lazy(
  () => import("../pages/Setting/CourseSettingPage")
);
const ProblemSetSetting = lazy(
  () => import("../pages/Setting/ProblemSetSetting")
);
const AddArticle = lazy(() => import("../pages/CreatePage/AddArticle"));
const AddProblem = lazy(() => import("../pages/CreatePage/AddProblem"));
const ProtectedRoutes = lazy(() => import("../context/routes/ProtectedRoute"));
import NotFound from "../pages/NotFound";

const routes_map: RouteObject[] = [
  { path: "/", Component: Home },
  { path: "/login", Component: MemberLogin },
  { path: "/signup", Component: MemberRegister },
  { path: "/code", Component: Code },
  // Org
  {
    path: "/orgs",
    children: [
      { index: true, Component: Org },
      { path: "/orgs/:id", Component: OrgDetail },
    ],
  },

  {
    path: "/courses",
    children: [
      { index: true, Component: CoursePage },
      { path: "/courses/:course_id", Component: CourseDetail },
    ],
  },

  {
    path: "/problem-sets",
    children: [
      { index: true, Component: ProblemSetPage },
      { path: "/problem-sets/:problem_set", Component: ProblemSetDetail },
    ],
  },

  {
    path: "/problems",
    children: [
      { index: true, Component: ProblemsPage },
      { path: "/problems/:problem_id", Component: ProblemDetail },
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

          // mod
          {
            path: "/dashboard/mod/org/:org_id",
            Component: OrgMod,
          },
        ],
      },
      //
      {
        path: "/setting",
        children: [
          { index: true, Component: CourseSettingPage },
          {
            path: "/setting/course/:course_id",
            children: [
              { index: true, Component: CourseSettingPage },
              {
                path: "/setting/course/:course_id/add-article",
                Component: AddArticle,
              },
            ],
          },
          {
            path: "/setting/problem-set/:problemSetId",
            children: [
              { index: true, Component: ProblemSetSetting },
              {
                path: "/setting/problem-set/:problemSetId/add-problem",
                Component: AddProblem,
              },
            ],
          },
        ],
      },
    ],
  },
  { path: "*", Component: NotFound },
];

export default routes_map;
