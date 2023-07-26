import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";

const Services = (props) => {
    const [serviceSelected, setServiceSelected] = useState("None");
    const location = useLocation();

    useEffect(() => {
        if (location.hash.slice(1) === "") {
            setServiceSelected("None");
        } else {
            setServiceSelected(location.hash.slice(1));
        }
    }, [location]);

    return (
        <>
            <DesktopLayout
                LeftSide={<p>Left Side</p>}
                RightSide={<p>Right Side</p>}
                content={<Content serviceSelected={serviceSelected} />}
            />
            <MobileLayout title={"Services"} />
        </>
    );
};

export default Services;

export const Content = (props) => {
    const serviceSelected = props.serviceSelected;
    return <>{serviceSelected}</>;
};
