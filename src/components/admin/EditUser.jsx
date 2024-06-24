import styled from 'styled-components';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useEffect, useState, useRef } from 'react';
import Loader from './Loader';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE_LIMIT;

const EditUser = () => {
	const axiosPrivate = useAxiosPrivate();
	const [users, setUsers] = useState(null);
	const [selectedUser, setSelectedUser] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [searchIndex, setSearchIndex] = useState(null);
	const currentSearchIndex = useRef(searchIndex);
	const [hasChanged, setHasChanged] = useState(false);
	const [selectedDelete, setSelectedDelete] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [awaiting, setAwaiting] = useState(false);

	const [enableForm, setEnableForm] = useState(false);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		role: 'active',
	});

	const resetAll = () => {
		setFormData({
			firstName: '',
			lastName: '',
			email: '',
			role: 'active',
		});
		setSelectedUser('');
		setSearchValue('');
		setSearchIndex(null);
		setHasChanged(false);
		setSelectedDelete(false);
		const changedElements = document.querySelectorAll('#changed');
		changedElements.forEach((element) => {
			element.remove();
		});
		document.getElementById('firstName').disabled = true;
		document.getElementById('lastName').disabled = true;
		document.getElementById('email').disabled = true;
		document.getElementById('role').disabled = true;
	};

	// Handle change to the user search field
	const onChangeSearch = (e) => {
		setSearchValue(e.target.value);
		setSearchIndex(null);
	};

	// When pressed Enter in search, select top option as the user
	const onKeyDown = (e) => {
		// Get all the list elements from the search result
		const searchElements = document.querySelectorAll('.dropdown-row');
		const countSearchElements = searchElements.length;

		if (e.code === 'Enter') {
			if (currentSearchIndex.current !== null) {
				// console.log(searchElements[currentSearchIndex.current]);
				searchElements[currentSearchIndex.current].click();
			}
		}
		if (e.code === 'ArrowDown') {
			// Initial case
			if (searchIndex === null) {
				setSearchIndex(0);
				currentSearchIndex.current = 0;
			}
			// If reached the end at bottom, wrap around to index 0
			else if (searchIndex >= countSearchElements - 1) {
				setSearchIndex(0);
				currentSearchIndex.current = 0;
			}
			// Otherwise, add 1 to index
			else {
				setSearchIndex(currentSearchIndex.current + 1);
				currentSearchIndex.current++;
			}

			// Remove highlight from all list elements
			searchElements.forEach((element) => {
				element.classList.remove('hover');
			});
			// Highlight only current index element
			if (currentSearchIndex.current !== null) {
				// Remove hover class from all search li elements
				searchElements?.forEach((element) => {
					element?.classList?.remove('hover');
				});
				// Add hover class to current index li element
				searchElements[currentSearchIndex.current]?.classList?.add('hover');
			}
		}
		if (e.code === 'ArrowUp') {
			// Initial case
			if (searchIndex === null) {
				setSearchIndex(countSearchElements - 1);
				currentSearchIndex.current = countSearchElements - 1;
			}
			// If reached the end at top, wrap around to last index
			else if (searchIndex <= 0) {
				setSearchIndex(countSearchElements - 1);
				currentSearchIndex.current = countSearchElements - 1;
			}
			// Otherwise, remove 1 to index
			else {
				setSearchIndex(currentSearchIndex.current - 1);
				currentSearchIndex.current--;
			}

			// Remove highlight from all list elements
			searchElements.forEach((element) => {
				element.classList.remove('hover');
			});
			// Highlight only current index element
			if (currentSearchIndex.current !== null) {
				// Remove hover class from all search li elements
				searchElements?.forEach((element) => {
					element?.classList?.remove('hover');
				});
				// Add hover class to current index li element
				searchElements[currentSearchIndex.current]?.classList?.add('hover');
			}
		}
	};

	// When a user is selected from the dropdown search results
	const onClick = (e) => {
		users.map((user) => {
			// console.log(user);
			if (user[0] === e.target.innerHTML) {
				setSelectedUser(user);
				setSearchValue('');
				document.getElementById('firstName').disabled = false;
				document.getElementById('lastName').disabled = false;
				document.getElementById('email').disabled = false;
				document.getElementById('role').disabled = false;
				return null;
			}
			return null;
		});
	};

	// When search item is hovered
	const onMouseMove = (e) => {
		const searchElements = document?.querySelectorAll('.dropdown-row');
		const itemId = e.target.id;
		const itemIndex = itemId.slice(itemId.indexOf('-') + 1);
		setSearchIndex(itemIndex);
		currentSearchIndex.current = itemIndex;

		// Remove highlight from all list elements
		searchElements.forEach((element) => {
			element.classList.remove('hover');
		});
		// Highlight only current index element
		if (currentSearchIndex.current !== null) {
			// Remove hover class from all search li elements
			searchElements?.forEach((element) => {
				element?.classList?.remove('hover');
			});
			// Add hover class to current index li element
			searchElements[currentSearchIndex.current]?.classList?.add('hover');
		}
	};

	// When a user is no longer hovered with mouse
	const onMouseLeaveSearch = (e) => {
		const searchElements = document?.querySelectorAll('.dropdown-row');
		const itemId = e.target.id;
		const itemIndex = itemId.slice(itemId.indexOf('-') + 1);

		// Remove hover class for element
		searchElements[itemIndex]?.classList?.remove('hover');
	};

	// To prevent submit on Enter
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	// Get an array of all the users in the database
	const getUsers = async () => {
		setAwaiting(true);
		await axiosPrivate
			.get('/users')
			.then((res) => {
				setUsers(
					res?.data?.rows?.map((user, i) => {
						//console.log(res.data.rows);
						return [
							user.last_name + ', ' + user.first_name,
							user.user_id,
							user.email,
							user.user_type,
						];
					})
				);
			})
			.catch((res) => {
				alert(res);
			})
			.finally(() => {
				setAwaiting(false);
			});
	};

	// Handle change to the user data form
	const handleChangeForm = (e) => {
		const changeSign = document.createElement('i');
		changeSign.classList.add('bi');
		changeSign.classList.add('bi-exclamation-circle');
		changeSign.classList.add('changed');
		changeSign.setAttribute('id', 'changed');

		e.target.previousSibling.insertAdjacentElement('beforebegin', changeSign);

		const { name, value } = e.target;
		// Update form data
		setFormData((prevFormData) => {
			return { ...prevFormData, [name]: value };
		});
		setHasChanged(true);
	};

	// When an user is selected, get the details from the database
	useEffect(() => {
		if (selectedUser === '') {
			setEnableForm(false);
		} else {
			setEnableForm(true);
		}

		setSelectedDelete(false);
		setHasChanged(false);
		//
		if (selectedUser !== '') {
			const firstName = selectedUser[0].slice(selectedUser[0].indexOf(',') + 2);
			const lastName = selectedUser[0].slice(0, selectedUser[0].indexOf(','));
			const userEmail = selectedUser[2];
			const userType = selectedUser[3];

			setFormData({
				firstName: firstName,
				lastName: lastName,
				email: userEmail,
				role: userType,
			});

			// console.log(`First Name: ${firstName}\nLast Name: ${lastName}\nUser ID: ${userId}\nEmail: ${userEmail}`);
		}
	}, [selectedUser]);

	// Update user records in database
	const handleApplyChanges = () => {
		setAwaiting(true);
		// console.log("Applying Changes..");
		const changedElements = document.querySelectorAll('#changed');
		changedElements.forEach((element) => {
			element.remove();
		});

		// Send all form data to server
		try {
			updateUserInfo();
			resetAll();
		} catch {
			setAwaiting(false);
		}
	};

	// Patch request to update user data
	const updateUserInfo = async () => {
		await axiosPrivate
			.patch('/users', {
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				role: formData.role,
				id: selectedUser[1],
			})
			.then((res) => {
				// console.log(res);
			})
			.catch((err) => {
				console.log(err);
				if (err?.response?.status) {
					switch (err.response.status) {
						case 500:
							alert('Database Error');
							break;
						case 404:
							alert('User not found in database');
							break;
						case 401:
							alert('Unauthorized account request');
							break;
						default:
							alert('Account creation failed');
							break;
					}
				} else {
					console.log(err);
					alert('Service Failed - check logs');
				}
			})
			.finally(() => {
				getUsers();
				setAwaiting(false);
			});
	};

	// Delete user from database
	const handleDelete = () => {
		setAwaiting(true);
		try {
			deleteUser();
			resetAll();
		} catch {
			setAwaiting(false);
		}
	};

	const deleteUser = async () => {
		await axiosPrivate
			.delete('/users', { data: { id: selectedUser[1] } })
			.then((res) => {
				// console.log(res);
			})
			.catch((err) => {
				console.log(err);
				if (err?.response?.status) {
					switch (err.response.status) {
						case 500:
							alert('Databse error');
							break;
						case 404:
							alert('User not found in database');
							break;
						case 401:
							alert('Unauthorized account request');
							break;
						default:
							alert('Account creation failed');
							break;
					}
				} else {
					console.log(err);
					alert('Service Failed - check logs');
				}
			})
			.finally(() => {
				getUsers();
				setAwaiting(false);
			});
	};

	// On render
	useEffect(() => {
		resetAll();
		getUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<DesktopDiv>
				{awaiting && <Loader />}
				<h3>Edit Existing User</h3>
				<div className='search'>
					<label htmlFor='search'>User:</label>
					<div className='search-results'>
						<input
							type='text'
							name='user'
							id='search'
							onChange={onChangeSearch}
							value={searchValue}
							onKeyDown={onKeyDown}
							placeholder='Type a name to begin search'
						/>

						{searchValue && (
							<div className='dropdown'>
								{users
									?.filter((user) => {
										return user[0]
											.toLowerCase()
											.includes(searchValue.toLowerCase());
									})
									.slice(0, 10)
									.sort()
									.map((user, i) => {
										return (
											<li
												id={`user-${i}`}
												key={user[1]}
												className='dropdown-row'
												onClick={onClick}
												onMouseMove={onMouseMove}
												onMouseLeave={onMouseLeaveSearch}>
												{user[0]}
											</li>
										);
									})}
							</div>
						)}
					</div>
				</div>
				<br />
				<form
					action=''
					method='put'
					onSubmit={handleSubmit}>
					<div className='input'>
						<label htmlFor='firstName'>First Name:</label>
						<input
							type='text'
							name='firstName'
							id='firstName'
							onChange={handleChangeForm}
							required
							value={formData.firstName}
							disabled={!enableForm}
						/>
					</div>
					<div className='input'>
						<label htmlFor='lastName'>Last Name:</label>
						<input
							type='text'
							name='lastName'
							id='lastName'
							onChange={handleChangeForm}
							required
							value={formData.lastName}
							disabled={!enableForm}
						/>
					</div>
					<div className='input'>
						<label htmlFor='email'>Email:</label>
						<input
							type='email'
							name='email'
							id='email'
							onChange={handleChangeForm}
							required
							value={formData.email}
							disabled={!enableForm}
						/>
					</div>
					<div className='input'>
						<label htmlFor='role'>User Type</label>
						<select
							name='role'
							id='role'
							onChange={handleChangeForm}
							required
							value={formData.role}
							disabled={!enableForm}>
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
				</form>
				<div className='btn-container'>
					<button
						className={`${hasChanged ? '' : 'disabled'}`}
						onClick={handleApplyChanges}>
						Apply Changes
					</button>
					<button
						onClick={() => {
							resetAll();
						}}>
						Clear Form
					</button>
					<button
						className={`delete ${selectedUser ? '' : 'disabled'}`}
						onClick={() => {
							setSelectedDelete(true);
						}}>
						Delete User
					</button>
				</div>
				{selectedDelete && (
					<div className='btn-container'>
						<p>
							<strong>This cannot be undone, continue?</strong>
						</p>
						<button
							onClick={() => {
								setSelectedDelete(false);
							}}>
							No
						</button>
						<button onClick={handleDelete}>Yes</button>
					</div>
				)}
			</DesktopDiv>
		</>
	);
};

export default EditUser;

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

		& > .search {
			display: flex;
			width: 100%;
			flex-direction: row;
			justify-content: center;
			text-align: center;

			& label {
				width: fit-content;
				text-align: end;
				padding-right: 2ch;
				font-size: large;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			& > .search-results {
				width: calc(min(400px, 50%));
				font-size: large;
				display: flex;
				flex-direction: column;
				position: relative;

				& > input {
					width: 100%;
					font-size: large;
					text-align: start;
					padding: 0.5ch;
				}

				& > .dropdown {
					width: 100%;
					color: black;
					background-color: white;
					border: solid 2px black;
					position: absolute;
					top: 100%;
					z-index: 2;

					& > .dropdown-row {
						list-style: none;
						padding: 0.5ch 0;

						@media (hover: hover) and (pointer: fine) {
							&:hover {
								cursor: pointer;
							}
						}
					}

					@media (hover: hover) and (pointer: fine) {
						& > .hover {
							background-color: lightgray;
						}
					}
				}
			}
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

			& > .input {
				width: 100%;
				padding: 1ch 0;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: start;
				font-size: large;
				position: relative;

				& > .changed {
					position: absolute;
					height: 100%;
					display: flex;
					align-items: center;
					left: 100%;
					padding-left: 1ch;
					justify-content: end;
					font-size: large;
					color: yellow;
				}

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

		& > .btn-container {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			& > button {
				color: white;
				background-color: black;
				border: 3px solid #87ceeb;
				border-radius: 10px;
				box-shadow: 2px 2px 2px #87ceeb;
				width: max-content;
				padding: 5px 10px;
				font-size: large;
				margin: 10px 10px 0;

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

			& > .disabled {
				background-color: grey !important;
				pointer-events: none !important;
			}

			& > .delete {
				background-color: #ff6666;
				font-weight: bold;

				&:hover {
					background-color: red;
				}
			}

			& > p {
				margin-top: 1ch;
				padding-top: 1ch;
				height: 100%;
				max-width: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: large;
				text-align: end;
			}
		}
	}

	// Hide for mobile size
	@media screen and ((max-width: ${MOBILE_MODE_LIMIT}) or (width: ${MOBILE_MODE_LIMIT})) {
		display: none;
	}
`;
