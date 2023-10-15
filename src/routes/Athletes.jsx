import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";
import styled from "styled-components";

const Athletes = () => {
    return (
        <>
            <DesktopLayout content={<DesktopContent />} />
            <MobileLayout content={<MobileContent />} />
        </>
    );
};

export const DesktopContent = () => {
    return (
        <>
            <DesktopDiv></DesktopDiv>
        </>
    );
};

export const DesktopDiv = styled.div`
    height: calc(100% - 2vh);
    margin: 1vh 0;
`;

export const MobileContent = () => {
    return <></>;
};

export default Athletes;
