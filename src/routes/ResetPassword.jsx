import styled from 'styled-components';
import DesktopLayout from '../layouts/DesktopLayout';
import MobileLayout from '../layouts/MobileLayout';
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const ResetPassword = () => {
	return (
		<>
			<DesktopLayout content={<DesktopContent />} />
			<MobileLayout content={<MobileContent />} />
		</>
	);
};

export default ResetPassword;

/************************************************************* DESKTOP MODE ****************************************************************************/

export const DesktopContent = () => {
	const [searchParams] = useSearchParams();
	const resetToken = searchParams.get('reset_token');
	const [errorMessage, setErrorMessage] = useState(false);
	const [formData, setFormData] = useState({
		newPassword: '',
		confirmPassword: '',
	});

	const navigate = useNavigate();

	// For submit handler
	const handleSubmit = (e) => {
		e.preventDefault();
		if (checkConstraints()) {
			if (comparePasswords()) {
				// Send password to server
				axios
					.patch(`${process.env.REACT_APP_AXIOS_BASE_URL}/resetPassword`, {
						resetToken: resetToken,
						newPassword: formData.newPassword,
					})
					.then((res) => {
						console.log('Password Reset Succesful');
						setErrorMessage(false);
						navigate('/account', { replace: true });
					})
					.catch((err) => {
						console.log(`Error: ${err?.response?.status} - ${err?.response?.data}`);
						if (err?.response?.status === 406) {
							setErrorMessage('Invalid Reset Link');
						} else if (err?.response?.status === 401) {
							setErrorMessage('Expired Reset Link');
						} else if (err?.response?.status === 503) {
							setErrorMessage('Server Error');
						} else {
							setErrorMessage('Password Reset Failed');
						}
					})
					.finally(() => {
						setFormData({
							newPassword: '',
							confirmPassword: '',
						});
					});
			} else {
				setErrorMessage("Passwords don't match");
			}
		} else {
			return;
		}
	};

	// Form change handler
	const handleChange = (e) => {
		setErrorMessage(false);
		const { name, value } = e.target;
		// Update form data content
		setFormData((prevFormData) => {
			return { ...prevFormData, [name]: value };
		});
	};

	const checkConstraints = () => {
		if (formData.newPassword.length < 6) {
			setErrorMessage('Password must be 6 characters or longer');
			return false;
		}
		if (formData.newPassword.search(/[a-z]/) < 0) {
			setErrorMessage('Password must contain a lowercase letter');
			return false;
		}
		if (formData.newPassword.search(/[A-Z]/) < 0) {
			setErrorMessage('Password must contain an uppercase letter');
			return false;
		}

		if (formData.newPassword.search(/[0-9]/) < 0) {
			setErrorMessage('Password must contain a number');
			return false;
		}
		if (formData.newPassword.search(/[^A-Za-z 0-9]/g) < 0) {
			setErrorMessage('Password must contain a special character');
			return false;
		}
		return true;
	};

	const comparePasswords = () => {
		return formData.newPassword === formData.confirmPassword;
	};

	return (
		<>
			<DesktopDiv>
				<div className='container'>
					<h2>Reset Password</h2>
					<div className='password-info'>
						Please enter the new password for your account, that satisfies the
						following:
						<ul>
							<li>The new password must be at least 6 characters long.</li>
							<li>
								The new password must contain the following: a lowercase letter, an
								uppercase letter, a number, and a special character.
							</li>
						</ul>
					</div>
					<form>
						<span
							className={`error-message ${errorMessage ? 'show' : 'hide'}`}
							placeholder=''>
							{errorMessage || 'placeholder'}
						</span>
						<div className='input'>
							<label htmlFor='newPassword'>New Password:</label>
							<input
								type='password'
								name='newPassword'
								id='newPassword'
								autoComplete='new-password'
								onChange={handleChange}
								value={formData.newPassword}
								required
							/>
						</div>
						<div className='input'>
							<label htmlFor='confirmPassword'>Confirm Password:</label>
							<input
								type='password'
								name='confirmPassword'
								id='confirmPassword'
								autoComplete='off'
								onPaste={(e) => e.preventDefault()}
								onDrop={(e) => e.preventDefault()}
								onChange={handleChange}
								value={formData.confirmPassword}
								required
							/>
						</div>
						<button
							className='btn'
							type='submit'
							onClick={handleSubmit}>
							Change Password
						</button>
					</form>
				</div>
			</DesktopDiv>
		</>
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
			font-size: xx-large;
			margin: 1ch 0;
			padding: 0;
			text-align: center;
		}

		& > .password-info {
			width: calc(100% - 4ch);
			text-align: justify;

			& > ul {
				margin: 0;
			}
		}

		& > form {
			width: 80%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: start;

			& > .error-message {
				width: 100%;
				text-align: end;
				margin-top: 1ch;
			}

			& > .hide {
				color: transparent;
			}

			& > .show {
				color: #cc0000;
			}

			& > .input {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: start;
				align-items: center;
				margin: 1ch;

				& > label {
					flex: 2;
					text-align: center;
				}

				& > input {
					flex: 4;
					padding: 1ch;
					border: 1px solid #333;
				}
			}

			& > .btn {
				margin-bottom: 1ch;
			}
		}
	}
`;

/************************************************************* MOBILE MODE ****************************************************************************/

export const MobileContent = () => {
	const [searchParams] = useSearchParams();
	const resetToken = searchParams.get('reset_token');
	const [errorMessage, setErrorMessage] = useState(false);
	const [formData, setFormData] = useState({
		newPassword: '',
		confirmPassword: '',
	});

	const navigate = useNavigate();

	// For submit handler
	const handleSubmit = (e) => {
		e.preventDefault();
		if (checkConstraints()) {
			if (comparePasswords()) {
				// Send password to server
				axios
					.patch(`${process.env.REACT_APP_AXIOS_BASE_URL}/resetPassword`, {
						resetToken: resetToken,
						newPassword: formData.newPassword,
					})
					.then((res) => {
						console.log('Password Reset Succesful');
						setErrorMessage(false);
						navigate('/account', { replace: true });
					})
					.catch((err) => {
						console.log(`Error: ${err?.response?.status} - ${err?.response?.data}`);
						if (err?.response?.status === 406) {
							setErrorMessage('Invalid Reset Link');
						} else if (err?.response?.status === 401) {
							setErrorMessage('Expired Reset Link');
						} else if (err?.response?.status === 503) {
							setErrorMessage('Server Error');
						} else {
							setErrorMessage('Password Reset Failed');
						}
					})
					.finally(() => {
						setFormData({
							newPassword: '',
							confirmPassword: '',
						});
					});
			} else {
				setErrorMessage("Passwords don't match");
			}
		} else {
			return;
		}
	};

	// Form change handler
	const handleChange = (e) => {
		setErrorMessage(false);
		const { name, value } = e.target;
		// Update form data content
		setFormData((prevFormData) => {
			return { ...prevFormData, [name]: value };
		});
	};

	const checkConstraints = () => {
		if (formData.newPassword.length < 6) {
			setErrorMessage('Password must be 6 characters or longer');
			return false;
		}
		if (formData.newPassword.search(/[a-z]/) < 0) {
			setErrorMessage('Password must contain a lowercase letter');
			return false;
		}
		if (formData.newPassword.search(/[A-Z]/) < 0) {
			setErrorMessage('Password must contain an uppercase letter');
			return false;
		}

		if (formData.newPassword.search(/[0-9]/) < 0) {
			setErrorMessage('Password must contain a number');
			return false;
		}
		if (formData.newPassword.search(/[^A-Za-z 0-9]/g) < 0) {
			setErrorMessage('Password must contain a special character');
			return false;
		}
		return true;
	};

	const comparePasswords = () => {
		return formData.newPassword === formData.confirmPassword;
	};

	return (
		<MobileDiv>
			<div className='container'>
				<h2>Reset Password</h2>
				<div className='password-info'>
					Please enter the new password for your account, that satisfies the following:
					<ul>
						<li>The new password must be at least 6 characters long.</li>
						<li>
							The new password must contain the following: a lowercase letter, an
							uppercase letter, a number, and a special character.
						</li>
					</ul>
				</div>
				<form>
					<span
						className={`error-message ${errorMessage ? 'show' : 'hide'}`}
						placeholder=''>
						{errorMessage || 'placeholder'}
					</span>
					<div className='input'>
						<label htmlFor='newPassword'>New Password:</label>
						<input
							type='password'
							name='newPassword'
							id='newPassword'
							autoComplete='new-password'
							onChange={handleChange}
							value={formData.newPassword}
							required
						/>
					</div>
					<div className='input'>
						<label htmlFor='confirmPassword'>Confirm Password:</label>
						<input
							type='password'
							name='confirmPassword'
							id='confirmPassword'
							autoComplete='off'
							onPaste={(e) => e.preventDefault()}
							onDrop={(e) => e.preventDefault()}
							onChange={handleChange}
							value={formData.confirmPassword}
							required
						/>
					</div>
					<button
						className='btn'
						type='submit'
						onClick={handleSubmit}>
						Change Password
					</button>
				</form>
			</div>
		</MobileDiv>
	);
};

export const MobileDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
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

		& > .password-info {
			width: calc(100% - 2ch);
			font-size: large;

			& > ul {
				margin: 1ch 0 0;
			}
		}

		& > form {
			width: 90%;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;

			& > .error-message {
				width: 100%;
				text-align: end;
				margin: 1ch 0;
			}

			& > .hide {
				color: transparent;
			}

			& > .show {
				color: #cc0000;
			}

			& > .input {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: start;
				align-items: center;

				& > label {
					width: 100%;
					text-align: left;
					font-size: large;
					margin-bottom: 0.5ch;
				}

				& > input {
					width: 100%;
					padding: 1ch;
					border: 1px solid #333;
					margin-bottom: 1ch;
				}
			}

			& > .btn {
				margin-bottom: 1ch;
			}
		}
	}
`;
