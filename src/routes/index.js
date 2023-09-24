import Home from "../pages/Home";
import Login from "../pages/Login";
import History from "../pages/History";
import Topic from "../pages/Topic";
import Register from "../pages/Register";
import Result from "../pages/Result";
import Quiz from "../pages/Quiz";
import Layout from "../Layout";
import Error from "../pages/Error";
import LogOut from "../pages/LogOut";

export const routes = [
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "logout",
                element: <LogOut/>
            },
            {
                path: "history",
                element: <History/>
            },
            {
                path: "topic",
                element: <Topic/>
            },
            {
                path: "register",
                element: <Register/>
            },
            {
                path: "result/:id",
                element: <Result/>
            },
            {
                path: "quiz/:id",
                element: <Quiz/>
            },
            {
                path: "*",
                element: <Error/>
            }
        ]
    }
]