import React from "react";
import { styled } from "styled-components";

const Footer = () => {
    return <FooterDiv>Footer</FooterDiv>;
};

export const FooterDiv = styled.div`
    background-image: linear-gradient(to right, white, rgb(241, 124, 143));
    border: solid;
    border-width: 2px 0 2px 0;
    border-color: darkgrey;
    display: flex;
    justify-content: start;
    align-items: center;
    height: 8%;
    justify-content: center;
    width: 100%;
`;

export default Footer;
