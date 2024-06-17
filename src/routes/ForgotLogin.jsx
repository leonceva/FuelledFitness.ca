import styled from 'styled-components';
import DesktopLayout from '../layouts/DesktopLayout';
import Reaptcha from 'reaptcha';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import MobileLayout from '../layouts/MobileLayout';

const reaptchaKey = process.env.REACT_APP_REAPTCHA_KEY;

const ForgotLogin = () => {
	return (
		<>
			<DesktopLayout content={<DesktopContent />} />
			<MobileLayout content={<MobileContent />} />
		</>
	);
};

/************************************************************* DESKTOP MODE ****************************************************************************/

export const DesktopContent = () => {
	const captchaRef = useRef(null);
	const [verified, setVerified] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);
	const [email, setEmail] = useState('');
	const [sentReset, setSentReset] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateEmail()) {
			if (verified) {
				// Send email to server endpoint that will generate the reset token
				const sendResetInfo = async () => {
					await axios
						.post('/resetPassword', {
							email: email,
						})
						.then((res) => {
							setSentReset(true);
						})
						.catch((res) => {
							if (res.code === 'ERR_BAD_REQUEST') {
								setErrorMessage('User not found');
							} else {
								setErrorMessage('Server error, please try again later');
							}
						});
				};
				sendResetInfo();
			} else {
				setErrorMessage('Pleace complete the CAPTCHA');
			}
		}
	};

	const handleChange = (e) => {
		const { value } = e.target;
		setEmail(value);
		setErrorMessage(false);
	};

	// Validate email format
	const validateEmail = () => {
		// Check valid email
		if (
			email.match(
				// eslint-disable-next-line no-useless-escape
				/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
		) {
			setErrorMessage(false);
			return true;
		} else {
			setErrorMessage('Invalid e-mail entered');
			return false;
		}
	};

	return (
		<DesktopDiv>
			<div className='container'>
				<h2>Forgot Password</h2>
				{sentReset && (
					<>
						<p>
							We've sent a password reset link to the requested email address{' '}
							<strong>{email}</strong>. Please check your inbox and follow the
							instructions to reset your password.
							<br />
							If you don't receive the email within a few minutes, please check your
							spam folder. For further assistance, reach out to our support team:
							support@fuelledfitness.ca
						</p>
						<Link
							className='go-back'
							to='/myAccount'>
							Back To Login
						</Link>
					</>
				)}
				{!sentReset && (
					<>
						<p>Please enter the email address associated with your account:</p>
						<form
							action=''
							method='post'
							onSubmit={handleSubmit}>
							<span className={`error-message ${errorMessage ? 'show' : 'hide'}`}>
								{errorMessage || 'placeholder'}
							</span>
							<input
								type='email'
								name='email'
								id='email-desktop'
								autoComplete='email'
								required
								placeholder='Enter your e-mail'
								onChange={handleChange}
								value={email}
							/>
							<Reaptcha
								className='captcha'
								sitekey={reaptchaKey}
								onVerify={() => {
									setVerified(true);
									setErrorMessage(false);
								}}
								ref={captchaRef}
								onExpire={() => {
									setVerified(false);
									setErrorMessage('CAPTCHA has expired');
								}}
							/>
							<button className='btn'>Request Reset Link</button>
						</form>
						<Link
							className='go-back'
							to='/myAccount'>
							Back To Login
						</Link>
					</>
				)}
			</div>
		</DesktopDiv>
	);
};

export const DesktopDiv = styled.div`
	width: 100%;
	min-height: calc(100vh - 100px);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& > .container {
		width: auto;
		max-width: calc(min(800px, 80%));
		min-width: calc(min(500px, 50%));
		border: 3px solid #333;
		border-radius: 10px;
		background-color: #6e88a1;
		display: flex;
		flex-direction: column;
		align-items: center;

		& > h2 {
			width: 100%;
			text-align: center;
			font-size: xx-large;
			margin: 1ch 0;
			padding: 0;
		}

		& > p {
			width: calc(100% - 4ch);
			font-size: large;
		}

		& > form {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: start;
			margin: 0;

			& > .error-message {
				width: 80%;
				font-size: large;
				text-align: end;
				margin-bottom: 0.5ch;
				font-size: large;
			}

			& > .hide {
				color: transparent;
				font-size: 0ch;
			}

			& > .show {
				color: #cc0000;
			}

			& > input {
				padding: 1ch;
				width: 80%;
				font-size: large;
				margin-bottom: 1ch;
			}

			& > .btn {
				margin-top: 1ch;
			}
		}

		& > .go-back {
			width: 100%;
			text-align: center;
			margin: 1ch 0;
			font-weight: bold;

			@media (hover: hover) and (pointer: fine) {
				&:hover {
					cursor: pointer;
					text-decoration: underline;
					color: darkblue;
				}
			}
		}
	}
`;

/************************************************************* MOBILE MODE ****************************************************************************/

export const MobileContent = () => {
	const captchaRef = useRef(null);
	const [verified, setVerified] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);
	const [email, setEmail] = useState('');
	const [sentReset, setSentReset] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateEmail()) {
			if (verified) {
				// Send email to server endpoint that will generate the reset token
				const sendResetInfo = async () => {
					await axios
						.post('/resetPassword', {
							email: email,
						})
						.then((res) => {
							setSentReset(true);
						})
						.catch((res) => {
							if (res.code === 'ERR_BAD_REQUEST') {
								setErrorMessage('User not found');
							} else {
								setErrorMessage('Server error, please try again later');
							}
						});
				};
				sendResetInfo();
			} else {
				setErrorMessage('Pleace complete the CAPTCHA');
			}
		}
	};

	const handleChange = (e) => {
		const { value } = e.target;
		setEmail(value);
		setErrorMessage(false);
	};

	// Validate email format
	const validateEmail = () => {
		// Check valid email
		if (
			email.match(
				// eslint-disable-next-line no-useless-escape
				/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
		) {
			setErrorMessage(false);
			return true;
		} else {
			setErrorMessage('Invalid e-mail entered');
			return false;
		}
	};

	return (
		<MobileDiv>
			<div className='container'>
				<h2>Forgot Password</h2>
				{sentReset && (
					<>
						<p>
							We've sent a password reset link to the requested email address{' '}
							<strong>{email}</strong>. Please check your inbox and follow the
							instructions to reset your password.
							<br />
							If you don't receive the email within a few minutes, please check your
							spam folder. For further assistance, reach out to our support team:
							support@fuelledfitness.ca
						</p>
						<Link
							className='go-back'
							to='/myAccount'>
							Back To Login
						</Link>
					</>
				)}
				{!sentReset && (
					<>
						<p>Please enter the email address associated with your account:</p>
						<form
							action=''
							method='post'
							onSubmit={handleSubmit}>
							<span className={`error-message ${errorMessage ? 'show' : 'hide'}`}>
								{errorMessage || 'placeholder'}
							</span>
							<input
								type='email'
								name='email'
								id='email-desktop'
								autoComplete='email'
								required
								placeholder='Enter your e-mail'
								onChange={handleChange}
								value={email}
							/>
							<Reaptcha
								className='captcha'
								sitekey={reaptchaKey}
								onVerify={() => {
									setVerified(true);
									setErrorMessage(false);
								}}
								ref={captchaRef}
								onExpire={() => {
									setVerified(false);
									setErrorMessage('CAPTCHA has expired');
								}}
							/>
							<button className='btn'>Request Reset Link</button>
						</form>
						<Link
							className='go-back'
							to='/myAccount'>
							Back To Login
						</Link>
					</>
				)}
			</div>
		</MobileDiv>
	);
};

export const MobileDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	width: 100%;

	& > .container {
		width: auto;
		height: auto;
		max-width: 90%;
		max-height: 80%;
		margin-top: 10%;
		overflow-y: auto;
		border: 3px solid #333;
		border-radius: 10px;
		background-color: #6e88a1;
		display: flex;
		flex-direction: column;
		align-items: center;

		& > h2 {
			width: 100%;
			text-align: center;
			font-size: x-large;
			margin: 1ch 0;
			padding: 0;
		}

		& > p {
			width: calc(100% - 2ch);
			font-size: large;
		}

		& > form {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: start;

			& > .error-message {
				width: 80%;
				font-size: large;
				text-align: end;
				margin-bottom: 0.5ch;
				font-size: large;
			}

			& > .hide {
				color: transparent;
				font-size: 0ch;
			}

			& > .show {
				color: #cc0000;
			}

			& > input {
				padding: 1ch;
				width: 80%;
				font-size: large;
				margin-bottom: 1ch;
			}

			& > .btn {
				margin-top: 1ch;
			}
		}

		& > .go-back {
			width: 100%;
			text-align: center;
			margin: 1ch 0;
			font-weight: bold;
		}
	}
`;

export default ForgotLogin;
