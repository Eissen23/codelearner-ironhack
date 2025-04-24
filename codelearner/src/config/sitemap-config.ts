import Code from "../pages/Code";
import Home from "../pages/Home";
import { requireAuth } from "./loader";

const routes_map = [
    { path: '/', Component: Home},
    { path: '/code', Component: Code, loader: requireAuth },
]

export default routes_map;