import React from "react";
import { styled } from "styled-components";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTopButton";

const MOBILE_MODE_LIMIT = `892px`;

const MobileLayout = (props) => {
    const content = props.content;

    return (
        <MobileContainer>
            <div className="mobile-content">{content}</div>
            <BackToTop />
            <Footer />
        </MobileContainer>
    );
};

export const MobileContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    position: relative;
    align-items: end;
    align-content: end;
    z-index: 0;

    @media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
        display: none;
    }

    & > .mobile-content {
        background-image: linear-gradient(to right, white, lightgray, white);
        height: auto;
        text-align: center;
        width: 100%;
        z-index: 0;
        height: 92%;
        border-color: #333;
        border-style: solid;
        border-width: 0.2vh 0;
    }
`;

export default MobileLayout;
