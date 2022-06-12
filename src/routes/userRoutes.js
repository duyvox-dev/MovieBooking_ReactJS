import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFound from "../pages/NotFound/NotFound";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LayoutTheme from "../HOC/layout/LayoutTheme";
export const userRoutes = [
    {
        path: "/",
        component: <LayoutTheme Component={HomePage} />,
        exact: true,
    },
    {
        path: "/login",
        component: <LoginPage />,
    },
    {
        path: "/register",
        component: <RegisterPage />,
    },
    {
        path: "*",
        component: <NotFound />,
    },
];
