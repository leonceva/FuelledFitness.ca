import React from "react";
import { styled } from "styled-components";
import Footer from "../components/Footer";

const MOBILE_MODE_LIMIT = `892px`;

export const DesktopLayout = (props) => {
    const LeftSide = props.LeftSide;
    const content = props.content;
    const RightSide = props.RightSide;

    return (
        <DesktopContainer>
            <div className="desktop-row">
                <DesktopLeftSide>{LeftSide}</DesktopLeftSide>
                <DesktopContent>{content}</DesktopContent>
                <DesktopRightSide>{RightSide}</DesktopRightSide>
            </div>
            <Footer />
        </DesktopContainer>
    );
};

export default DesktopLayout;

export const DesktopContainer = styled.div`
    /*
    border: solid;
    border-width: 0 2px 0 2px;
    border-color: darkgrey;
    */
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;

    & > .desktop-row {
        display: flex;
        flex-direction: row;
        height: 92%;
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
