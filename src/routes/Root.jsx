import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Root(props) {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
}

export default Root;
