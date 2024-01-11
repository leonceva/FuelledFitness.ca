import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import useAuth from '../hooks/useAuth';
import ClientDashboard from '../components/ClientDashboard';
import AdminDashboard from '../components/AdminDashboard';
import { jwtDecode } from 'jwt-decode';
import Footer from '../components/Footer';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE_LIMIT;

const MyAccount = () => {
	const { auth } = useAuth();
	const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
	const userRole = decoded?.User?.role || null;
	return (
		<Div>
			<div className='layout'>
				{userRole === null && <LoginForm />}
				{userRole === 'admin' && <AdminDashboard />}
				{userRole === 'active' && <ClientDashboard user={decoded.User} />}
			</div>
			<Footer />
		</Div>
	);
};

export const Div = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	justify-content: start;
	align-items: center;

	& > .layout {
		@media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
			// Desktop
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 100%;
			background-image: linear-gradient(to right, gray, #f0e9df 10%, #f0e9df 90%, gray);
		}

		// Mobile
		@media screen and ((max-width: ${MOBILE_MODE_LIMIT} )or (width: ${MOBILE_MODE_LIMIT})) {
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;
			width: 100%;
			height: 100%;
			z-index: 0;
			background-image: linear-gradient(to right, white, lightgray, white);
			overflow-y: hidden;
		}
	}
`;

export default MyAccount;
