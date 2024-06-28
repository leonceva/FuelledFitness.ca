import React from 'react';
import useLogout from '../hooks/useLogout';
import useAuth from '../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';

const ClientDashboard = () => {
	const logout = useLogout();

	const { auth } = useAuth();
	const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;

	const firstName = decoded?.User?.firstName || null;
	const lastName = decoded?.User?.lastName || null;

	return (
		<>
			<h2>Active Client Dashboard</h2>
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

export default ClientDashboard;
