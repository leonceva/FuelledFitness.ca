import { styled } from "styled-components";
import Footer from "../components/Footer";

const MOBILE_MODE_LIMIT = `892px`;

export const DesktopLayout = (props) => {
    //const LeftSide = props.LeftSide;
    const content = props.content;
    //const RightSide = props.RightSide;

    return (
        <DesktopContainer>
            <div className="desktop-row">
                <DesktopLeftSide />
                <DesktopContent>{content}</DesktopContent>
                <DesktopRightSide />
            </div>
            <Footer />
        </DesktopContainer>
    );
};

export default DesktopLayout;

export const DesktopContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;

    & > .desktop-row {
        display: flex;
        flex-direction: row;
        height: 95%;
        align-items: center;
    }
    @media screen and (max-width: ${MOBILE_MODE_LIMIT}) {
        display: none;
    }
`;

export const DesktopLeftSide = styled.div`
    background-image: linear-gradient(to right, white, gray);
    height: 100%;
    width: 10%;
    border-style: solid;
    border-color: #333;
    border-width: 1px 0px;
`;
export const DesktopRightSide = styled.div`
    background-image: linear-gradient(to left, white, gray);
    height: 100%;
    width: 10%;
    border-style: solid;
    border-color: #333;
    border-width: 1px 0px;
`;

export const DesktopContent = styled.div`
    background-color: lightgray;
    height: 100%;
    width: 80%;
    text-align: center;
    border-style: solid;
    border-color: #333;
    border-width: 1px 0px;
`;
