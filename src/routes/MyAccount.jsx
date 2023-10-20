import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import { useOutletContext } from "react-router-dom";

const MyAccount = () => {
    const test = useOutletContext();
    console.log(test);
    return (
        <>
            <DesktopLayout content={<DesktopContent />} />
            <MobileLayout content={<MobileContent />} />
        </>
    );
};

export const DesktopContent = () => {
    return (
        <DesktopDiv>
            <LoginForm />
        </DesktopDiv>
    );
};

export const DesktopDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export const MobileContent = () => {
    return <>In development..</>;
};

export default MyAccount;
