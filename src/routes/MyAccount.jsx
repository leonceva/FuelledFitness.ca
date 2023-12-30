import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import useAuth from '../hooks/useAuth';
import ClientDashboard from '../components/ClientDashboard';
import AdminDashboard from '../components/AdminDashboard';
import { jwtDecode } from 'jwt-decode';

const MyAccount = () => {
	const { auth } = useAuth();
	const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
	const userRole = decoded?.User?.role || null;
	return (
		<Div>
			<div className='layout'>
				{userRole === null && <LoginForm />}
				{userRole === 'admin' && <AdminDashboard />}
				{userRole === 'active' && <ClientDashboard />}
			</div>
		</Div>
	);
};

export const Div = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	background-image: linear-gradient(to right, gray, #f0e9df 10%, #f0e9df 90%, gray);

	& > .layout {
		// Desktop
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;

		// Mobile
	}
`;

export default MyAccount;
