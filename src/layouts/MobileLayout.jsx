import React from "react";
import { styled } from "styled-components";

const MOBILE_MODE_LIMIT = `892px`;

const MobileLayout = () => {
    return <MobileContainer>Mobile Mode Not Yet Implemented</MobileContainer>;
};

export const MobileContainer = styled.div`
    border-width: 2px;
    border: solid;
    border-color: darkgrey;
    display: flex;
    flex-direction: column;
    height: 100%;

    & > .desktop-row {
        display: flex;
        flex-direction: row;
        height: 100%;
    }
    @media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
        display: none;
    }
`;

export default MobileLayout;
