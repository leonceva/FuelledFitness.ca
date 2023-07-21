import React from "react";
import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";

const Homepage = () => {
    return (
        <>
            <DesktopLayout
                LeftSide={<p>Left Side</p>}
                RightSide={<p>Right Side</p>}
                title={"Home"}
            />
            <MobileLayout title={"Home"} />
        </>
    );
};

export default Homepage;
