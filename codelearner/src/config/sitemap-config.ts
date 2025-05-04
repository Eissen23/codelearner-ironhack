import Code from "../pages/Code";
import Home from "../pages/Home";
import DashBoard from "../pages/DashBoard";
import ProtectedRoutes from "../context/routes/ProtectedRoute";
import MemberLogin from "../pages/member/MemberLogin";
import MemberRegister from "../pages/member/MemberRegister";
import Org from "../pages/Org/Org";
import CourseList from "../features/main/course/CourseList";
import ProblemSetList from "../features/main/problems/ProblemSetList";


const routes_map = [
    { 
        path: '/', 
        Component: Home
    },
    {
        path: '/login',
        Component: MemberLogin
    },
    {
        path: '/signup',
        Component: MemberRegister
    },
    {
        path: '/orgs',
        Component: Org
    },
    {
        path: '/courses',
        Component: CourseList
    },
    {
        path: '/problem-sets',
        Component: ProblemSetList
    },
    {   
        path: '/', 
        Component: ProtectedRoutes,
        children: [
            { 
                path: '/code', 
                Component: Code
            },
            { 
                path: '/dashboard', 
                Component: DashBoard
            }
        ]
    },
]

export default routes_map;