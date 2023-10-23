import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import AuthContext from "../context/AuthProvider";
import { useContext } from "react";
import useRefreshToken from "../hooks/useRefreshToken";

const MyAccount = () => {
    return (
        <>
            <DesktopLayout content={<DesktopContent />} />
            <MobileLayout content={<MobileContent />} />
        </>
    );
};

export const DesktopContent = () => {
    const { auth } = useContext(AuthContext);
    const refresh = useRefreshToken();
    return (
        <DesktopDiv>
            {/* {auth.userEmail ? (
                <div>
                    <h2>Logged in as: {auth.userEmail}</h2>
                </div>
            ) : (
                <LoginForm />
            )} */}
            <LoginForm />
            <br />
            <button
                onClick={() => {
                    refresh();
                }}
            >
                Refresh
            </button>
            <br />
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
