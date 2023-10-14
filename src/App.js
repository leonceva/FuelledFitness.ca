import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/Error";
import Homepage from "./routes/Homepage";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Services from "./routes/Services";
// import MyAccount from "./routes/MyAccount";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <ErrorPage />,
            children: [
                { index: true, element: <Navigate to="home" replace /> },
                {
                    path: "/home",
                    element: <Homepage />,
                },
                {
                    path: "/about",
                    element: <About />,
                },
                {
                    path: "/contact",
                    element: <Contact />,
                },
                {
                    path: "/services",
                    element: <Services />
                },
            ],
        },
    ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
