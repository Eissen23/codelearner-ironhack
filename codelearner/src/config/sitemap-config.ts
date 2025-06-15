import { lazy } from "react";
import { RouteObject } from "react-router";
import { psOwnerLoader } from "./loader/psOwnerLoader";
import { courseOwnerLoader } from "./loader/courseOwnerLoader";
const SolutionCreate = lazy(() => import("../pages/CreatePage/SolutionCreate"));
const UserSolutionPage = lazy(
  () => import("../pages/DetailPage/UserSolutionPage")
);
const YourSolution = lazy(
  () => import("../components/dash-board/user/YourSolution")
);
const SolArticle = lazy(() => import("../pages/DetailPage/SolArticle"));
const NotAuthorize = lazy(() => import("../pages/NotAuthorize"));

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
const SubmissionPage = lazy(() => import("../pages/DetailPage/SubmissionPage"));
// const OrgMod = lazy(() => import("../components/dash-board/moderator/OrgMod"));
const CourseSettingPage = lazy(
  () => import("../pages/Setting/CourseSettingPage")
);
const ProblemSetSetting = lazy(
  () => import("../pages/Setting/ProblemSetSetting")
);
const AddArticle = lazy(() => import("../pages/CreatePage/AddArticle"));
const ArticleDetail = lazy(() => import("../pages/DetailPage/ArticleDetail"));
const AddProblem = lazy(() => import("../pages/CreatePage/AddProblem"));
const ProtectedRoutes = lazy(() => import("../context/routes/ProtectedRoute"));
const NotFound = lazy(() => import("../pages/NotFound"));
const YourCourse = lazy(
  () => import("../components/dash-board/user/YourEnrolledCourse")
);
const SettingMain = lazy(
  () => import("../components/dash-board/setting/SettingMain")
);
const ModeratingCourse = lazy(() => import("../pages/Mod/ModeratingCourse"));
const ModeratingProblemSet = lazy(
  () => import("../pages/Mod/ModeratingProblemSet")
);
const ArticleSettingPage = lazy(
  () => import("../pages/Setting/ArticleSettingPage")
);
const ProblemSettingPage = lazy(
  () => import("../pages/Setting/ProblemSettingPage")
);

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
      { path: "/orgs/:org_id", Component: OrgDetail },
    ],
  },

  {
    path: "/courses",
    children: [
      { index: true, Component: CoursePage },
      { path: "/courses/:course_id", Component: CourseDetail },
      {
        path: "/courses/:course_id/articles/:article_id",
        Component: ArticleDetail,
      },
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
    path: "/user/submissions/:user_sub_id",
    Component: SubmissionPage,
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
            path: "/dashboard/profile",
            Component: DashBoardRight,
          },
          {
            path: "/dashboard/your-submission",
            Component: YourSubmission,
          },
          {
            path: "/dashboard/your-course",
            Component: YourCourse,
          },
          {
            path: "/dashboard/your-solution",
            Component: YourSolution,
          },
          {
            path: "/dashboard/settings",
            Component: SettingMain,
          },
          {
            path: "org-manage",
            children: [
              {
                index: true,
                Component: DashBoardOrg,
              },
              {
                path: ":org_id",
                Component: OrgSetting,
              },
              {
                path: ":org_id/add-course",
                Component: AddCoursePage,
              },
              {
                path: ":org_id/add-problem-set",
                Component: AddProblemSetPage,
              },
            ],
          },
          {
            path: "/dashboard/course",
            Component: DashBoardCourse,
          },
          {
            path: "/dashboard/problemset",
            Component: DashBoardProblemSet,
          },

          // mod
          {
            path: "/dashboard/mod",
            children: [
              {
                path: "/dashboard/mod/problemset",
                Component: ModeratingProblemSet,
              },
              {
                path: "/dashboard/mod/course",
                Component: ModeratingCourse,
              },
            ],
          },
        ],
      },
      //
      {
        path: "/setting",
        children: [
          { index: true, Component: SettingMain },
          {
            path: "/setting/course/:course_id",
            children: [
              {
                index: true,
                loader: courseOwnerLoader,
                Component: CourseSettingPage,
              },
              {
                path: "add-article",
                Component: AddArticle,
              },
            ],
          },
          {
            path: "/setting/problem-set/:problemSetId",
            children: [
              {
                index: true,
                loader: psOwnerLoader,
                Component: ProblemSetSetting,
              },
              {
                path: "/setting/problem-set/:problemSetId/add-problem",
                Component: AddProblem,
              },
            ],
          },
          {
            path: "/setting/article/:article_id",
            children: [
              {
                index: true,
                Component: ArticleSettingPage,
              },
            ],
          },
          {
            path: "/setting/problem/:problem_id",
            children: [
              {
                index: true,
                Component: ProblemSettingPage,
              },
              {
                path: "/setting/problem/:problem_id/add-solution",
                Component: SolutionCreate,
              },
            ],
          },
          {
            path: "/setting/user-solution/:user_solution_id",
            children: [
              {
                index: true,
                Component: UserSolutionPage,
              },
            ],
          },
          {
            path: "/setting/solution-article/:sol_atricle_id",
            children: [
              {
                index: true,
                Component: SolArticle,
              },
            ],
          },
        ],
      },
    ],
  },
  { path: "*", Component: NotFound },
  { path: "/not-authorized", Component: NotAuthorize },
];

export default routes_map;
