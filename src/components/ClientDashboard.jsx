import useAuth from "../hooks/useAuth";

const ClientDashboard = () => {
    const { auth } = useAuth();

    return (
        <>
            <h1>Client Dashboard</h1>
            <h2>Welcome {auth.userEmail}</h2>
        </>
    );
};

export default ClientDashboard;
