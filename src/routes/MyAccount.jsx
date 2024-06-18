import styled from 'styled-components';
import useAuth from '../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';

import LoginForm from '../components/LoginForm';
import AdminDashboard from '../components/AdminDashboard';
import ClientDashboard from '../components/ClientDashboard';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE_LIMIT;

const MyAccount = () => {
	const { auth } = useAuth();
	const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
	const userRole = decoded?.User?.role || null;

	return (
		<LayoutDiv>
			{userRole === null && <LoginForm />}
			{userRole === 'admin' && <AdminDashboard />}
			{userRole === 'active' && <ClientDashboard />}
		</LayoutDiv>
	);
};

export default MyAccount;

export const LayoutDiv = styled.div`
	/************************* DESKTOP MODE *************************/
	@media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
		width: 100%;
		min-height: calc(100vh - 100px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #d2d2d2;
		position: relative;

		/*** Login Form ***/
		& > .login-form {
			background-color: black;
			color: white;
			width: auto;
			max-width: calc(min(800px, 75%));
			min-width: 350px;
			height: auto;
			max-height: calc(min(500px, 75%));
			overflow-y: auto;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			align-items: center;
			border: 3px solid #87ceeb;
			border-radius: 10px;
			padding: 10px 40px;
			position: absolute;

			& > h2 {
				width: 100%;
				padding: 0;
				margin: 0;
				text-align: center;
				font-size: x-large;
			}

			& > .google-login {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 10px;
				margin-bottom: 10px;
			}

			& > .or-container {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				padding: 0;
				margin: 1ch 0;

				& > h4 {
					padding: 0;
					margin: 2ch 0;
				}

				& > .or {
					margin: 0 1ch;
					font-size: large;
				}

				& > .left,
				.right {
					flex: 1;
					margin: 0 5%;
					border-style: solid;
					border-width: 0 0 2px;
					height: 2px;
					font-size: 0px;
				}
			}

			& > .login-form {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: start;

				& > label {
					width: 100%;
					margin: 5px 0;
				}

				& > input {
					width: calc(100% - 2px - 2ch);
					margin-bottom: 1ch;
					padding: 1ch;
					border: 1px solid black;
				}

				& > .login-options {
					width: 100%;
					height: auto;
					display: flex;
					align-items: center;
					justify-content: start;
					font-size: small;
					margin-bottom: 1ch;

					& > .forgot-link {
						flex: 1;
						text-align: end;
						color: white;
						text-decoration: none;

						@media (hover: hover) and (pointer: fine) {
							&:hover {
								color: #87ceeb;
								text-decoration: underline;
								cursor: pointer;
							}
						}
					}
				}

				& > .btn {
					width: 100%;
					max-width: calc(min(80%, 300px));
					margin: 2ch 0 1ch;
				}
			}
		}
	}

	/************************* MOBILE MODE *************************/
	@media screen and ((max-width: ${MOBILE_MODE_LIMIT} )or (width: ${MOBILE_MODE_LIMIT})) {
		width: 100%;
		min-height: calc(100vh - 100px);
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		background-color: #d2d2d2;
		position: fixed;

		/*** Login Form ***/
		& > .login-form {
			background-color: black;
			color: white;
			max-width: 90%;
			max-height: 80%;
			overflow-y: auto;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border: 3px solid #87ceeb;
			border-radius: 10px;
			padding: 10px 40px;
			position: absolute;
			top: 10%;

			& > h2 {
				width: 100%;
				padding: 0;
				margin: 0;
				text-align: center;
				font-size: x-large;
			}

			& > .google-login {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 10px;
				margin-bottom: 10px;
			}

			& > .or-container {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				padding: 0;
				margin: 1ch 0;

				& > h4 {
					padding: 0;
					margin: 2ch 0;
				}

				& > .or {
					margin: 0 1ch;
					font-size: large;
				}

				& > .left,
				.right {
					flex: 1;
					margin: 0 5%;
					border-style: solid;
					border-width: 0 0 2px;
					height: 2px;
					font-size: 0px;
				}
			}

			& > .login-form {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: start;

				& > label {
					width: 100%;
					margin: 5px 0;
					font-size: larger;
				}

				& > input {
					width: calc(100% - 2px - 2ch);
					margin-bottom: 1ch;
					padding: 1ch;
					border: 1px solid black;
					font-size: large;
				}

				& > .login-options {
					width: 100%;
					height: auto;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: start;
					font-size: small;
					margin-bottom: 1ch;
					flex-wrap: wrap;

					& > .persist-info {
						display: none;
					}

					& > .forgot-link {
						flex: 1;
						text-align: end;
						color: white;
						text-decoration: none;
						padding-left: 2ch;
					}
				}

				& > .btn {
					width: 100%;
					max-width: calc(min(80%, 300px));
					margin: 2ch 0 1ch;
					box-shadow: none;
				}
			}
		}
	}
`;
