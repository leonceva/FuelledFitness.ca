import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import useAuth from "../hooks/useAuth";
import ClientDashboard from "../components/ClientDashboard";
//import AdminDashboard from "../components/AdminDashboard";
import AdminDashboardDesktop from "../components/AdminDashboardDesktop";
import jwt_decode from "jwt-decode";

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
    const decoded = auth?.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined;

    const userRole = decoded?.User?.role || null;

    return (
        <DesktopDiv>
            {userRole === null && <LoginForm />}
            {userRole === "admin" && (
                <AdminDashboardDesktop user={decoded.User} />
            )}
            {userRole === "active" && <ClientDashboard />}
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
