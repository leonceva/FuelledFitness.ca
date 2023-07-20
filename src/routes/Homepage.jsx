import React from "react";
import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";

const Homepage = () => {
    return (
        <>
            <DesktopLayout
                LeftSide={<p>Left Side</p>}
                RightSide={<p>Right Side</p>}
                Content={
                    <>
                        <h2>Home Page</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Incidunt, quis necessitatibus? In molestiae
                            labore eaque qui vitae facere dolore? Ipsam odit
                            deleniti obcaecati deserunt ab, rem esse sint minima
                            ad.
                        </p>
                    </>
                }
            />
            <MobileLayout />
        </>
    );
};

export default Homepage;
