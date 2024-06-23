import styled from 'styled-components';
import Loader from './Loader';
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
		</>
	);
};

export default EditProgram;

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
	}

	// Hide for mobile size
	@media screen and ((max-width: ${MOBILE_MODE_LIMIT}) or (width: ${MOBILE_MODE_LIMIT})) {
		display: none;
	}
`;
