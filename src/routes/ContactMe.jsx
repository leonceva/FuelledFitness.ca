import React from "react";
import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";

const ContactMe = () => {
    return (
        <>
            <DesktopLayout
                LeftSide={<p>Left Side</p>}
                RightSide={<p>Right Side</p>}
                title={"Contact Me"}
            />
            <MobileLayout title={"Contact Me"} />
        </>
    );
};

export default ContactMe;
