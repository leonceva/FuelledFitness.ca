import styled from 'styled-components';
import DesktopLayout from '../layouts/DesktopLayout';
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE_LIMIT;

const ResetPassword = () => {
	return (
		<>
			<DesktopLayout content={<DesktopContent />} />
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
					<div>
						Please enter the new password for your account. <br />
						<ul>
							<li>The new password must be at least 6 characters long.</li>
							<li>
								The new password must contain the following: a lowercase leter, an
								upeprcase letter, a number, and a special character.
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
	@media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
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
		}

		& > h2 {
			width: 100%;
			font-size: xx-large;
			margin: 0;
			padding: 0;
			text-align: center;
		}
	}

	@media screen and ((max-width: ${MOBILE_MODE_LIMIT} )or (width: ${MOBILE_MODE_LIMIT})) {
	}
`;
