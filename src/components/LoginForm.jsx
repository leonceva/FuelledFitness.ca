import styled from 'styled-components';
//import google_logo from "../images/g-logo.png";
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import { useContext } from 'react';
import PersistLoginInfo from './PersistLoginInfo';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const MOBILE_MODE_LIMIT = `892px`;

const LoginForm = () => {
	// Form content
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [formError, setFormError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('Invalid email');
	const { setAuth, persist, setPersist } = useContext(AuthContext);

	// Validate email format
	function validateEmail() {
		// Check valid email
		if (
			formData.email.match(
				// eslint-disable-next-line no-useless-escape
				/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
		) {
			setFormError(false);
			return true;
		} else {
			setErrorMessage('Invalid email');
			setFormError(true);
			return false;
		}
	}

	function handleChange(e) {
		// Update data from form
		const { name, value } = e.target;
		// Clear any error message
		setFormError(false);
		// Update from data content
		setFormData((prevFormData) => {
			return { ...prevFormData, [name]: value };
		});
	}

	// Handle form submission
	function handleSubmit(e) {
		e.preventDefault();
		// console.log("Form submitted");
		if (validateEmail()) {
			// console.log(`User: ${formData.email}\nPassword: ${formData.password}`);
			// Validate with the server
			const sendLoginInfo = async () => {
				await axios
					.post(
						'/login',
						{
							email: formData.email.toLowerCase(),
							password: formData.password,
						},
						{
							withCredentials: true,
						}
					)
					.then((res) => {
						const accessToken = res.data.accessToken;
						setFormError(false);
						setFormData({ email: '', password: '' });
						setAuth({ accessToken });
					})
					.catch((res) => {
						if (res.response !== undefined) {
							console.log(`Error: ${res?.response?.status} ${res?.response?.data}`);
							setErrorMessage('Invalid Email or Password');
							setFormError(true);
						} else {
							console.log(`Error: ${res?.code} ${res?.message}`);
							setErrorMessage('Login Failed');
							setFormError(true);
						}
					});
			};
			sendLoginInfo();
		} else {
			// console.log("Invalid Email format");
		}
	}

	function togglePersist() {
		setPersist((prev) => !prev);
	}

	// Set session to last while tab is open
	useEffect(() => {
		setPersist(false);
		sessionStorage.setItem('persist', true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Update persistent state when box is toggled
	useEffect(() => {
		localStorage.setItem('persist', persist);
	}, [persist]);

	const handleSuccessGoogle = async (res) => {
		// console.log(res);
		var decoded = jwtDecode(res.credential);
		//The values of interest from decoded .email .given_name .family_name
		// console.log(`User Logged in:\n${decoded.given_name} ${decoded.family_name} - ${decoded.email}`);
		// Validate with the server
		await axios
			.post(
				'/loginGoogle',
				{
					email: decoded.email,
					clientID: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
				},
				{
					withCredentials: true,
				}
			)
			.then((res) => {
				const accessToken = res.data.accessToken;
				setFormError(false);
				setFormData({ email: '', password: '' });
				setAuth({ accessToken });
			})
			.catch((err) => {
				console.log(`Error: ${err?.response?.status} ${err?.response?.data}`);
				setErrorMessage('User Not Found');
				setFormError(true);
			});
	};

	const handleErrorGoogle = (res) => {
		console.log(JSON.stringify(res));
		setErrorMessage('Google Authentication Failed');
		setFormError(true);
	};

	return (
		<LoginContainer>
			<h2>Login</h2>
			<div className='google-login'>
				<GoogleLogin
					width={200}
					size='large'
					clientID={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
					onSuccess={handleSuccessGoogle}
					onError={handleErrorGoogle}
				/>
			</div>

			<div className='or-container'>
				<h4 className='left'>left</h4>
				<h4 className='or'>or</h4>
				<h4 className='right'>right</h4>
			</div>

			<form
				className='login-form'
				action=''
				method='post'
				onSubmit={handleSubmit}>
				<label
					className='label'
					htmlFor='email'>
					Email:
					{formError && <span className='error'>{errorMessage}</span>}
				</label>
				<input
					id='email'
					name='email'
					autoComplete='email'
					className='input'
					type='email'
					placeholder='Type your email'
					required
					value={formData.email}
					onChange={handleChange}
				/>
				<label
					htmlFor='password'
					className='label'>
					Password:
				</label>
				<input
					id='password'
					name='password'
					type='password'
					className='input'
					placeholder='Type your password'
					required
					value={formData.password}
					onChange={handleChange}
				/>
				<div className='login-options'>
					<input
						type='checkbox'
						name='persist'
						id='persist'
						onChange={togglePersist}
						checked={persist}
					/>
					<label htmlFor='persist'>Remember Device?</label>
					<PersistLoginInfo />
					<a
						className='forgot-link'
						href='/forgotLogin'>
						forgot password?
					</a>
				</div>
				<button className='login-btn'>Login</button>
			</form>
		</LoginContainer>
	);
};

export const LoginContainer = styled.div`
	// Desktop
	@media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
		border: 2px solid #333;
		width: max-content;
		max-width: 600px;
		border-radius: 20px;
		background-color: #d0dce7;
		display: flex;
		flex-direction: column;
		align-items: start;
		max-height: max-content;

		& > h2 {
			padding: 2vh 0;
			font-weight: 800;
			align-self: center;
			font-size: calc(min(3vh, 3vw));
		}

		& > .google-login {
			border-radius: 5px;
			min-width: 200px;
			width: fit-content;
			min-height: 35px;
			height: fit-content;
			align-self: center;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}

		& > .or-container {
			display: flex;
			flex-direction: row;
			width: 100%;
			justify-content: center;
			padding-top: 2vh;

			& > h4 {
				font-size: large;
				align-self: center;
				font-size: calc(min(2.5vh, 2.5vw));
			}

			& > .left,
			.right {
				color: transparent;
				flex: 1;
				background-color: #333;
				height: 0.2vh;
				margin: 0 2vw;
			}
		}

		& > .login-form {
			padding: 2vh 2vw;
			margin-top: -2vh;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;

			& > .label {
				display: block;
				padding: 0.5vh 0;
				align-self: start;
				display: flex;
				width: 100%;
				font-size: calc(min(2vh, 2vw));

				& > .error {
					color: red;
					text-align: end;
					flex: 1;
					padding-right: 1vw;
				}
			}
			& > input {
				display: block;
				width: 100%;
				padding: 0.5vh 1vw;
				font-size: calc(min(2vh, 2vw));
			}

			& > .login-options {
				align-self: end;
				font-size: small;
				padding-bottom: 2vh;
				padding-right: 0.5vw;
				display: flex;
				flex-direction: row;
				justify-content: start;
				width: 100%;
				position: relative;
				margin-top: 0.5vh;
				min-width: 300px;

				& input {
				}

				& label {
					text-align: start;
					padding-left: 0.5em;
					font-size: calc(min(1.5vh, 1.5vw));
				}

				& i {
					font-size: calc(min(1.5vh, 1.5vw));
				}

				& > .persist-info {
					font-size: calc(min(1.5vh, 1.5vw));
				}

				& > .forgot-link {
					color: inherit;
					text-decoration: none;
					text-align: end;
					right: 1vw;
					font-size: calc(min(1.5vh, 1.5vw));
					position: absolute;
					right: 0%;

					&:hover {
						color: blue;
						text-decoration: underline;
					}
				}
			}

			& > .login-btn {
				background-color: #879db3;
				border: 2px #333 solid;
				border-radius: 10px;
				width: 80%;
				align-self: center;
				padding: 0.5vh 0;
				box-shadow: 2px 2px 2px #333;
				font-size: calc(min(2.5vh, 2.5vw));

				&:hover {
					background-color: #6e88a1;
					cursor: pointer;
				}
				&:active {
					translate: 2px 2px;
					box-shadow: 0 0 0;
				}
			}
		}
	}

	// Mobile
	@media screen and ((max-width: ${MOBILE_MODE_LIMIT} )) {
		border: 2px solid #333;
		width: max-content;
		max-width: 95vw;
		border-radius: 20px;
		background-color: #d0dce7;
		display: flex;
		flex-direction: column;
		align-items: start;
		height: max-content;
		max-height: 80vh;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		& > h2 {
			padding: 2vh 0;
			font-weight: 800;
			align-self: center;
			font-size: calc(max(3vh, 3vw));
		}

		& > .google-login {
			border-radius: 5px;
			min-width: 200px;
			width: fit-content;
			min-height: 35px;
			height: fit-content;
			align-self: center;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}

		& > .or-container {
			display: flex;
			flex-direction: row;
			width: 100%;
			justify-content: center;
			padding-top: 2vh;

			& > h4 {
				font-size: large;
				align-self: center;
				font-size: calc(max(2.5vh, 2.5vw));
			}

			& > .left,
			.right {
				color: transparent;
				flex: 1;
				background-color: #333;
				height: 0.2vh;
				margin: 0 2vw;
			}
		}

		& > .login-form {
			padding: 2vh 2vw;
			margin-top: -2vh;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;

			& > .label {
				display: block;
				padding: 0.5vh 0;
				align-self: start;
				display: flex;
				width: 100%;
				font-size: calc(max(2vh, 2vw));

				& > .error {
					color: red;
					text-align: end;
					flex: 1;
					padding-right: 1vw;
				}
			}
			& > input {
				display: block;
				width: 100%;
				padding: 0.5vh 1vw;
				font-size: calc(max(2vh, 2vw));
			}

			& > .login-options {
				align-self: end;
				font-size: small;
				padding-bottom: 2vh;
				padding-right: 0.5vw;
				display: flex;
				flex-direction: row;
				justify-content: start;
				min-width: 200px;
				width: 100%;
				position: relative;
				margin-top: 0.5vh;
				width: max-content;

				& input {
					margin-left: 0.5vw;
				}

				& label {
					text-align: start;
					margin: 0 1em 0 0.5em;
					font-size: calc(max(1.5vh, 1.5vw));
				}

				& i {
					display: none;
				}

				& > .persist-info {
					display: none;
				}

				& > .forgot-link {
					color: inherit;
					text-decoration: none;
					text-align: end;
					position: relative;
					font-size: calc(max(1.5vh, 1.5vw));
					margin: 0 1em;

					&:hover {
						color: blue;
						text-decoration: underline;
					}
				}
			}

			& > .login-btn {
				background-color: #879db3;
				border: 2px #333 solid;
				border-radius: 10px;
				width: 80%;
				align-self: center;
				padding: 0.5vh 0;
				box-shadow: 2px 2px 2px #333;
				font-size: calc(max(2.5vh, 2.5vw));

				&:hover {
					background-color: #6e88a1;
					cursor: pointer;
				}
				&:active {
					translate: 2px 2px;
					box-shadow: 0 0 0;
				}
			}
		}
	}
`;

export default LoginForm;
