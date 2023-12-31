import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';

const ClientDashboard = () => {
	const { auth } = useAuth();
	const logout = useLogout();

	return (
		<>
			<h1>Client Dashboard</h1>
			<h2>Welcome {auth.userEmail}</h2>
			<button
				onClick={async () => {
					await logout();
				}}>
				Logout
			</button>
		</>
	);
};

export default ClientDashboard;
