import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import useAuth from "../hooks/useAuth";
import ClientDashboard from "../components/ClientDashboard";
import AdminDashboard from "../components/AdminDashboard";

const MyAccount = () => {
    return (
        <>
            <DesktopLayout content={<DesktopContent />} />
            <MobileLayout content={<MobileContent />} />
        </>
    );
};

export const DesktopContent = () => {
    const { auth } = useAuth();
    // console.log(`auth: ${JSON.stringify(auth)}`);

    if (auth.userEmail) {
        if (auth.userType === "admin") {
            return (
                <DesktopDiv>
                    <AdminDashboard />
                </DesktopDiv>
            );
        } else if (auth.userType === "active") {
            return (
                <DesktopDiv>
                    <ClientDashboard />
                </DesktopDiv>
            );
        }
    }

    return (
        <DesktopDiv>
            {auth.userType === "admin" && <AdminDashboard />}
            {auth.userType === "active" && <ClientDashboard />}
            {Object.keys(auth).length === 0 && <LoginForm />}
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
