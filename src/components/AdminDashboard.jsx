import { useState } from 'react';
import useLogout from '../hooks/useLogout';
import useAuth from '../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';
import styled from 'styled-components';
import Account from './admin/Account';
import NewUser from './admin/NewUser';
import EditUser from './admin/EditUser';
import NewProgram from './admin/NewProgram';
import EditProgram from './admin/EditProgram';
import NewTemplate from './admin/NewTemplate';
import EditTemplate from './admin/EditTemplate';
import Version from './admin/Version';
import data from '../frontend-data.json';
import Exercises from './admin/Exercises';

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

	const firstName = decoded?.User?.firstName || null;
	const lastName = decoded?.User?.lastName || null;

	return (
		<>
			<DesktopDiv>
				<div className='dashboard'>
					<div className='menu'>
						<div
							className='login-info'
							onClick={() => {
								handleOption('Account');
							}}>
							<i className='bi bi-person-circle' />
							{` ${firstName} ${lastName}`}
						</div>
						<div className='options'>
							<div className='item-container'>
								<div
									className='option-item'
									onClick={() => {
										handleOption('New Program');
									}}>
									New Program
								</div>
								<div
									className='option-item'
									onClick={() => {
										handleOption('Edit Program');
									}}>
									Edit Program
								</div>
								<div
									className='option-item'
									onClick={() => {
										handleOption('New User');
									}}>
									New User
								</div>
								<div
									className='option-item'
									onClick={() => {
										handleOption('Edit User');
									}}>
									Edit User
								</div>
								<div
									className='option-item'
									onClick={() => {
										handleOption('New Template');
									}}>
									New Template
								</div>
								<div
									className='option-item'
									onClick={() => {
										handleOption('Edit Template');
									}}>
									Edit Template
								</div>
								<div
									className='option-item'
									onClick={() => {
										handleOption('Exercises');
									}}>
									Exercises
								</div>
							</div>

							<div
								className='version'
								onClick={() => {
									handleOption('Version');
								}}>{`Version: ${data.version}`}</div>
						</div>
						<div
							className='logout'
							onClick={async () => await logout()}>
							<i className='bi bi-box-arrow-left' />
							{` Logout`}
						</div>
					</div>
					<div className='selected'>
						{optionSelected === 'Account' && <Account />}
						{optionSelected === 'New Program' && <NewProgram />}
						{optionSelected === 'Edit Program' && <EditProgram />}
						{optionSelected === 'New User' && <NewUser />}
						{optionSelected === 'Edit User' && <EditUser />}
						{optionSelected === 'New Template' && <NewTemplate />}
						{optionSelected === 'Edit Template' && <EditTemplate />}
						{optionSelected === 'Exercises' && <Exercises />}
						{optionSelected === 'Version' && <Version />}
					</div>
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
				width: fit-content;
				height: 100%;
				background-color: black;
				position: relative;
				display: flex;
				flex-direction: column;
				justify-content: start;
				align-items: center;
				border-style: solid;
				border-color: #d2d2d2;
				border-width: 0 3px 0 0;

				& > .login-info {
					height: fit-content;
					width: calc(100% - 1ch);
					border-style: solid;
					border-width: 0 0 2px;
					border-color: #d2d2d2;
					font-size: x-large;
					padding: 1ch 1ch 1ch 0;
					text-align: center;

					@media (hover: hover) and (pointer: fine) {
						&:hover {
							cursor: pointer;
							color: #87ceeb;
						}
					}
				}

				& > .options {
					flex: 7;
					width: 100%;
					overflow-y: auto;
					display: flex;
					flex-direction: column;
					justify-content: start;
					align-items: center;
					padding-top: 1ch;

					& > .item-container {
						flex: 1;
						width: 100%;
						display: flex;
						flex-direction: column;
						justify-content: start;
						align-items: center;

						& > .option-item {
							width: fit-content;
							padding: 0.5ch 3ch;
							text-align: center;
							font-size: x-large;

							@media (hover: hover) and (pointer: fine) {
								&:hover {
									cursor: pointer;
									color: #87ceeb;
								}
							}
						}
					}

					& > .version {
						height: fit-content;
						padding: 1ch 3ch;
						text-align: center;
						font-size: smaller;

						@media (hover: hover) and (pointer: fine) {
							&:hover {
								cursor: pointer;
								color: #87ceeb;
							}
						}
					}
				}

				& > .logout {
					height: fit-content;
					width: calc(100% - 1ch);
					border-style: solid;
					border-width: 2px 0 0;
					border-color: #d2d2d2;
					font-size: x-large;
					padding: 1ch 1ch 1ch 0;
					text-align: center;

					@media (hover: hover) and (pointer: fine) {
						&:hover {
							cursor: pointer;
							color: #87ceeb;
						}
					}
				}
			}

			& > .selected {
				flex: 1;
				height: 100%;
				background-color: black;
				position: relative;
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
