import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/Error";
import Homepage from "./routes/Homepage";
import AboutMe from "./routes/AboutMe";
import ContactMe from "./routes/ContactMe";
import Services from "./routes/Services";

function App() {
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
            });
        }
        return (_) => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root width={dimensions.width} />,
            errorElement: <ErrorPage />,
            children: [
                { index: true, element: <Navigate to="home" replace /> },
                {
                    path: "home",
                    element: <Homepage width={dimensions.width} />,
                },
                {
                    path: "aboutMe",
                    element: <AboutMe width={dimensions.width} />,
                },
                {
                    path: "contactMe",
                    element: <ContactMe width={dimensions.width} />,
                },
                {
                    path: "/services",
                    element: <Services width={dimensions.width} />
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
