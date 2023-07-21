import React from "react";
import { styled } from "styled-components";
import Footer from "../components/Footer";

const MOBILE_MODE_LIMIT = `892px`;

const MobileLayout = (props) => {
    const title = props.title;

    return (
        <MobileContainer>
            <div className="mobile-content">
                <h1>Mobile Mode</h1>
                <h2>{title}</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius explicabo quis ipsum, hic sunt accusamus maxime
                    assumenda, tenetur totam voluptatibus repellendus ex, animi
                    blanditiis. Eum voluptas suscipit ex! Quae, alias?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius explicabo quis ipsum, hic sunt accusamus maxime
                    assumenda, tenetur totam voluptatibus repellendus ex, animi
                    blanditiis. Eum voluptas suscipit ex! Quae, alias?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius explicabo quis ipsum, hic sunt accusamus maxime
                    assumenda, tenetur totam voluptatibus repellendus ex, animi
                    blanditiis. Eum voluptas suscipit ex! Quae, alias?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius explicabo quis ipsum, hic sunt accusamus maxime
                    assumenda, tenetur totam voluptatibus repellendus ex, animi
                    blanditiis. Eum voluptas suscipit ex! Quae, alias?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius explicabo quis ipsum, hic sunt accusamus maxime
                    assumenda, tenetur totam voluptatibus repellendus ex, animi
                    blanditiis. Eum voluptas suscipit ex! Quae, alias?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius explicabo quis ipsum, hic sunt accusamus maxime
                    assumenda, tenetur totam voluptatibus repellendus ex, animi
                    blanditiis. Eum voluptas suscipit ex! Quae, alias?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius explicabo quis ipsum, hic sunt accusamus maxime
                    assumenda, tenetur totam voluptatibus repellendus ex, animi
                    blanditiis. Eum voluptas suscipit ex! Quae, alias?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius explicabo quis ipsum, hic sunt accusamus maxime
                    assumenda, tenetur totam voluptatibus repellendus ex, animi
                    blanditiis. Eum voluptas suscipit ex! Quae, alias?
                </p>
            </div>
            <Footer />
        </MobileContainer>
    );
};

export const MobileContainer = styled.div`
    border: solid;
    border-width: 0 2px 0 2px;
    border-color: darkgrey;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100vw;
    position: relative;
    align-items: end;
    align-content: end;
    z-index: 0;

    @media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
        display: none;
    }

    & > .mobile-content {
        background-color: lightblue;
        height: auto;
        text-align: center;
        width: 100%;
        z-index: 0;
    }
`;

export default MobileLayout;
