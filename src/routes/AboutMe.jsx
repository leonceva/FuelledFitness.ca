import React from "react";
import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";

const AboutMe = () => {
    return (
        <>
            <DesktopLayout
                LeftSide={<p>Left Side</p>}
                RightSide={<p>Right Side</p>}
                title={"About Me"}
            />
            <MobileLayout title={"About Me"} />
        </>
    );
};

export default AboutMe;
