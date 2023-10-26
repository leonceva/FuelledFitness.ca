import React from "react";
import styled from "styled-components";
import { useState } from "react";

const PersistLoginInfo = () => {
    const [display, setDisplay] = useState(false);
    return (
        <PersistLoginInfoDiv className="persist-info">
            <i
                onMouseEnter={() => setDisplay(true)}
                onMouseLeave={() => setDisplay(false)}
                class="bi bi-info-circle"
            ></i>
            <div className={`${display ? "show" : "hidden"}`}>
                We recommend using this feature only on trusted devices.
            </div>
        </PersistLoginInfoDiv>
    );
};
export const PersistLoginInfoDiv = styled.div`
    margin-left: 0.5vw;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;

    & > .show {
        content-visibility: visible;
        position: absolute;
        border: 2px solid #333;
        left: 100%;
        margin-left: 1vw;
        max-height: 500%;
        width: 1000%;
        background-color: white;
        z-index: 2;
    }

    & > .hidden {
        content-visibility: hidden;
    }
`;

export default PersistLoginInfo;
