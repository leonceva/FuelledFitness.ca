import React from "react";
import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";

const Homepage = () => {
    return (
        <>
            <DesktopLayout
                LeftSide={<p>Left Side</p>}
                RightSide={<p>Right Side</p>}
                content={<Content />}
            />
            <MobileLayout title={"Home"} />
        </>
    );
};

export default Homepage;

export const Content = () => {
    return <></>;
};
