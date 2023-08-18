import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/Error";
import Homepage from "./routes/Homepage";
import AboutMe from "./routes/AboutMe";
import ContactMe from "./routes/ContactMe";
import Services from "./routes/Services";

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
                    path: "/aboutMe",
                    element: <AboutMe />,
                },
                {
                    path: "/contactMe",
                    element: <ContactMe/>,
                },
                {
                    path: "/services",
                    element: <Services />
                }
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
