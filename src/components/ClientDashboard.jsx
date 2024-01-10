import useLogout from '../hooks/useLogout';
import { useState } from 'react';
import styled from 'styled-components';
import MyAccount from './client/MyAccount';
import Programs from './client/Programs';
import useAuth from '../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE_LIMIT;

const ClientDashboard = (props) => {
	const { auth } = useAuth();
	const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
	const user = decoded?.User;

	const logout = useLogout();

	const [optionSelected, setOptionSelected] = useState('Programs');

	const handleOption = (option) => {
		setOptionSelected(option);
	};

	const firstName = user.firstName || null;
	const lastName = user.lastName || null;

	return (
		<>
			<MobileDiv>
				<div className='header'>
					<span
						className={`option ${optionSelected === 'Programs' ? 'selected' : ''}`}
						onClick={() => {
							handleOption('Programs');
						}}>
						Programs
					</span>
					<span
						className={`option ${optionSelected === 'My Account' ? 'selected' : ''}`}
						onClick={() => {
							handleOption('My Account');
						}}>
						{`${firstName?.charAt(0)}. ${
							lastName?.length > 8 ? lastName.slice(0, 8) + '.' : lastName
						}`}
						<i
							className='bi bi-person-circle'
							style={{ paddingLeft: '0.5em' }}
						/>
					</span>
					<span
						className='option'
						onClick={async () => {
							await logout();
						}}>
						Logout
						<i
							className='bi bi-box-arrow-right'
							style={{ paddingLeft: '0.5em' }}
						/>
					</span>
				</div>
				<div className='option-selected'>
					{optionSelected === 'Programs' && <Programs />}
					{optionSelected === 'My Account' && <MyAccount />}
				</div>
			</MobileDiv>
			<DesktopDiv>
				<h1>Client Dashboard Desktop</h1>
				<h3>User Info</h3>
				<p>Email: {user.email}</p>
				<p>First Name: {user.firstName}</p>
				<p>Last Name: {user.lastName}</p>
				<p>Role: {user.role}</p>
				<p>User ID: {user.id}</p>
				<button
					onClick={async () => {
						await logout();
					}}>
					Logout
				</button>
			</DesktopDiv>
		</>
	);
};

export const MobileDiv = styled.div`
	display: none;

	@media screen and (max-width: ${MOBILE_MODE_LIMIT}) {
		display: contents;

		width: 100%;
		height: calc(100vh - 100px - 4vh);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		box-shadow: 0 2px 1px #333;
		background-color: #d0dceb;
		overflow-x: hidden;
		color: #333;

		& > .header {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			color: #d0dceb;
			background-color: #333;
			padding-bottom: 2px;
			padding-top: 1px;

			& > .option {
				padding: 0.5em 0.5em;
				margin: 0 0.5em;

				&:hover {
					cursor: pointer;
					box-shadow: 2px 0 0 #d0dceb, -2px 0 0 #d0dceb;
				}
			}

			& > .selected {
				background-color: #d0dceb;
				color: #333;
			}
		}

		& > .option-selected {
			width: 100%;
			flex: 1;
		}
	}
`;

export const DesktopDiv = styled.div`
	@media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
		display: contents;
	}
	@media screen and ((max-width: ${MOBILE_MODE_LIMIT})or (width: ${MOBILE_MODE_LIMIT})) {
		display: none;
	}
`;

export default ClientDashboard;
