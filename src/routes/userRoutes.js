import HomePage from "../pages/HomePage/HomePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import NotFound from "../pages/NotFound/NotFound";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
export const userRoutes = [
    {
        path: "/",
        component: <HomePage />,
        exact: true,
    },
    {
        path: "/sign-in",
        component: <SignInPage />,
    },
    {
        path: "/sign-up",
        component: <SignUpPage />,
    },
    {
        path: "*",
        component: <NotFound />,
    },
];
