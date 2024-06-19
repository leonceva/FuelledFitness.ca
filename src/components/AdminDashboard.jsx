import React from 'react';
import useLogout from '../hooks/useLogout';
import useAuth from '../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';
import styled from 'styled-components';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE_LIMIT;

const AdminDashboard = () => {
	const logout = useLogout();

	const { auth } = useAuth();
	const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;

	const firstName = decoded?.User?.firstName || null;
	const lastName = decoded?.User?.lastName || null;

	return (
		<>
			<h2>Admin Dashboard</h2>
			<h3>User: {`${firstName} ${lastName}`}</h3>
			<div
				className='btn'
				onClick={async () => {
					await logout();
				}}>
				Logout
			</div>
		</>
	);
};

export default AdminDashboard;

export const DesktopDiv = styled.div`
	// Hide for mobile size
	@media screen and ((max-width: ${MOBILE_MODE_LIMIT}) or (width: ${MOBILE_MODE_LIMIT})) {
		display: none;
	}
`;
