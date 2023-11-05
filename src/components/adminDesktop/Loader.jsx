import styled from "styled-components";

import loaderImg from "../../images/loader.svg";

const Loader = () => {
    return (
        <Loading>
            <h1>Loading</h1>
            <img className="loader" alt="loader" src={loaderImg} />
        </Loading>
    );
};

export const Loading = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 3;
    background-color: lightgray;
    opacity: 0.5;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: start;
    border-top-right-radius: calc(min(3vw, 3vh));
    border-bottom-right-radius: calc(min(3vw, 3vh));

    & h1 {
        margin: 3vh 0.5vw 0;
        height: 10%;
        font-stretch: expanded;
    }

    & > .loader {
        margin-top: calc(3vh + 1%);
        margin-left: 1vw;
        height: 8%;
        animation-name: spin;
        animation-duration: 1.5s;
        animation-delay: 0s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }
    @keyframes spin {
        0% {
            transform: rotate(0turn);
        }
        25% {
            transform: rotate(0.25turn);
        }
        50% {
            transform: rotate(0.5turn);
        }
        75% {
            transform: rotate(0.75turn);
        }
        100% {
            transform: rotate(1turn);
        }
    }
`;

export default Loader;
