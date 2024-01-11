import useLogout from '../hooks/useLogout';
import { useState } from 'react';
import styled from 'styled-components';
import MyAccount from './client/MyAccount';
import Programs from './client/Programs';
import data from '../frontend-data.json';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE_LIMIT;
const VERSION = data.version;

const ClientDashboard = (props) => {
	const user = props.user;

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
					{optionSelected === 'My Account' && <MyAccount user={user} />}
					<div className='version'>{VERSION}</div>
				</div>
			</MobileDiv>
			<DesktopDiv>
				<div className='sidebar'>
					<div
						className='login-info'
						onClick={() => {
							handleOption('My Account');
						}}>
						Logged in as:
						<br />
						{`${firstName} ${lastName}`}
					</div>
					<div className='options'>
						<span
							onClick={() => {
								handleOption('Programs');
							}}>
							My Programs
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
					{optionSelected === 'Programs' && <Programs />}
					{optionSelected === 'My Account' && <MyAccount user={user} />}
				</div>
				<div className='version'>{VERSION}</div>
			</DesktopDiv>
		</>
	);
};

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
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: start;

			& > .version {
				width: 100%;
				text-align: end;
				padding-right: 0.5em;
			}
		}
	}
`;

export const DesktopDiv = styled.div`
	@media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
		width: 90%;
		height: 90%;
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
	@media screen and ((max-width: ${MOBILE_MODE_LIMIT})or (width: ${MOBILE_MODE_LIMIT})) {
		display: none;
	}
`;

export default ClientDashboard;
