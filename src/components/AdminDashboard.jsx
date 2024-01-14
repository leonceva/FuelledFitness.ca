import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useLogout from '../hooks/useLogout';
import useAuth from '../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';
import NewUser from './admin/NewUser';
import EditUser from './admin/EditUser';
import NewProgram from './admin/NewProgram';
import EditProgram from './admin/EditProgram';
import data from '../frontend-data.json';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE_LIMIT;
const VERSION = data.version;

const AdminDashboard = (props) => {
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
			<MobileDiv>
				<div className='header'>
					<span
						className={`option ${
							optionSelected === 'New Program' || optionSelected === 'Edit Program'
								? 'selected'
								: ''
						}`}
						onClick={() => {
							setButtonOptions('Programs');
							setOptionSelected('New Program');
						}}>
						Programs
					</span>
					<span
						className={`option ${
							optionSelected === 'New User' || optionSelected === 'Edit User'
								? 'selected'
								: ''
						}`}
						onClick={() => {
							setButtonOptions('Users');
							setOptionSelected('New User');
						}}>
						Users
					</span>
					<span
						className={`option ${optionSelected === 'My Account' ? 'selected' : ''}`}
						onTouchStart={() => {
							handleOption('My Account');
						}}>
						<i
							className='bi bi-person-circle'
							style={{ paddingLeft: '0.5em' }}
						/>
					</span>
					<span
						className='option'
						onTouchStart={async () => {
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
					<div className='btn-options'>
						{buttonOptions === 'Programs' && (
							<>
								<button
									className={`${
										optionSelected === 'New Program' ? 'pressed' : ''
									}`}
									onClick={() => {
										setOptionSelected('New Program');
									}}>
									New Program
								</button>
								<button
									className={`${
										optionSelected === 'Edit Program' ? 'pressed' : ''
									}`}
									onClick={() => {
										setOptionSelected('Edit Program');
									}}>
									Edit Program
								</button>
							</>
						)}
						{buttonOptions === 'Users' && (
							<>
								<button
									className={`${optionSelected === 'New User' ? 'pressed' : ''}`}
									onClick={() => {
										setOptionSelected('New User');
									}}>
									New User
								</button>
								<button
									className={`${optionSelected === 'Edit User' ? 'pressed' : ''}`}
									onClick={() => {
										setOptionSelected('Edit User');
									}}>
									Edit User
								</button>
							</>
						)}
					</div>
					<div className='content'>
						{optionSelected === 'New Program' && <NewProgram />}
						{optionSelected === 'Edit Program' && <EditProgram />}
						{optionSelected === 'New User' && <NewUser />}
						{optionSelected === 'Edit User' && <EditUser />}
					</div>
					<div className='version'>{VERSION}</div>
				</div>
			</MobileDiv>
			<DesktopDiv>
				<div className='sidebar'>
					<div
						className='login-info'
						onClick={() => {
							handleOption(null);
						}}>
						Logged in as:
						<br />
						{`${firstName} ${lastName}`}
					</div>
					<div className='options'>
						<span
							onClick={() => {
								handleOption('New Program');
							}}>
							New Program
						</span>
						<span
							onClick={() => {
								handleOption('Edit Program');
							}}>
							Edit Program
						</span>
						<span
							onClick={() => {
								handleOption('New User');
							}}>
							New User
						</span>
						<span
							onClick={() => {
								handleOption('Edit User');
							}}>
							Edit Users
						</span>
					</div>
					<div
						className='logout'
						onClick={async () => await logout()}>
						<span>Logout</span>
						<i className='bi bi-box-arrow-right'></i>
					</div>
				</div>
				<div className='content'>
					{optionSelected === 'New Program' && <NewProgram />}
					{optionSelected === 'Edit Program' && <EditProgram />}
					{optionSelected === 'New User' && <NewUser />}
					{optionSelected === 'Edit User' && <EditUser />}
				</div>
				<div className='version'>{VERSION}</div>
			</DesktopDiv>
		</>
	);
};

const DesktopDiv = styled.div`
	@media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
		width: 90%;
		height: 95%;
		display: flex;
		flex-direction: row;
		position: relative;
		z-index: 1;

		& > .sidebar {
			width: 20%;
			height: 100%;
			background-color: #333;
			border: 2px solid #333;
			border-top-left-radius: 20px;
			border-bottom-left-radius: 20px;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;
			color: #d0dceb;

			& > .login-info {
				height: 15%;
				width: 100%;
				margin-top: calc(min(3vw, 3vh));
				font-size: calc(min(2.5vw, 2.5vh));
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				&:hover {
					cursor: pointer;
					box-shadow: 0px 2px #d0dceb, 0px -2px #d0dceb;
				}
			}

			& > .options {
				height: 80%;
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: start;
				align-items: center;
				font-size: calc(min(2.5vw, 2.5vh));

				& :hover {
					cursor: pointer;
					box-shadow: 0px 2px #d0dceb, 0px -2px #d0dceb;
				}

				& span {
					padding: 10% 0;
					width: 100%;
					text-align: center;

					&:hover {
						cursor: pointer;
					}
				}
			}

			& > .logout {
				justify-self: end;
				padding: 0.5vh 0 1vh;
				width: 100%;
				display: flex;
				flex-direction: row;
				margin-bottom: calc(min(3vw, 3vh));
				font-size: calc(min(2.5vw, 2.5vh));

				& span {
					width: 70%;
					text-align: center;
				}
				& i {
					width: 30%;
					text-align: center;
				}

				&:hover {
					cursor: pointer;
					box-shadow: 0px 2px #d0dceb, 0px -2px #d0dceb;
				}
			}
		}

		& > .content {
			width: 80%;
			height: 100%;
			background-color: #d0dceb;
			border: 2px solid #333;
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
			position: relative;
		}

		& > .version {
			position: absolute;
			z-index: 3;
			background-color: inherit;
			bottom: 0%;
			right: 80%;
			font-size: calc(min(2vw, 2vh));
			padding-right: 1%;
			color: #d0dceb;
		}
	}

	@media screen and ((max-width: ${MOBILE_MODE_LIMIT} )or (width: ${MOBILE_MODE_LIMIT})) {
		display: none;
	}
`;

export const MobileDiv = styled.div`
	display: none;

	@media screen and (max-width: ${MOBILE_MODE_LIMIT}) {
		width: 100%;
		min-height: calc(100vh - 100px - 4vh);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		box-shadow: 0 2px 1px #333;
		background-color: #d0dceb;
		overflow-x: hidden;
		overflow-y: auto;
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

				& > i {
					padding-left: 0.5em;
					padding-right: 0.5em;
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
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: start;

			& > .btn-options {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				margin-top: 1em;

				& > button {
					background-color: #87ceeb;
					border: 2px solid #333;
					border-radius: 10px;
					padding: 3px 8px;
					color: #333;
					width: max-content;
					box-shadow: 2px 2px 2px #333;
					margin: 0 5px;
					transition: all 200ms;
				}

				& > .pressed {
					box-shadow: 0 0 0;
					transform: translate(2px, 2px);
					background-color: #5f90a5;
					transition: all 200ms;
				}
			}

			& > .content {
				width: 100%;
				flex: 1;
				overflow: auto;
			}

			& > .version {
				width: 100%;
				text-align: end;
				padding-right: 0.5em;
			}
		}
	}
`;

export default AdminDashboard;
