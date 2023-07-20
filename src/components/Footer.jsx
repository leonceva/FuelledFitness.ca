import React from "react";
import { styled } from "styled-components";

const Footer = () => {
    return <FooterDiv>Footer</FooterDiv>;
};

export const FooterDiv = styled.div`
    background-image: linear-gradient(to right, white, rgb(241, 124, 143));
    border: solid;
    border-color: darkgrey;
    display: flex;
    justify-content: start;
    align-items: center;
    height: 8%;
    padding: 10px;
    justify-content: center;
`;

export default Footer;
