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
import { getOrgsDetail } from "../service/api/org-manage/getOrgDetail";
import OrgDetail from "../pages/DetailPage/OrgDetail";

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
