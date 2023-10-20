import React from "react";
import { Outlet } from "react-router-dom";

const PersistentLogin = () => {
    const test = "testing ";
    return (
        <>
            <Outlet context={test} />
        </>
    );
};

export default PersistentLogin;
