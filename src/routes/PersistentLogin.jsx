import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const PersistentLogin = () => {
    const [isLoading, setIsLoading] = useState(true);

    const test = "testing ";
    return (
        <>
            <Outlet context={test} />
        </>
    );
};

export default PersistentLogin;
