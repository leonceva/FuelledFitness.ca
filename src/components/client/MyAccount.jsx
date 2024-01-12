import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE_LIMIT;

const MyAccount = (props) => {
	const user = props.user;
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [edit, setEdit] = useState(false);
	const [changePassword, setChangePassword] = useState(false);
	const [infoMessage, setInfoMessage] = useState(null);
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const axiosPrivate = useAxiosPrivate();

	const handleChange = (e) => {
		e.preventDefault();
		setInfoMessage(null);

		if (e.target.name === 'first-name') {
			setFirstName(e.target.value);
		}
		if (e.target.name === 'last-name') {
			setLastName(e.target.value);
		}
		if (e.target.name === 'email') {
			setEmail(e.target.value);
		}
		if (e.target.name === 'new-password') {
			setNewPassword(e.target.value);
		}
		if (e.target.name === 'confirm-password') {
			setConfirmPassword(e.target.value);
		}
	};

	const updateInfo = async () => {
		if (verifyInputs() === true) {
			await axiosPrivate
				.patch('users', {
					firstName: firstName,
					lastName: lastName,
					email: email,
				})
				.then(() => {
					setEdit(false);
				})
				.catch(() => {
					console.log('Error');
				});
		}
	};

	const verifyInputs = () => {
		// First name
		if (firstName.length < 1 || firstName.length > 50) {
			setInfoMessage('First name must be between 1 and 50 characters');
			return false;
		}
		// Last name
		if (lastName.length < 1 || lastName.length > 50) {
			setInfoMessage('Last name must be between 1 and 50 characters');
			return false;
		}
		// Email
		if (
			!email.match(
				// eslint-disable-next-line no-useless-escape
				/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
		) {
			setInfoMessage('Invalid email format');
			return false;
		}
		setInfoMessage(null);
		return true;
	};

	const updatePassword = async () => {
		// Check password constraints
		if (checkConstraints() === true) {
			// Check if both password inputs match
			if (newPassword === confirmPassword) {
				// TODO axios endpoint to update password with JWT verify
				await axiosPrivate
					.put('/users/changePassword', {
						email: user.email,
						newPassword: newPassword,
					})
					.then((res) => {
						if (res?.status === 200) {
							setChangePassword(false);
							setNewPassword('');
							setConfirmPassword('');
						}
					})
					.catch((err) => {
						setInfoMessage(err?.data || 'Password request failed');
					});
			} else {
				setInfoMessage('Passwords do not match');
			}
		}
	};

	const checkConstraints = () => {
		if (newPassword.length < 6) {
			setInfoMessage('Password must be 6 characters or longer');
			return false;
		}
		if (newPassword.search(/[a-z]/) < 0) {
			setInfoMessage('Password must contain a lowercase letter');
			return false;
		}
		if (newPassword.search(/[A-Z]/) < 0) {
			setInfoMessage('Password must contain an uppercase letter');
			return false;
		}

		if (newPassword.search(/[0-9]/) < 0) {
			setInfoMessage('Password must contain a number');
			return false;
		}
		if (newPassword.search(/[^A-Za-z 0-9]/g) < 0) {
			setInfoMessage('Password must contain a special character');
			return false;
		}
		setInfoMessage(null);
		return true;
	};

	useEffect(() => {
		setFirstName(user.firstName);
		setLastName(user.lastName);
		setEmail(user.email);
	}, [user]);

	return (
		<>
			<MobileDiv>
				<form
					className='user-info'
					onSubmit={(e) => {
						e.preventDefault();
					}}>
					{changePassword === false && (
						<>
							<div className='info-type'>
								<span className='label'>First Name:</span>
								<input
									type='text'
									autoComplete='first'
									name='first-name'
									className={`info ${edit ? '' : 'disabled'}`}
									value={firstName}
									onChange={handleChange}
									required
								/>
							</div>
							<div className='info-type'>
								<span className='label'>Last Name:</span>
								<input
									type='text'
									name='last-name'
									className={`info ${edit ? '' : 'disabled'}`}
									value={lastName}
									onChange={handleChange}
									required
								/>
							</div>
							<div className='info-type'>
								<span className='label'>Email:</span>
								<input
									type='email'
									name='email'
									className={`info ${edit ? '' : 'disabled'}`}
									value={email}
									onChange={handleChange}
									required
								/>
							</div>
						</>
					)}
					{changePassword === true && (
						<>
							<div className='password-info'>
								Please enter the new password for your account. <br />
								<ul>
									<li>The new password must be at least 6 characters long.</li>
									<li>
										The new password must contain the following: a lowercase
										leter, an upeprcase letter, a number, and a special
										character.
									</li>
								</ul>
							</div>
							<div className='info-type'>
								<input
									type='password'
									autoComplete='off'
									name='new-password'
									className='password'
									value={newPassword}
									onChange={handleChange}
									required
									placeholder='New Password'
								/>
							</div>
							<div className='info-type'>
								<input
									type='password'
									autoComplete='off'
									name='confirm-password'
									className='password'
									value={confirmPassword}
									onChange={handleChange}
									required
									placeholder='Confirm New Password'
									onPaste={(e) => e.preventDefault()}
									onDrop={(e) => e.preventDefault()}
								/>
							</div>
						</>
					)}
					<div className='btn-container'>
						{edit === false && changePassword === false && (
							<>
								<button onClick={() => setEdit(true)}>Edit Info</button>
								<button onClick={() => setChangePassword(true)}>
									Change Password
								</button>
							</>
						)}
						{edit === true && (
							<>
								<button
									onClick={() => {
										updateInfo();
									}}>
									Apply Changes
								</button>
								<button
									className='cancel'
									onClick={() => {
										setEdit(false);
										setInfoMessage(null);
										setFirstName(user.firstName);
										setLastName(user.lastName);
										setEmail(user.email);
									}}>
									Cancel
								</button>
							</>
						)}
						{changePassword === true && (
							<>
								<button
									onClick={() => {
										updatePassword();
									}}>
									Apply Changes
								</button>
								<button
									className='cancel'
									onClick={() => {
										setChangePassword(false);
										setInfoMessage(null);
										setNewPassword(undefined);
										setConfirmPassword(undefined);
									}}>
									Cancel
								</button>
							</>
						)}
					</div>
					<div className={`info-message ${infoMessage === null ? 'hidden' : ''}`}>
						{infoMessage}
					</div>
				</form>
			</MobileDiv>
			<DesktopDiv>
				<h3>User Account Settings</h3>
				<form
					className='user-info'
					onSubmit={(e) => {
						e.preventDefault();
					}}>
					{changePassword === false && (
						<>
							<div className='info-type'>
								<span className='label'>First Name:</span>
								<input
									type='text'
									autoComplete='first'
									name='first-name'
									className={`info ${edit ? '' : 'disabled'}`}
									value={firstName}
									onChange={handleChange}
									required
								/>
							</div>
							<div className='info-type'>
								<span className='label'>Last Name:</span>
								<input
									type='text'
									name='last-name'
									className={`info ${edit ? '' : 'disabled'}`}
									value={lastName}
									onChange={handleChange}
									required
								/>
							</div>
							<div className='info-type'>
								<span className='label'>Email:</span>
								<input
									type='email'
									name='email'
									className={`info ${edit ? '' : 'disabled'}`}
									value={email}
									onChange={handleChange}
									required
								/>
							</div>
						</>
					)}
					{changePassword === true && (
						<>
							<div className='password-info'>
								Please enter the new password for your account. <br />
								<ul>
									<li>The new password must be at least 6 characters long.</li>
									<li>
										The new password must contain the following: a lowercase
										leter, an upeprcase letter, a number, and a special
										character.
									</li>
								</ul>
							</div>
							<div className='info-type'>
								<input
									type='password'
									autoComplete='off'
									name='new-password'
									className='password'
									value={newPassword}
									onChange={handleChange}
									required
									placeholder='New Password'
								/>
							</div>
							<div className='info-type'>
								<input
									type='password'
									autoComplete='off'
									name='confirm-password'
									className='password'
									value={confirmPassword}
									onChange={handleChange}
									required
									placeholder='Confirm New Password'
									onPaste={(e) => e.preventDefault()}
									onDrop={(e) => e.preventDefault()}
								/>
							</div>
						</>
					)}
					<div className='btn-container'>
						{edit === false && changePassword === false && (
							<>
								<button onClick={() => setEdit(true)}>Edit Info</button>
								<button onClick={() => setChangePassword(true)}>
									Change Password
								</button>
							</>
						)}
						{edit === true && (
							<>
								<button
									onClick={() => {
										updateInfo();
									}}>
									Apply Changes
								</button>
								<button
									className='cancel'
									onClick={() => {
										setEdit(false);
										setInfoMessage(null);
										setFirstName(user.firstName);
										setLastName(user.lastName);
										setEmail(user.email);
									}}>
									Cancel
								</button>
							</>
						)}
						{changePassword === true && (
							<>
								<button
									onClick={() => {
										updatePassword();
									}}>
									Apply Changes
								</button>
								<button
									className='cancel'
									onClick={() => {
										setChangePassword(false);
										setInfoMessage(null);
										setNewPassword(undefined);
										setConfirmPassword(undefined);
									}}>
									Cancel
								</button>
							</>
						)}
					</div>
					<div className={`info-message ${infoMessage === null ? 'hidden' : ''}`}>
						{infoMessage}
					</div>
				</form>
			</DesktopDiv>
		</>
	);
};

export const MobileDiv = styled.div`
	display: none;

	@media screen and (max-width: ${MOBILE_MODE_LIMIT}) {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;

		& > .user-info {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;
			margin-top: 1em;

			& > .info-type {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: center;
				margin-bottom: 0.5em;

				& > span {
					text-align: right;
					min-width: 100px;
					max-width: 50%;
					margin-right: 0.5em;
				}

				& > .info {
					flex: 1;
					margin-right: 1em;
					max-width: 300px;
					border: 1px solid #333;
				}

				& > .disabled {
					pointer-events: none;
					background-color: lightgray;
				}

				& > .password {
					flex: 1;
					max-width: 300px;
					align-self: center;
				}
			}

			& > .password-info {
				width: 100%;
				padding: 0 1em;
			}

			& > .btn-container {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;

				& > button {
					margin: 0 0.5em;
					background-color: #87ceeb;
					border: 2px solid #333;
					border-radius: 10px;
					padding: 3px 8px;
					color: #333;
					box-shadow: 2px 2px 2px #333;
					width: max-content;

					&:hover {
						background-color: #5f90a5;
						cursor: pointer;
					}
					&:active {
						translate: 2px 2px;
						box-shadow: 0 0 0;
					}
				}

				& > .cancel {
					background-color: #ff6666;

					&:hover {
						background-color: red;
					}
				}
			}

			& > .info-message {
				color: red;
				margin-top: 0.5em;
				text-align: center;
				opacity: 1;
			}

			& > .hidden {
				&::after {
					content: 'placeholder';
					opacity: 0;
				}
			}
		}
	}
`;

export const DesktopDiv = styled.div`
	@media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		font-size: calc(min(2.5vw, 2.5vh));
		position: relative;
		z-index: 1;
		overflow-y: scroll;
		position: relative;

		& > h3 {
			font-size: calc(min(3vw, 3vh));
			width: 100%;
			margin-top: 1em;
			text-align: center;
			font-weight: bold;
		}

		& > .user-info {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;
			margin-top: 1em;

			& > .info-type {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: center;
				margin-bottom: 0.5em;

				& > span {
					text-align: right;
					min-width: 100px;
					max-width: 50%;
					margin-right: 0.5em;
				}

				& > .info {
					flex: 1;
					margin-right: 1em;
					max-width: 300px;
					border: 1px solid #333;
				}

				& > .disabled {
					pointer-events: none;
					background-color: lightgray;
				}

				& > .password {
					flex: 1;
					max-width: 300px;
					align-self: center;
				}
			}

			& > .password-info {
				width: 80%;
				padding: 0 1em;
			}

			& > .btn-container {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				margin-top: 1em;

				& > button {
					margin: 0 0.5em;
					background-color: #87ceeb;
					border: 2px solid #333;
					border-radius: 10px;
					padding: 3px 8px;
					color: #333;
					box-shadow: 2px 2px 2px #333;
					width: max-content;

					&:hover {
						background-color: #5f90a5;
						cursor: pointer;
					}
					&:active {
						translate: 2px 2px;
						box-shadow: 0 0 0;
					}
				}

				& > .cancel {
					background-color: #ff6666;

					&:hover {
						background-color: red;
					}
				}
			}

			& > .info-message {
				color: red;
				margin-top: 0.5em;
				text-align: center;
				opacity: 1;
			}

			& > .hidden {
				&::after {
					content: 'placeholder';
					opacity: 0;
				}
			}
		}
	}

	@media screen and ((max-width: ${MOBILE_MODE_LIMIT})or (width: ${MOBILE_MODE_LIMIT})) {
		display: none;
	}
`;

export default MyAccount;
