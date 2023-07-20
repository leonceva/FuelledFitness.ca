import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";

function Root(props) {
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
}

export const RootDiv = styled.div`
    display: flex;
    flex-direction: column;

    & > .header {
        height: 20vh;
    }
    & > .body {
        height: 80vh;
    }
`;

export default Root;
