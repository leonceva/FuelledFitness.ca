import { useState, useEffect } from 'react';
import useLogout from '../hooks/useLogout';
import useAuth from '../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';
import styled from 'styled-components';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE_LIMIT;

const AdminDashboard = () => {
	const { auth } = useAuth();
	const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;

	const logout = useLogout();

	const [optionSelected, setOptionSelected] = useState('New Program');

	const handleOption = (option) => {
		setOptionSelected(option);
		sessionStorage.setItem('optionSelected', JSON.stringify(option));
	};

	const [buttonOptions, setButtonOptions] = useState(null);

	const firstName = decoded?.User?.firstName || null;
	const lastName = decoded?.User?.lastName || null;

	useEffect(() => {
		if (optionSelected === 'New Program' || optionSelected === 'Edit Program') {
			setButtonOptions('Programs');
		}
		if (optionSelected === 'New User' || optionSelected === 'Edit User') {
			setButtonOptions('Users');
		}
	}, [optionSelected]);

	return (
		<>
			<DesktopDiv>
				<div className='dashboard'>
					<div className='menu'>
						<div
							className='login-info'
							onClick={() => {
								handleOption('Account');
							}}></div>
						<div className='options'></div>
						<div className='logout'></div>
					</div>
					<div className='selected'>{optionSelected}</div>
				</div>
			</DesktopDiv>
			<MobileDiv>
				<h2>Admin Dashboard</h2>
				<h3>User: {`${firstName} ${lastName}`}</h3>
				<div
					className='btn'
					onClick={async () => {
						await logout();
					}}>
					Logout
				</div>
			</MobileDiv>
		</>
	);
};

export default AdminDashboard;

export const DesktopDiv = styled.div`
	// Display for desktop size
	@media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
		width: 100%;
		height: calc(100vh - 100px);
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: fixed;
		color: white;

		& > .dashboard {
			width: calc(100% - 6px);
			height: calc(100% - 6px);
			background-color: #d2d2d2;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;

			& > .menu {
				width: calc(30% - 6px);
				height: 100%;
				background-color: black;
				position: relative;
				display: flex;
				flex-direction: column;
				justify-content: start;
				align-items: center;

				& > .login-info {
					flex: 2;
					width: 100%;
					border-style: solid;
					border-width: 0 0 2px;
					border-color: #d2d2d2;
				}

				& > .options {
					flex: 7;
					width: 100%;
					overflow-y: scroll;
					display: flex;
					flex-direction: column;
					justify-content: start;
					align-items: center;
				}

				& > .logout {
					flex: 1;
					width: 100%;
					border-style: solid;
					border-width: 2px 0 0;
					border-color: #d2d2d2;
				}
			}

			& > .selected {
				width: calc(70% - 3px);
				height: 100%;
				background-color: black;
			}
		}
	}
	// Hide for mobile size
	@media screen and ((max-width: ${MOBILE_MODE_LIMIT}) or (width: ${MOBILE_MODE_LIMIT})) {
		display: none;
	}
`;

export const MobileDiv = styled.div`
	// Display for mobile size
	@media screen and ((max-width: ${MOBILE_MODE_LIMIT}) or (width: ${MOBILE_MODE_LIMIT})) {
	}
	// Hide for desktop size
	@media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
		display: none;
	}
`;
