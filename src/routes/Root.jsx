import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";

const Root = () => {
    return (
        <RootDiv>
            <div className="header">
                <Navbar />
            </div>

            <div className="body">
                <Outlet />
            </div>
        </RootDiv>
    );
};

export const RootDiv = styled.div`
    display: flex;
    flex-direction: column;
    height: 100dvh;

    & > .header {
        height: 133px;
    }
    & > .body {
        flex: 1;
    }
`;

export default Root;
