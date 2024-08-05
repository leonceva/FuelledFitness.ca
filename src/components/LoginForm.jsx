import { useEffect, useState } from 'react';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import { useContext } from 'react';
import PersistLoginInfo from './PersistLoginInfo';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

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

	// Handle form input change
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
		<div className='login-form'>
			<h2>Login</h2>
			<div className='google-login'>
				<GoogleLogin
					width={250}
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
					autoComplete='on'
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
						Forgot Password?
					</a>
				</div>
				<button className='btn'>Login</button>
			</form>
		</div>
	);
};

export default LoginForm;
