import React from "react";
import { styled } from "styled-components";
import Footer from "../components/Footer";

const MOBILE_MODE_LIMIT = `892px`;

export const DesktopLayout = (props) => {
    const LeftSide = props.LeftSide;
    const Content = props.Content;
    const RightSide = props.RightSide;

    return (
        <DesktopContainer>
            <div className="desktop-row">
                <DesktopLeftSide>{LeftSide}</DesktopLeftSide>
                <DesktopContent>{Content}</DesktopContent>
                <DesktopRightSide>{RightSide}</DesktopRightSide>
            </div>
            <Footer />
        </DesktopContainer>
    );
};

export default DesktopLayout;

export const DesktopContainer = styled.div`
    border-width: 2px;
    border: solid;
    border-color: darkgrey;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100vw;
    position: relative;

    & > .desktop-row {
        display: flex;
        flex-direction: row;
        height: 100%;
        align-items: center;
    }
    @media screen and (max-width: ${MOBILE_MODE_LIMIT}) {
        display: none;
    }
`;

export const DesktopLeftSide = styled.div`
    background-color: lightgreen;
    height: 100%;
    width: 15%;
    text-align: center;
`;
export const DesktopRightSide = styled.div`
    background-color: lightgreen;
    height: 100%;
    width: 15%;
    text-align: center;
`;

export const DesktopContent = styled.div`
    background-color: lightcyan;
    height: 100%;
    width: 70%;
    text-align: center;
`;
