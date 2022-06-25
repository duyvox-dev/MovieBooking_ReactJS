import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFound from "../pages/NotFound/NotFound";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LayoutTheme from "../HOC/layout/LayoutTheme";
import MovieDetailPage from "../pages/MovieDetailPage/MovieDetailPage";
import PurchasePage from "../pages/PurchasePage/PurchasePage";
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
        path: "/detail/:id",
        component: <LayoutTheme Component={MovieDetailPage} />,
    },
    {
        path: "/purchase/:id",
        component: <LayoutTheme Component={PurchasePage} />,
    },

    {
        path: "*",
        component: <LayoutTheme Component={NotFound} />,
    },
];
