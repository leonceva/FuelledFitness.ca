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
            <div className={`${display ? "show" : "hidden"}`}></div>
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
        position: absolute;
        border: 2px solid #333;
        left: 100%;
        margin-left: 1vw;
        max-height: 500%;
        background-color: white;
        z-index: 2;
        animation-name: show-info;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        padding: 0.3vh 0.3vw;

        &::after {
            content: "We recommend using this feature only on trusted devices.";
        }

        @keyframes show-info {
            0% {
                color: transparent;
                width: 0%;
                content-visibility: hidden;
            }
            30% {
                width: 1000%;
            }
            80% {
                color: black;
                content-visibility: show;
            }
            100% {
                width: 1000%;
            }
        }
    }

    & > .hidden {
        content-visibility: hidden;
    }
`;

export default PersistLoginInfo;
