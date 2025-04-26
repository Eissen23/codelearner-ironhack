import Code from "../pages/Code";
import Home from "../pages/Home";
import DashBoard from "../pages/DashBoard";
import ProtectedRoutes from "../context/routes/ProtectedRoute";
import MemberLogin from "../pages/member/MemberLogin";
import MemberRegister from "../pages/member/MemberRegister";

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