import Home from "../pages/Home";
import About from "../pages/About";
import Studios from "../pages/Studios";
import Login from "../pages/Login";

const publicRoute = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/about',
        component: About,
        exact: true,
    },
    {
        path: '/studios',
        component: Studios,
        exact: true,
    },
    {
        path: '/login',
        component: Login,
        exact: true,
    },
]
export default publicRoute;
