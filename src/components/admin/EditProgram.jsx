import styled from 'styled-components';
import Loader from './Loader';
import LoaderMobile from '../client/LoaderMobile';
import { useState, useRef, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE_LIMIT;

const EditProgram = () => {
	const [awaiting, setAwaiting] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [users, setUsers] = useState(null);
	const [selectedUser, setSelectedUser] = useState('');
	const [searchIndex, setSearchIndex] = useState(null);
	const currentSearchIndex = useRef(searchIndex);
	const [programList, setProgramList] = useState(null);
	const [selectedProgram, setSelectedProgram] = useState('');
	const [alertMessage, setAlertMessage] = useState('');
	const [allowSubmit, setAllowSubmit] = useState(false);
	const [clickedDelete, setClickedDelete] = useState(false);

	const axiosPrivate = useAxiosPrivate();

	const resetAll = () => {
		setSearchValue('');
		setSelectedUser('');
		setSearchIndex(null);
		setProgramList(null);
		setSelectedProgram('');
		setAllowSubmit(false);
		setClickedDelete(false);
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

	// Get an array of all the programs for the selected user
	const getPrograms = async (userId) => {
		setAwaiting(true);
		await axiosPrivate
			.get(`/programs/${userId}`)
			.then((res) => {
				setProgramList(res?.data);
			})
			.catch((err) => {
				console.log(err);
				setProgramList(null);
			})
			.finally(() => {
				setAwaiting(false);
			});
	};

	// Handle change to the user search field
	const onChangeSearch = (e) => {
		setSearchValue(e.target.value);
		setSearchIndex(null);
	};

	// When pressed Enter in search, select top option as the user
	const onKeyDownSearch = (e) => {
		// Get all the list elements from the search result
		const searchElements = document?.querySelectorAll('.dropdown-row');
		const countSearchElements = searchElements?.length;

		if (e.code === 'Enter') {
			if (currentSearchIndex?.current !== null) {
				// console.log(searchElements[currentSearchIndex.current]);
				searchElements[currentSearchIndex?.current]?.click();
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
	const onClickSearch = (e) => {
		users.map((user) => {
			// console.log(user);
			if (user[0] === e.target.innerHTML) {
				setSelectedUser(user);
				setSearchValue('');
				return null;
			}
			return null;
		});
	};

	// When search item is hovered
	const onMouseMoveSearch = (e) => {
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

	// Remove day
	const removeDay = (e) => {
		setAllowSubmit(true);
		const id = e.target.id;
		const dayIndex = id.charAt(4);

		// Deep copy edited program
		let editedProgram = JSON.parse(JSON.stringify(selectedProgram));
		// Copy workout list
		let workoutList = [...selectedProgram.workout];
		// Remove selected item
		workoutList.splice(dayIndex, 1);
		// Replace with new list
		editedProgram.workout = workoutList;
		// Update .day
		for (let i = 0; i < editedProgram?.workout?.length; i++) {
			editedProgram.workout[i].day = i + 1;
		}
		// Replace with new object
		setSelectedProgram(editedProgram);
	};

	// Add day
	const addDay = () => {
		setAllowSubmit(true);
		const numDay = selectedProgram?.workout?.length;

		// Deep copy edited program
		let editedProgram = JSON.parse(JSON.stringify(selectedProgram));
		// Copy workout list
		let workoutList = [
			...selectedProgram.workout,
			{
				day: numDay + 1,
				mobility: [],
				strength: [],
				conditioning: [],
			},
		];
		// Replace with new list
		editedProgram.workout = workoutList;
		// Replace with new object
		setSelectedProgram(editedProgram);
	};

	// Add mobility item
	const addMobilityItem = (dayIndex) => {
		setAllowSubmit(true);

		// Deep copy edited program
		let editedProgram = JSON.parse(JSON.stringify(selectedProgram));
		// Copy mobility list
		let mobilityList = [...selectedProgram.workout[dayIndex].mobility];
		// Add new blank item entry
		mobilityList.push({ name: '', sets: '', reps: '', comment: '' });
		// Replace with new list
		editedProgram.workout[dayIndex].mobility = mobilityList;
		// Replace with new object
		setSelectedProgram(editedProgram);
	};

	// Remove mobility item
	const removeMobilityItem = (e) => {
		setAllowSubmit(true);
		const id = e.target.id;
		const dayIndex = id.charAt(4);
		const itemIndex = id.slice(15, id.indexOf('-', 15));

		// Deep copy edited program
		let editedProgram = JSON.parse(JSON.stringify(selectedProgram));
		// Copy mobility list
		let mobilityList = [...selectedProgram.workout[dayIndex].mobility];
		// Remove selected item
		mobilityList.splice(itemIndex, 1);
		// Replace with new list
		editedProgram.workout[dayIndex].mobility = mobilityList;
		// Replace with new object
		setSelectedProgram(editedProgram);
	};

	// Handle mobility item change
	const handleMobilityChange = (e) => {
		setAllowSubmit(true);
		const { name, value, id } = e.target;
		const dayIndex = id.charAt(4);
		const itemIndex = id.slice(15, id.indexOf('-', 15));

		// Deep copy edited program
		let editedProgram = JSON.parse(JSON.stringify(selectedProgram));
		// Copy mobility list
		let mobilityList = [...selectedProgram.workout[dayIndex].mobility];
		// Change selected item
		mobilityList[itemIndex][name] = value;
		// Replace with new list
		editedProgram.workout[dayIndex].mobility = mobilityList;
		// Replace with new object
		setSelectedProgram(editedProgram);
	};

	// Add strength item
	const addStrengthItem = (dayIndex) => {
		setAllowSubmit(true);
		// Deep copy edited program
		let editedProgram = JSON.parse(JSON.stringify(selectedProgram));
		// Copy strength list
		let strengthList = [...selectedProgram.workout[dayIndex].strength];
		// Add new blank item entry
		strengthList.push({ name: '', sets: '', reps: '', load: '', comment: '' });
		// Replace with new list
		editedProgram.workout[dayIndex].strength = strengthList;
		// Replace with new object
		setSelectedProgram(editedProgram);
	};

	// Remove strength item
	const removeStrengthItem = (e) => {
		setAllowSubmit(true);
		const id = e.target.id;
		const dayIndex = id.charAt(4);
		const itemIndex = id.slice(15, id.indexOf('-', 15));

		// Deep copy edited program
		let editedProgram = JSON.parse(JSON.stringify(selectedProgram));
		// Copy strength list
		let strengthList = [...selectedProgram.workout[dayIndex].strength];
		// Remove selected item
		strengthList.splice(itemIndex, 1);
		// Replace with new list
		editedProgram.workout[dayIndex].strength = strengthList;
		// Replace with new object
		setSelectedProgram(editedProgram);
	};

	// Handle strength item change
	const handleStrengthChange = (e) => {
		setAllowSubmit(true);
		const { name, value, id } = e.target;
		const dayIndex = id.charAt(4);
		const itemIndex = id.slice(15, id.indexOf('-', 15));

		// Deep copy edited program
		let editedProgram = JSON.parse(JSON.stringify(selectedProgram));
		// Copy strength list
		let strengthList = [...selectedProgram.workout[dayIndex].strength];
		// Change selected item
		strengthList[itemIndex][name] = value;
		// Replace with new list
		editedProgram.workout[dayIndex].strength = strengthList;
		// Replace with new object
		setSelectedProgram(editedProgram);
	};

	// Add conditioning item
	const addConditioningItem = (dayIndex) => {
		setAllowSubmit(true);

		// Deep copy edited program
		let editedProgram = JSON.parse(JSON.stringify(selectedProgram));
		// Copy conditioning list
		let conditioningList = [...selectedProgram.workout[dayIndex].conditioning];
		// Add new blank item entry
		conditioningList.push({ name: '', duration: '', comment: '' });
		// Replace with new list
		editedProgram.workout[dayIndex].conditioning = conditioningList;
		// Replace with new object
		setSelectedProgram(editedProgram);
	};

	// Remove conditioning item
	const removeConditioningItem = (e) => {
		setAllowSubmit(true);
		const id = e.target.id;
		const dayIndex = id.charAt(4);
		const itemIndex = id.slice(19, id.indexOf('-', 19));

		// Deep copy edited program
		let editedProgram = JSON.parse(JSON.stringify(selectedProgram));
		// Copy conditioning list
		let conditioningList = [...selectedProgram.workout[dayIndex].conditioning];
		// Remove selected item
		conditioningList.splice(itemIndex, 1);
		// Replace with new list
		editedProgram.workout[dayIndex].conditioning = conditioningList;
		// Replace with new object
		setSelectedProgram(editedProgram);
	};

	// Handle conditioning item change
	const handleConditioningChange = (e) => {
		setAllowSubmit(true);
		const { name, value, id } = e.target;
		const dayIndex = id.charAt(4);
		const itemIndex = id.slice(19, id.indexOf('-', 19));

		// Deep copy edited program
		let editedProgram = JSON.parse(JSON.stringify(selectedProgram));
		// Copy conditioning list
		let conditioningList = [...selectedProgram.workout[dayIndex].conditioning];
		// Change selected item
		conditioningList[itemIndex][name] = value;
		// Replace with new list
		editedProgram.workout[dayIndex].conditioning = conditioningList;
		// Replace with new object
		setSelectedProgram(editedProgram);
	};

	// Handle submit changes to program
	const handleSubmit = () => {
		setAwaiting(true);
		if (verifyValues() === true) {
			const programID = selectedProgram.program_id;
			const programList = [...selectedProgram.workout];
			axiosPrivate
				.patch(`/programs/${programID}`, {
					email: selectedUser[2],
					program: programList,
				})
				.then((res) => {
					setAlertMessage(res?.data);
					if (res?.status === 201) {
						resetAll();
					}
				})
				.catch((err) => {
					setAlertMessage('Unable to update program, check logs');
					console.log(err);
				})
				.finally(() => {
					setAwaiting(false);
				});
		}
	};

	const verifyValues = () => {
		var errorMessage = '';
		selectedProgram?.workout?.forEach((day, dayIndex) => {
			// Check if day is empty
			if (
				day.mobility.length === 0 &&
				day.strength.length === 0 &&
				day.conditioning.length === 0
			) {
				errorMessage = `Day ${dayIndex + 1} is empty`;
				return false;
			} else {
				if (day.mobility.length !== 0) {
					day.mobility.forEach((item, itemIndex) => {
						// Check .name
						if (item.name === '') {
							// Check if empty
							errorMessage = `Day ${dayIndex + 1}\nMobility #${
								itemIndex + 1
							} - Name is empty`;
							return false;
						}
						// Check .sets
						if (item.sets === '') {
							// Check if empty
							errorMessage = `Day ${dayIndex + 1}\nMobility #${
								itemIndex + 1
							} - Sets is empty`;
							return false;
						} else if (item.sets <= 0) {
							// Check if negative
							errorMessage = `Day ${dayIndex + 1}\nMobility #${
								itemIndex + 1
							} - Sets number invalid`;
						}
						// Check .reps
						if (item.reps === '') {
							// Check if empty
							errorMessage = `Day ${dayIndex + 1}\nMobility #${
								itemIndex + 1
							} - Reps is empty`;
							return false;
						} else if (item.reps <= 0) {
							// Check if negative
							errorMessage = `Day ${dayIndex + 1}\nMobility #${
								itemIndex + 1
							} - Reps number invalid`;
						}
					});
				}
				if (day.strength.length !== 0) {
					day.strength.forEach((item, itemIndex) => {
						// Check .name
						if (item.name === '') {
							// Check if empty
							errorMessage = `Day ${dayIndex + 1}\nStrength #${
								itemIndex + 1
							} - Name is empty`;
							return false;
						}
						// Check .sets
						if (item.sets === '') {
							// Check if empty
							errorMessage = `Day ${dayIndex + 1}\nStrength #${
								itemIndex + 1
							} - Sets is empty`;
							return false;
						} else if (item.sets <= 0) {
							// Check if negative
							errorMessage = `Day ${dayIndex + 1}\nStrength #${
								itemIndex + 1
							} - Sets number invalid`;
						}
						// Check .reps
						if (item.reps === '') {
							// Check if empty
							errorMessage = `Day ${dayIndex + 1}\nStrength #${
								itemIndex + 1
							} - Reps is empty`;
							return false;
						} else if (item.reps <= 0) {
							// Check if negative
							errorMessage = `Day ${dayIndex + 1}\nStrength #${
								itemIndex + 1
							} - Reps number invalid`;
						}
						// Check .load
						if (item.load < 0) {
							// Check if negative
							errorMessage = `Day ${dayIndex + 1}\nStrength #${
								itemIndex + 1
							} - Load number invalid`;
						}
					});
				}
				if (day.conditioning.length !== 0) {
					day.conditioning.forEach((item, itemIndex) => {
						// Check .name
						if (item.name === '') {
							// Check if empty
							errorMessage = `Day ${dayIndex + 1}\nConditioning #${
								itemIndex + 1
							} - Name is empty`;
							return false;
						}
						// Check .duration
						if (item.duration <= 0) {
							// Check if negative
							errorMessage = `Day ${dayIndex + 1}\nConditioning #${
								itemIndex + 1
							} - Duration number invalid`;
						}
					});
				}
			}
		});
		if (errorMessage === '') {
			return true;
		} else {
			setAlertMessage(errorMessage);
			return false;
		}
	};

	// Handle delete program
	const handleDelete = async () => {
		setAwaiting(true);
		const programID = selectedProgram.program_id;

		await axiosPrivate
			.delete(`/programs/${programID}`, { data: { email: selectedUser[2] } })
			.then((res) => {
				setAlertMessage(res?.data);
				if (res?.status === 200) {
					resetAll();
				}
			})
			.catch((err) => {
				setAlertMessage('Unable to delete program, check logs');
				console.log(err);
			})
			.finally(() => {
				setAwaiting(false);
				setClickedDelete(false);
			});
	};

	// When an user is selected, get the details from the database
	useEffect(() => {
		if (selectedUser !== '') {
			const userId = selectedUser[1];
			getPrograms(userId);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedUser]);

	// When the program list is updated
	useEffect(() => {
		// Set the default selected program to first item (most recently released)
		if (programList?.length > 0) {
			setSelectedProgram(programList[0]);
		}
	}, [programList]);

	useEffect(() => {
		resetAll();
		getUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<DesktopDiv>
				{alertMessage !== '' && (
					<>
						<div
							className='alert-background'
							onClick={() => {
								setAlertMessage('');
							}}
						/>
						<div className='alert'>
							<button
								className='close'
								onClick={() => {
									setAlertMessage('');
								}}>
								X
							</button>
							<div className='message'>{alertMessage}</div>
						</div>
					</>
				)}
				{awaiting && <Loader />}
				<h3>Edit Weekly Program</h3>
				<div className='search'>
					<label htmlFor='search'>User:</label>
					<div className='search-results'>
						<input
							type='text'
							name='search'
							id='search'
							onChange={onChangeSearch}
							value={searchValue}
							onKeyDown={onKeyDownSearch}
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
												onClick={onClickSearch}
												onMouseMove={onMouseMoveSearch}
												onMouseLeave={onMouseLeaveSearch}>
												{user[0]}
											</li>
										);
									})}
							</div>
						)}
					</div>
				</div>
				{selectedUser !== '' && (
					<>
						<div className='header'>
							<span className='name'>
								Client:<strong>{selectedUser[0]}</strong>
							</span>
						</div>

						{programList?.length === 0 && <div>No Program Info</div>}

						{programList?.length > 0 && (
							<div className='program-container'>
								<div className='program-select'>
									<label className='label'>Release Date:</label>
									<select
										name='release-date'
										id='release-date'
										onChange={(e) => {
											e.preventDefault();
											e.stopPropagation();
											setSelectedProgram(programList[e?.target?.value]);
										}}>
										{programList.map((program, programIndex) => {
											if (programIndex < 10) {
												return (
													<option
														value={programIndex}
														key={`release-desktop-${programIndex}`}>{`${
														program.release_date.split('T')[0]
													}`}</option>
												);
											} else {
												return null;
											}
										})}
									</select>
									<span className='info'>
										(only last 10 entries available to edit)
									</span>
								</div>
								<div className='program-data'>
									{selectedProgram?.workout?.map((day, dayIndex) => {
										return (
											<div className='day'>
												<div className='title'>
													<strong>{`Day ${day.day}`}</strong>
													<button
														id={`day-${dayIndex}`}
														key={`day-${dayIndex}`}
														onClick={(e) => {
															removeDay(e);
														}}>
														Remove Day
													</button>
												</div>
												<div className='category'>
													<div className='title'>
														<span
															onClick={() => {
																addMobilityItem(dayIndex);
															}}>
															Add Mobility
														</span>
													</div>
													{day.mobility?.map((item, itemIndex) => {
														return (
															<div
																className='item-mobility'
																id={`day-${dayIndex}-mobility-${itemIndex}`}
																key={`day-${dayIndex}-mobility-${itemIndex}`}>
																<input
																	type='text'
																	name='name'
																	id={`day-${dayIndex}-mobility-${itemIndex}-name`}
																	key={`day-${dayIndex}-mobility-${itemIndex}-name`}
																	value={
																		day.mobility[itemIndex].name
																	}
																	placeholder='Name'
																	onChange={(e) => {
																		handleMobilityChange(e);
																	}}
																/>
																<input
																	type='number'
																	name='sets'
																	id={`day-${dayIndex}-mobility-${itemIndex}-sets`}
																	key={`day-${dayIndex}-mobility-${itemIndex}-sets`}
																	value={
																		day.mobility[itemIndex].sets
																	}
																	placeholder='Sets'
																	min={1}
																	onChange={(e) => {
																		handleMobilityChange(e);
																	}}
																/>
																<input
																	type='number'
																	name='reps'
																	id={`day-${dayIndex}-mobility-${itemIndex}-reps`}
																	key={`day-${dayIndex}-mobility-${itemIndex}-reps`}
																	value={
																		day.mobility[itemIndex].reps
																	}
																	placeholder='Reps'
																	min={1}
																	onChange={(e) => {
																		handleMobilityChange(e);
																	}}
																/>
																<input
																	type='text'
																	name='comment'
																	id={`day-${dayIndex}-mobility-${itemIndex}-comment`}
																	key={`day-${dayIndex}-mobility-${itemIndex}-comment`}
																	value={
																		day.mobility[itemIndex]
																			.comment
																	}
																	placeholder='Comments (optional)'
																	onChange={(e) => {
																		handleMobilityChange(e);
																	}}
																/>
																<button
																	id={`day-${dayIndex}-mobility-${itemIndex}-button`}
																	key={`day-${dayIndex}-mobility-${itemIndex}-button`}
																	onClick={(e) =>
																		removeMobilityItem(e)
																	}>
																	X
																</button>
															</div>
														);
													})}
												</div>
												<div className='category'>
													<div className='title'>
														<span
															onClick={() => {
																addStrengthItem(dayIndex);
															}}>
															Add Strength
														</span>
													</div>
													{day.strength?.map((item, itemIndex) => {
														return (
															<div
																className='item-strength'
																id={`day-${dayIndex}-strength-${itemIndex}`}
																key={`day-${dayIndex}-strength-${itemIndex}`}>
																<input
																	type='text'
																	name='name'
																	id={`day-${dayIndex}-strength-${itemIndex}-name`}
																	key={`day-${dayIndex}-strength-${itemIndex}-name`}
																	value={
																		day.strength[itemIndex].name
																	}
																	placeholder='Name'
																	onChange={(e) => {
																		handleStrengthChange(e);
																	}}
																/>
																<input
																	type='number'
																	name='sets'
																	id={`day-${dayIndex}-strength-${itemIndex}-sets`}
																	key={`day-${dayIndex}-strength-${itemIndex}-sets`}
																	value={
																		day.strength[itemIndex].sets
																	}
																	placeholder='Sets'
																	min={1}
																	onChange={(e) => {
																		handleStrengthChange(e);
																	}}
																/>
																<input
																	type='number'
																	name='reps'
																	id={`day-${dayIndex}-strength-${itemIndex}-reps`}
																	key={`day-${dayIndex}-strength-${itemIndex}-reps`}
																	value={
																		day.strength[itemIndex].reps
																	}
																	placeholder='Reps'
																	min={1}
																	onChange={(e) => {
																		handleStrengthChange(e);
																	}}
																/>
																<input
																	type='number'
																	name='load'
																	id={`day-${dayIndex}-strength-${itemIndex}-load`}
																	key={`day-${dayIndex}-strength-${itemIndex}-load`}
																	value={
																		day.strength[itemIndex].load
																	}
																	placeholder='Load'
																	onChange={(e) => {
																		handleStrengthChange(e);
																	}}
																/>
																<input
																	type='text'
																	name='comment'
																	id={`day-${dayIndex}-strength-${itemIndex}-comment`}
																	key={`day-${dayIndex}-strength-${itemIndex}-comment`}
																	value={
																		day.strength[itemIndex]
																			.comment
																	}
																	placeholder='Comments (optional)'
																	onChange={(e) => {
																		handleStrengthChange(e);
																	}}
																/>
																<button
																	id={`day-${dayIndex}-strength-${itemIndex}-button`}
																	key={`day-${dayIndex}-strength-${itemIndex}-button`}
																	onClick={(e) =>
																		removeStrengthItem(e)
																	}>
																	X
																</button>
															</div>
														);
													})}
												</div>
												<div className='category'>
													<div className='title'>
														<span
															onClick={() => {
																addConditioningItem(dayIndex);
															}}>
															Add Conditioning
														</span>
													</div>
													{day.conditioning?.map((item, itemIndex) => {
														return (
															<div
																className='item-conditioning'
																id={`day-${dayIndex}-conditioning-${itemIndex}`}
																key={`day-${dayIndex}-conditioning-${itemIndex}`}>
																<input
																	type='text'
																	name='name'
																	id={`day-${dayIndex}-conditioning-${itemIndex}-name`}
																	key={`day-${dayIndex}-conditioning-${itemIndex}-name`}
																	value={
																		day.conditioning[itemIndex]
																			.name
																	}
																	placeholder='Name'
																	onChange={(e) => {
																		handleConditioningChange(e);
																	}}
																/>
																<input
																	type='number'
																	name='duration'
																	id={`day-${dayIndex}-conditioning-${itemIndex}-duration`}
																	key={`day-${dayIndex}-conditioning-${itemIndex}-duration`}
																	value={
																		day.conditioning[itemIndex]
																			.duration
																	}
																	placeholder='Duration (min)'
																	onChange={(e) => {
																		handleConditioningChange(e);
																	}}
																/>
																<input
																	type='text'
																	name='comment'
																	id={`day-${dayIndex}-conditioning-${itemIndex}-comment`}
																	key={`day-${dayIndex}-conditioning-${itemIndex}-comment`}
																	value={
																		day.conditioning[itemIndex]
																			.comment
																	}
																	placeholder='Comments (optional)'
																	onChange={(e) => {
																		handleConditioningChange(e);
																	}}
																/>
																<button
																	id={`day-${dayIndex}-conditioning-${itemIndex}-button`}
																	key={`day-${dayIndex}-conditioning-${itemIndex}-button`}
																	onClick={(e) =>
																		removeConditioningItem(e)
																	}>
																	X
																</button>
															</div>
														);
													})}
												</div>
											</div>
										);
									})}
								</div>
								{selectedProgram?.workout?.length < 7 && (
									<button
										className='add-day'
										onClick={addDay}>
										Add Day
									</button>
								)}
								<div className='btn-container'>
									{clickedDelete && (
										<>
											<strong style={{ marginRight: '2em' }}>
												This action cannont be undone, continue?
											</strong>
											<button
												onClick={() => {
													setClickedDelete(false);
												}}>
												No
											</button>
											<button onClick={handleDelete}>Yes</button>
										</>
									)}
									{!clickedDelete && (
										<>
											<button
												className={`${allowSubmit ? '' : 'disabled'}`}
												onClick={handleSubmit}
												disabled={!allowSubmit}>
												Apply Changes
											</button>
											<button
												onClick={() => {
													resetAll();
												}}>
												Clear All
											</button>
											<button
												className='delete'
												onClick={() => {
													setClickedDelete(true);
												}}>
												Delete Program
											</button>
										</>
									)}
								</div>
							</div>
						)}
					</>
				)}
			</DesktopDiv>
			<MobileDiv>
				{alertMessage !== '' && (
					<>
						<div
							className='alert-background'
							onClick={() => {
								setAlertMessage('');
							}}
						/>
						<div className='alert'>
							<button
								className='close'
								onClick={() => {
									setAlertMessage('');
								}}>
								X
							</button>
							<div className='message'>{alertMessage}</div>
						</div>
					</>
				)}
				{awaiting && (
					<div className='loader-wrapper'>
						<LoaderMobile />
					</div>
				)}
				<div className='search'>
					<label htmlFor='search'>User:</label>
					<div className='search-results'>
						<input
							type='text'
							name='search'
							id='search'
							onChange={onChangeSearch}
							value={searchValue}
							onKeyDown={onKeyDownSearch}
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
												onClick={onClickSearch}
												onMouseMove={onMouseMoveSearch}
												onMouseLeave={onMouseLeaveSearch}>
												{user[0]}
											</li>
										);
									})}
							</div>
						)}
					</div>
				</div>
				{selectedUser !== '' && (
					<>
						<div className='header'>
							<span className='name'>
								Client:<strong>{selectedUser[0]}</strong>
							</span>
						</div>

						{programList?.length === 0 && <div>No Program Info</div>}

						{programList?.length > 0 && (
							<div className='program-container'>
								<div className='program-select'>
									<label className='label'>Release Date:</label>
									<select
										name='release-date'
										id='release-date'
										onChange={(e) => {
											e.preventDefault();
											e.stopPropagation();
											setSelectedProgram(programList[e?.target?.value]);
										}}>
										{programList.map((program, programIndex) => {
											if (programIndex < 10) {
												return (
													<option
														value={programIndex}
														key={`release-mobile-${programIndex}`}>{`${
														program.release_date.split('T')[0]
													}`}</option>
												);
											} else {
												return null;
											}
										})}
									</select>
									<span className='info'>
										(only last 10 entries available to edit)
									</span>
								</div>
								<div className='program-data'>
									{selectedProgram?.workout?.map((day, dayIndex) => {
										return (
											<div className='day'>
												<div className='title'>
													<strong>{`Day ${day.day}`}</strong>
													<button
														id={`day-${dayIndex}`}
														key={`day-${dayIndex}`}
														onClick={(e) => {
															removeDay(e);
														}}>
														Remove Day
													</button>
												</div>
												<div className='category'>
													<div className='title'>
														<span
															onClick={() => {
																addMobilityItem(dayIndex);
															}}>
															Add Mobility
														</span>
													</div>
													{day.mobility?.map((item, itemIndex) => {
														return (
															<div
																className='item-mobility'
																id={`day-${dayIndex}-mobility-${itemIndex}`}
																key={`day-${dayIndex}-mobility-${itemIndex}`}>
																<input
																	type='text'
																	name='name'
																	id={`day-${dayIndex}-mobility-${itemIndex}-name`}
																	key={`day-${dayIndex}-mobility-${itemIndex}-name`}
																	value={
																		day.mobility[itemIndex].name
																	}
																	placeholder='Name'
																	onChange={(e) => {
																		handleMobilityChange(e);
																	}}
																/>
																<input
																	type='number'
																	name='sets'
																	id={`day-${dayIndex}-mobility-${itemIndex}-sets`}
																	key={`day-${dayIndex}-mobility-${itemIndex}-sets`}
																	value={
																		day.mobility[itemIndex].sets
																	}
																	placeholder='Sets'
																	min={1}
																	onChange={(e) => {
																		handleMobilityChange(e);
																	}}
																/>
																<input
																	type='number'
																	name='reps'
																	id={`day-${dayIndex}-mobility-${itemIndex}-reps`}
																	key={`day-${dayIndex}-mobility-${itemIndex}-reps`}
																	value={
																		day.mobility[itemIndex].reps
																	}
																	placeholder='Reps'
																	min={1}
																	onChange={(e) => {
																		handleMobilityChange(e);
																	}}
																/>
																<input
																	type='text'
																	name='comment'
																	id={`day-${dayIndex}-mobility-${itemIndex}-comment`}
																	key={`day-${dayIndex}-mobility-${itemIndex}-comment`}
																	value={
																		day.mobility[itemIndex]
																			.comment
																	}
																	placeholder='Comments (optional)'
																	onChange={(e) => {
																		handleMobilityChange(e);
																	}}
																/>
																<button
																	id={`day-${dayIndex}-mobility-${itemIndex}-button`}
																	key={`day-${dayIndex}-mobility-${itemIndex}-button`}
																	onClick={(e) =>
																		removeMobilityItem(e)
																	}>
																	X
																</button>
															</div>
														);
													})}
												</div>
												<div className='category'>
													<div className='title'>
														<span
															onClick={() => {
																addStrengthItem(dayIndex);
															}}>
															Add Strength
														</span>
													</div>
													{day.strength?.map((item, itemIndex) => {
														return (
															<div
																className='item-strength'
																id={`day-${dayIndex}-strength-${itemIndex}`}
																key={`day-${dayIndex}-strength-${itemIndex}`}>
																<input
																	type='text'
																	name='name'
																	id={`day-${dayIndex}-strength-${itemIndex}-name`}
																	key={`day-${dayIndex}-strength-${itemIndex}-name`}
																	value={
																		day.strength[itemIndex].name
																	}
																	placeholder='Name'
																	onChange={(e) => {
																		handleStrengthChange(e);
																	}}
																/>
																<input
																	type='number'
																	name='sets'
																	id={`day-${dayIndex}-strength-${itemIndex}-sets`}
																	key={`day-${dayIndex}-strength-${itemIndex}-sets`}
																	value={
																		day.strength[itemIndex].sets
																	}
																	placeholder='Sets'
																	min={1}
																	onChange={(e) => {
																		handleStrengthChange(e);
																	}}
																/>
																<input
																	type='number'
																	name='reps'
																	id={`day-${dayIndex}-strength-${itemIndex}-reps`}
																	key={`day-${dayIndex}-strength-${itemIndex}-reps`}
																	value={
																		day.strength[itemIndex].reps
																	}
																	placeholder='Reps'
																	min={1}
																	onChange={(e) => {
																		handleStrengthChange(e);
																	}}
																/>
																<input
																	type='number'
																	name='load'
																	id={`day-${dayIndex}-strength-${itemIndex}-load`}
																	key={`day-${dayIndex}-strength-${itemIndex}-load`}
																	value={
																		day.strength[itemIndex].load
																	}
																	placeholder='Load'
																	onChange={(e) => {
																		handleStrengthChange(e);
																	}}
																/>
																<input
																	type='text'
																	name='comment'
																	id={`day-${dayIndex}-strength-${itemIndex}-comment`}
																	key={`day-${dayIndex}-strength-${itemIndex}-comment`}
																	value={
																		day.strength[itemIndex]
																			.comment
																	}
																	placeholder='Comments (optional)'
																	onChange={(e) => {
																		handleStrengthChange(e);
																	}}
																/>
																<button
																	id={`day-${dayIndex}-strength-${itemIndex}-button`}
																	key={`day-${dayIndex}-strength-${itemIndex}-button`}
																	onClick={(e) =>
																		removeStrengthItem(e)
																	}>
																	X
																</button>
															</div>
														);
													})}
												</div>
												<div className='category'>
													<div className='title'>
														<span
															onClick={() => {
																addConditioningItem(dayIndex);
															}}>
															Add Conditioning
														</span>
													</div>
													{day.conditioning?.map((item, itemIndex) => {
														return (
															<div
																className='item-conditioning'
																id={`day-${dayIndex}-conditioning-${itemIndex}`}
																key={`day-${dayIndex}-conditioning-${itemIndex}`}>
																<input
																	type='text'
																	name='name'
																	id={`day-${dayIndex}-conditioning-${itemIndex}-name`}
																	key={`day-${dayIndex}-conditioning-${itemIndex}-name`}
																	value={
																		day.conditioning[itemIndex]
																			.name
																	}
																	placeholder='Name'
																	onChange={(e) => {
																		handleConditioningChange(e);
																	}}
																/>
																<input
																	type='number'
																	name='duration'
																	id={`day-${dayIndex}-conditioning-${itemIndex}-duration`}
																	key={`day-${dayIndex}-conditioning-${itemIndex}-duration`}
																	value={
																		day.conditioning[itemIndex]
																			.duration
																	}
																	placeholder='Duration (min)'
																	onChange={(e) => {
																		handleConditioningChange(e);
																	}}
																/>
																<input
																	type='text'
																	name='comment'
																	id={`day-${dayIndex}-conditioning-${itemIndex}-comment`}
																	key={`day-${dayIndex}-conditioning-${itemIndex}-comment`}
																	value={
																		day.conditioning[itemIndex]
																			.comment
																	}
																	placeholder='Comments (optional)'
																	onChange={(e) => {
																		handleConditioningChange(e);
																	}}
																/>
																<button
																	id={`day-${dayIndex}-conditioning-${itemIndex}-button`}
																	key={`day-${dayIndex}-conditioning-${itemIndex}-button`}
																	onClick={(e) =>
																		removeConditioningItem(e)
																	}>
																	X
																</button>
															</div>
														);
													})}
												</div>
											</div>
										);
									})}
								</div>
								{selectedProgram?.workout?.length < 7 && (
									<button
										className='add-day'
										onClick={addDay}>
										Add Day
									</button>
								)}
								<div className='btn-container'>
									{clickedDelete && (
										<>
											<strong style={{ marginRight: '2em' }}>
												This action cannont be undone, continue?
											</strong>
											<button
												onClick={() => {
													setClickedDelete(false);
												}}>
												No
											</button>
											<button onClick={handleDelete}>Yes</button>
										</>
									)}
									{!clickedDelete && (
										<>
											<button
												className={`${allowSubmit ? '' : 'disabled'}`}
												onClick={handleSubmit}
												disabled={!allowSubmit}>
												Apply Changes
											</button>
											<button
												onClick={() => {
													resetAll();
												}}>
												Clear All
											</button>
											<button
												className='delete'
												onClick={() => {
													setClickedDelete(true);
												}}>
												Delete Program
											</button>
										</>
									)}
								</div>
							</div>
						)}
					</>
				)}
			</MobileDiv>
		</>
	);
};

export default EditProgram;

export const DesktopDiv = styled.div`
	@media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		font-size: calc(min(2vw, 2vh));
		position: absolute;
		overflow-x: hidden;
		overflow-y: scroll;

		& > .alert-background {
			position: fixed;
			z-index: 3;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			background-color: #f0e9df;
			opacity: 0.8;
		}

		& > .alert {
			position: fixed;
			z-index: 4;
			width: max-content;
			height: max-content;
			border: 2px solid #333;
			border-radius: 10px;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background-color: #d0dceb;

			& > .close {
				width: 2em;
				background-color: darkred;
				border: 2px solid #333;
				border-radius: 5px;
				position: absolute;
				right: 0%;
				top: 0%;
				transform: translate(50%, -50%);

				&:hover {
					background-color: red;
				}
			}

			& > .message {
				margin: 2em 4em;
			}
		}

		& > h3 {
			font-size: calc(min(3vw, 3vh));
			width: 100%;
			margin-top: 1em;
			margin-bottom: 1em;
			text-align: center;
		}

		& > .search {
			display: flex;
			width: 100%;
			flex-direction: row;
			justify-content: center;
			margin-bottom: 1em;

			& label {
				width: 20%;
				text-align: end;
				padding-right: 2vw;
			}

			& > .search-results {
				width: 50%;
				display: flex;
				flex-direction: column;
				position: relative;

				& > input {
					width: 100%;
				}

				& > .dropdown {
					width: 100%;
					background-color: white;
					border: solid 1px #333;
					position: absolute;
					top: 100%;
					z-index: 2;

					& > .dropdown-row {
						list-style: none;
						padding: 0.5vh 0;
						text-align: center;

						&:hover {
							cursor: pointer;
						}
					}

					& > .hover {
						background-color: lightgray;
					}
				}
			}
		}

		& > .header {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			& > .name {
				padding-left: 5%;

				& > strong {
					margin-left: 0.5em;
				}
			}
		}

		& > .program-container {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;
			margin-top: 0.5em;
			height: max-content;

			& > .program-select {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: start;
				align-items: center;
				margin-bottom: 0.5em;

				& > .label {
					padding-left: 5%;
					margin-right: 0.5em;
				}

				& > .info {
					margin-left: 0.5em;
					font-size: 0.8em;
				}
			}

			& > .program-data {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: start;
				align-items: center;
				border: solid #333;
				border-width: 2px 0 0 0;

				& > .day {
					width: 100%;
					display: flex;
					flex-direction: column;
					justify-content: start;
					align-items: center;
					border: solid #333;
					border-width: 0 0 2px 0;

					& > .title {
						width: 100%;
						margin-top: 0.5em;
						margin-bottom: 1em;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: start;

						& > strong {
							padding-left: 2em;
						}

						& > button {
							margin-left: 2em;
							border: 2px solid #333;
							border-radius: 10px;
							padding: 3px 8px;
							color: #333;
							box-shadow: 2px 2px 2px #333;
							width: max-content;
							background-color: #ff6666;

							&:hover {
								background-color: red;
							}
							&:active {
								box-shadow: 0 0 0;
								transform: translate(2px, 2px);
							}
						}
					}

					& > .category {
						width: 100%;
						display: flex;
						flex-direction: column;
						justify-content: start;
						align-items: center;
						margin: 5px 0;

						& > .title {
							width: 100%;
							text-align: start;
							align-self: start;
							padding-left: 2em;
							margin-bottom: 1em;

							& > span {
								background-color: #87ceeb;
								border: 2px solid black;
								box-shadow: 2px 2px 2px #333;
								border-radius: 10px;
								padding: 3px 8px;

								&:hover {
									background-color: #5f90a5;
									cursor: pointer;
								}
								&:active {
									box-shadow: 0 0 0;
									translate: 2px, 2px;
								}
							}
						}

						& > .item-mobility {
							width: 100%;
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: space-evenly;
							margin-bottom: 5px;

							& > input[name='name'] {
								width: calc(40% - 7.5em);
							}
							& > input[name='sets'] {
								width: 5em;
							}
							& > input[name='reps'] {
								width: 5em;
							}
							& > input[name='comment'] {
								width: calc(60% - 7.5em);
							}
							& > button {
								background-color: darkred;
								border: 2px solid #333;
								border-radius: 5px;
								box-shadow: 2px 2px 2px #333;
								width: 2em;

								&:hover {
									background-color: red;
									cursor: pointer;
								}
								&:active {
									translate: 2px 2px;
									box-shadow: 0 0 0;
								}
							}
						}

						& > .item-strength {
							width: 100%;
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: space-evenly;
							margin-bottom: 5px;

							& > input[name='name'] {
								width: calc(40% - 10em);
							}
							& > input[name='sets'] {
								width: 5em;
							}
							& > input[name='reps'] {
								width: 5em;
							}
							& > input[name='load'] {
								width: 5em;
							}
							& > input[name='comment'] {
								width: calc(60% - 10em);
							}
							& > button {
								background-color: darkred;
								border: 2px solid #333;
								border-radius: 5px;
								box-shadow: 2px 2px 2px #333;
								width: 2em;

								&:hover {
									background-color: red;
									cursor: pointer;
								}
								&:active {
									translate: 2px 2px;
									box-shadow: 0 0 0;
								}
							}
						}

						& > .item-conditioning {
							width: 100%;
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: space-evenly;
							margin-bottom: 5px;

							& > input[name='name'] {
								width: calc(40% - 7.5em);
							}
							& > input[name='duration'] {
								width: 11em;
							}
							& > input[name='comment'] {
								width: calc(60% - 7.5em);
							}
							& > button {
								background-color: darkred;
								border: 2px solid #333;
								border-radius: 5px;
								box-shadow: 2px 2px 2px #333;
								width: 2em;

								&:hover {
									background-color: red;
									cursor: pointer;
								}
								&:active {
									translate: 2px 2px;
									box-shadow: 0 0 0;
								}
							}
						}
					}
				}
			}

			& > .add-day {
				background-color: #87ceeb;
				border: 2px solid #333;
				border-radius: 10px;
				padding: 3px 8px;
				color: #333;
				box-shadow: 3px 3px 2px #333;
				width: max-content;
				margin: 1em 0 0 2em;

				align-self: flex-start;

				&:hover {
					background-color: #5f90a5;
					cursor: pointer;
				}
				&:active {
					translate: 3px 3px;
					box-shadow: 0 0 0;
				}
			}

			& > .btn-container {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				padding: 5px 0;
				margin: 1em;

				& > button {
					background-color: #87ceeb;
					border: 2px solid #333;
					border-radius: 10px;
					padding: 0.5em 1em;
					color: #333;
					box-shadow: 3px 3px 2px #333;
					width: max-content;
					margin: 0 1em;

					&:hover {
						background-color: #5f90a5;
						cursor: pointer;
					}
					&:active {
						translate: 3px 3px;
						box-shadow: 0 0 0;
					}
				}

				& > .delete {
					background-color: #ff6666;
					&:hover {
						background-color: red;
					}
				}
			}
		}

		.disabled {
			background-color: gray !important;
			&:active {
				translate: 0px 0px !important;
				box-shadow: 3px 3px 2px #333 !important;
			}
		}
	}

	@media screen and ((max-width: ${MOBILE_MODE_LIMIT})or (width: ${MOBILE_MODE_LIMIT})) {
		display: none;
	}
`;

export const MobileDiv = styled.div`
	display: none;

	@media screen and (max-width: ${MOBILE_MODE_LIMIT}) {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;

		& > .alert-background {
			position: fixed;
			z-index: 3;
			width: 100%;
			height: 100%;
			top: 100px;
			opacity: 0.8;
			background-color: #f0e9df;
		}

		& > .alert {
			position: fixed;
			z-index: 4;
			width: max-content;
			max-width: 80%;
			height: max-content;
			max-height: 60%;
			border: 2px solid #333;
			border-radius: 10px;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background-color: #d0dceb;

			& > .close {
				width: 2em;
				aspect-ratio: 1/1;
				background-color: darkred;
				border: 2px solid #333;
				border-radius: 5px;
				position: absolute;
				right: 0%;
				top: 0%;
				transform: translate(50%, -50%);
			}

			& > .message {
				margin: 0.5em 0.5em;
			}
		}

		& > .loader-wrapper {
			position: fixed;
			height: calc(100vh - 100px - 4vh - 2em - 1ch - 2px);
			top: calc(100px + 2em + 1ch + 2px);
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		& > .search {
			width: 85%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin: 1em 1em;

			& > label {
				width: 10ch;
				padding-right: 1ch;
				text-align: end;
			}

			& > .search-results {
				flex: 1;
				position: relative;
				margin-right: 1ch;

				& > input {
					width: 100%;
				}

				& > .dropdown {
					background-color: white;
					border: solid 1px #333;
					position: absolute;
					top: 100%;
					width: 100%;
					z-index: 2;

					& > .dropdown-row {
						width: 100%;
						list-style: none;
						padding: 0.5vh 0;
						text-align: center;
					}
				}
			}
		}

		& > .header {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: start;
			margin-left: 0.5em;
			margin-right: 0.5em;

			& strong {
				margin-left: 0.5em;
			}
		}

		& > .program-container {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;
			margin-top: 0.5em;
			height: max-content;

			& > .program-select {
				width: 100%;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: start;
				align-items: center;
				margin-bottom: 0.5em;

				& > .label {
					margin-left: 0.5em;
					width: 15ch;
				}

				& > select {
					margin: 0 0.5em;
					width: calc(100% - 1.5em - 15ch);
				}

				& > .info {
					margin-left: 0.5em;
					font-size: 0.8em;
					width: 100%;
				}
			}

			& > .program-data {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: start;
				align-items: center;
				border: solid #333;
				border-width: 2px 0 0 0;

				& > .day {
					width: 100%;
					display: flex;
					flex-direction: column;
					justify-content: start;
					align-items: center;
					border: solid #333;
					border-width: 0 0 2px 0;

					& > .title {
						width: 100%;
						margin-top: 0.5em;
						margin-bottom: 1em;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: start;

						& > strong {
							padding-left: 2em;
						}

						& > button {
							margin-left: 2em;
							border: 2px solid #333;
							border-radius: 10px;
							padding: 3px 8px;
							color: #333;
							box-shadow: 2px 2px 2px #333;
							width: max-content;
							background-color: #ff6666;

							&:hover {
								background-color: red;
							}
							&:active {
								box-shadow: 0 0 0;
								transform: translate(2px, 2px);
							}
						}
					}

					& > .category {
						width: 100%;
						display: flex;
						flex-direction: column;
						justify-content: start;
						align-items: center;
						margin: 5px 0;

						& > .title {
							width: 100%;
							text-align: start;
							align-self: start;
							padding-left: 2em;
							margin-bottom: 1em;

							& > span {
								background-color: #87ceeb;
								border: 2px solid black;
								box-shadow: 2px 2px 2px #333;
								border-radius: 10px;
								padding: 3px 8px;

								&:hover {
									background-color: #5f90a5;
									cursor: pointer;
								}
								&:active {
									box-shadow: 0 0 0;
									translate: 2px, 2px;
								}
							}
						}

						& > .item-mobility {
							width: 90%;
							height: fit-content;
							display: flex;
							flex-direction: row;
							flex-wrap: wrap;
							align-items: center;
							justify-content: start;
							margin-bottom: 3px;

							& > input {
								border: 1px solid #333;
								margin-top: 0.25em;
								margin-bottom: 0.25em;
							}

							& > input[name='name'] {
								width: calc(100% - 1em - 10ch);
								margin-right: 0.5em;
							}
							& > input[name='sets'] {
								width: calc(5ch);
								margin-right: 0.5em;
							}
							& > input[name='reps'] {
								width: calc(5ch);
							}
							& > input[name='comment'] {
								width: calc(100% - 2.5em);
								margin-right: 0.5em;
							}
							& > button {
								background-color: darkred;
								border: 2px solid #333;
								border-radius: 5px;
								box-shadow: 2px 2px 2px #333;
								width: 2em;
							}
						}

						& > .item-strength {
							width: 90%;
							height: fit-content;
							display: flex;
							flex-direction: row;
							flex-wrap: wrap;
							align-items: center;
							justify-content: start;
							margin-bottom: 3px;

							& > input {
								border: 1px solid #333;
								margin-top: 0.25em;
								margin-bottom: 0.25em;
							}

							& > input[name='name'] {
								width: calc(100% - 1em - 10ch);
								margin-right: 0.5em;
							}
							& > input[name='sets'] {
								width: calc(5ch);
								margin-right: 0.5em;
							}
							& > input[name='reps'] {
								width: calc(5ch);
							}
							& > input[name='load'] {
								width: calc(5ch);
								margin-right: 0.5em;
							}
							& > input[name='comment'] {
								width: calc(100% - 3em - 5ch);
								margin-right: 0.5em;
							}
							& > button {
								background-color: darkred;
								border: 2px solid #333;
								border-radius: 5px;
								box-shadow: 2px 2px 2px #333;
								width: 2em;
							}
						}

						& > .item-conditioning {
							width: 90%;
							height: fit-content;
							display: flex;
							flex-direction: row;
							flex-wrap: wrap;
							align-items: center;
							justify-content: start;
							margin-bottom: 3px;

							& > input {
								border: 1px solid #333;
								margin-top: 0.25em;
								margin-bottom: 0.25em;
							}

							& > input[name='name'] {
								width: calc(100% - 0.5em - 15ch);
								margin-right: 0.5em;
							}
							& > input[name='duration'] {
								width: calc(15ch);
							}
							& > input[name='comment'] {
								width: calc(100% - 2.5em);
								margin-right: 0.5em;
							}
							& > button {
								background-color: darkred;
								border: 2px solid #333;
								border-radius: 5px;
								box-shadow: 2px 2px 2px #333;
								width: 2em;
							}
						}
					}
				}
			}

			& > .add-day {
				background-color: #87ceeb;
				border: 2px solid #333;
				border-radius: 10px;
				padding: 3px 8px;
				color: #333;
				box-shadow: 3px 3px 2px #333;
				width: max-content;
				margin: 1em 0 0 2em;
				align-self: flex-start;

				&:hover {
					background-color: #5f90a5;
					cursor: pointer;
				}
				&:active {
					translate: 3px 3px;
					box-shadow: 0 0 0;
				}
			}

			& > .btn-container {
				width: 100%;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				align-items: center;
				justify-content: center;
				margin: 1em;
				border: solid #333;
				border-width: 2px 0 0 0;

				& > button {
					background-color: #87ceeb;
					border: 2px solid #333;
					border-radius: 10px;
					padding: 0.5em 1em;
					color: #333;
					box-shadow: 3px 3px 2px #333;
					width: max-content;
					margin: 1em 1em 0;

					&:hover {
						background-color: #5f90a5;
						cursor: pointer;
					}
					&:active {
						translate: 3px 3px;
						box-shadow: 0 0 0;
					}
				}

				& > .delete {
					background-color: #ff6666;
					&:hover {
						background-color: red;
					}
				}

				& > strong {
					text-align: center;
					margin: 1em;
					width: 100%;
				}
			}
		}

		.disabled {
			background-color: gray !important;
			&:active {
				translate: 0px 0px !important;
				box-shadow: 3px 3px 2px #333 !important;
			}
		}
	}
`;
