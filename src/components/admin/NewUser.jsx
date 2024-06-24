import { useState } from 'react';
import styled from 'styled-components';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE_LIMIT;

const NewUser = () => {
	const axiosPrivate = useAxiosPrivate();

	// Form data content
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		role: '',
	});

	const [formError, setFormError] = useState(null);

	const handlesubmit = (e) => {
		// Prevent default form behavior
		e.preventDefault();
		// Check valid inputs
		if (validateInputs()) {
			// Send Form data
			sendFormData();
		}
	};

	// Form input field change
	const handleChange = (e) => {
		const { name, value } = e.target;
		// Update form data
		setFormData((prevFormData) => {
			return { ...prevFormData, [name]: value };
		});
	};

	// Input validation
	const validateInputs = () => {
		// First name
		if (formData.firstName.length < 1 || formData.firstName.length > 50) {
			setFormError('Name must be between 1 and 50 characters');
			return false;
		}
		// Last name
		if (formData.lastName.length < 1 || formData.lastName.length > 50) {
			setFormError('Name must be between 1 and 50 characters');
			return false;
		}
		// Email
		if (
			!formData.email.match(
				// eslint-disable-next-line no-useless-escape
				/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
		) {
			setFormError('Invalid email');
			return false;
		}
		// Role
		if (formData.role === '') {
			setFormError('User type missing');
			return false;
		}
		setFormError(null);
		return true;
	};

	const sendFormData = async () => {
		await axiosPrivate
			.post('/users', {
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				role: formData.role,
			})
			.then((res) => {
				// Clear form data
				console.log('Success');
				setFormData({
					firstName: '',
					lastName: '',
					email: '',
					role: '',
				});
			})
			.catch((err) => {
				console.log(err?.response?.status);

				if (err?.response?.status) {
					switch (err.response.status) {
						case 503:
							setFormError('Database Error');
							break;
						case 409:
							setFormError('Email already registered');
							break;
						default:
							setFormError('Account creation failed');
							break;
					}
				} else {
					console.log(err);
					setFormError('Service Failed - check logs');
				}
			});
	};
	return (
		<>
			<DesktopDiv>
				<h3>Create New User</h3>
				<form
					action=''
					method='post'
					onSubmit={handlesubmit}>
					<div className={formError === null ? 'hide-error' : 'show-error'}>
						{formError}
					</div>
					<div className='input'>
						<label htmlFor='first-name'>First Name:</label>
						<input
							type='text'
							name='firstName'
							id='first-name'
							required
							value={formData.firstName}
							onChange={handleChange}
							autoComplete='off'
						/>
					</div>
					<div className='input'>
						<label htmlFor='last-name'>Last Name:</label>
						<input
							type='text'
							name='lastName'
							id='last-name'
							required
							value={formData.lastName}
							onChange={handleChange}
							autoComplete='off'
						/>
					</div>
					<div className='input'>
						<label htmlFor='email'>Email:</label>
						<input
							type='email'
							name='email'
							id='email'
							required
							value={formData.email}
							onChange={handleChange}
							autoComplete='off'
						/>
					</div>
					<div className='input'>
						<label htmlFor='role'>Role:</label>
						<select
							name='role'
							id='role'
							onChange={handleChange}
							required>
							<option
								name='role'
								value=''
								style={{ display: 'none' }}>
								Select User Type
							</option>
							<option
								name='role'
								value='active'>
								Active Client
							</option>
							<option
								name='role'
								value='inactive'>
								Inactive Client
							</option>
							<option
								name='role'
								value='admin'>
								Admin Account
							</option>
						</select>
					</div>
					<button>Create User Account</button>
				</form>
			</DesktopDiv>
		</>
	);
};

export default NewUser;

export const DesktopDiv = styled.div`
	// Display for desktop size
	@media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		font-size: large;
		position: absolute;
		overflow-x: hidden;
		overflow-y: scroll;

		& > h3 {
			font-size: x-large;
			width: 100%;
			margin: 1ch 0 2ch;
			text-align: center;
		}

		& form {
			width: auto;
			max-width: 90%;
			max-height: fit-content;
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;
			font-size: large;

			& > .show-error {
				width: 100%;
				text-align: end;
				height: fit-content;
				color: red;
			}

			& > .hide-error {
				width: 100%;
				text-align: end;
				height: fit-content;
				color: red;
				opacity: 0;

				&::after {
					content: 'placeholder';
				}
			}

			& > .input {
				width: 100%;
				padding: 1ch 0;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: start;
				font-size: large;

				& > label {
					width: 13ch;
					text-align: right;
					padding-right: 1ch;
				}

				& > input,
				select {
					flex: 1;
					padding: 3px 5px;
					font-size: large;
				}
			}

			& > button {
				height: 100%;
				color: white;
				background-color: black;
				border: 3px solid #87ceeb;
				border-radius: 10px;
				box-shadow: 2px 2px 2px #87ceeb;
				width: max-content;
				padding: 5px 10px;
				font-size: large;
				margin-top: 10px;

				@media (hover: hover) and (pointer: fine) {
					&:hover {
						cursor: pointer;
						background-color: #87ceeb;
						color: black;
					}

					&:active {
						translate: 2px 2px;
						box-shadow: none;
					}
				}
			}
		}
	}

	// Hide for mobile size
	@media screen and ((max-width: ${MOBILE_MODE_LIMIT}) or (width: ${MOBILE_MODE_LIMIT})) {
		display: none;
	}
`;
