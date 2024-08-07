import styled from 'styled-components';
import Loader from './Loader';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useState, useEffect, useRef } from 'react';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE_LIMIT;

const NewProgram = () => {
	const axiosPrivate = useAxiosPrivate();
	const [users, setUsers] = useState(null);
	const [selectedUser, setSelectedUser] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [searchIndex, setSearchIndex] = useState(null);
	const currentSearchIndex = useRef(searchIndex);
	const [awaiting, setAwaiting] = useState(false);
	const [releaseDate, setReleaseDate] = useState('');
	const [programData, setProgramData] = useState([
		{ day: 1, mobility: [], strength: [], conditioning: [] },
	]);
	const [alertMessage, setAlertMessage] = useState('');
	const [dateToday, setDateToday] = useState(null);

	const resetAll = () => {
		setSelectedUser('');
		setSearchValue('');
		setSearchIndex(null);
		setProgramData([{ day: 1, mobility: [], strength: [], conditioning: [] }]);
	};

	// Handle change to the user search field
	const onChangeSearch = (e) => {
		setSearchValue(e.target.value);
		setSearchIndex(null);
	};

	// Key events search bar
	const onKeyDownSearch = (e) => {
		// Get all the list elements from the search result
		const searchElements = document.querySelectorAll('.dropdown-row');
		const countSearchElements = searchElements.length;

		if (e.code === 'Escape') {
			setSearchValue('');
			setSearchIndex(null);
		}

		if (e.code === 'Enter') {
			if (currentSearchIndex.current !== null) {
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

	// click events dropdown search results
	const onClickSearch = (e) => {
		users.map((user) => {
			if (user[0] === e.target.innerHTML) {
				// console.log(`${user} matches`);
				setSelectedUser(user);
				setSearchValue('');
				setSearchIndex(null);
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

	// Handle the number of days in program
	const handleDayChange = (change) => {
		const numDays = programData.length;
		if (change === 'increase') {
			if (numDays < 7) {
				const programList = [
					...programData,
					{
						day: numDays + 1,
						mobility: [],
						strength: [],
						conditioning: [],
					},
				];
				setProgramData(programList);
			}
		}
		if (change === 'decrease') {
			if (numDays > 1) {
				let programList = [...programData];
				programList.pop();
				setProgramData(programList);
			}
		}
	};

	// Add mobility item
	const addMobilityItem = (dayIndex) => {
		// Deep copy programData object
		let newProgram = JSON.parse(JSON.stringify(programData));
		// Copy mobility list
		let mobilityList = [...programData[dayIndex].mobility];
		// Add new blank item entry
		mobilityList.push({ name: '', sets: '', reps: '', comment: '' });
		// Replace with new list
		newProgram[dayIndex].mobility = mobilityList;
		// Replace with new programData object
		setProgramData(newProgram);
	};

	// Remove mobility item
	const removeMobilityItem = (e) => {
		const id = e.target.id;
		const dayIndex = id.charAt(4);
		const itemIndex = id.slice(15, id.indexOf('-', 15));

		// Deep copy programData object
		let newProgram = JSON.parse(JSON.stringify(programData));
		// Copy mobility list
		const mobilityList = [...programData[dayIndex].mobility];
		// Remove selected item
		mobilityList.splice(itemIndex, 1);
		// Replace with new list
		newProgram[dayIndex].mobility = mobilityList;
		// Replace with new programData object
		setProgramData(newProgram);
	};

	// Handle mobility item change
	const handleMobilityChange = (e) => {
		const { name, value, id } = e.target;
		const dayIndex = id.charAt(4);
		const itemIndex = id.slice(15, id.indexOf('-', 15));

		// Deep copy programData object
		let newProgram = JSON.parse(JSON.stringify(programData));
		// Copy mobility list
		let mobilityList = [...programData[dayIndex].mobility];

		// Change selected item
		mobilityList[itemIndex][name] = value;

		// Replace with new programData object
		newProgram[dayIndex].mobility = mobilityList;
		setProgramData(newProgram);
	};

	// Add strength item
	const addStrengthItem = (dayIndex) => {
		// Deep copy programData object
		let newProgram = JSON.parse(JSON.stringify(programData));
		// Copy strength list
		let strengthList = [...programData[dayIndex].strength];
		// Add new blank item entry
		strengthList.push({ name: '', sets: '', reps: '', load: '', comment: '' });
		// Replace with new list
		newProgram[dayIndex].strength = strengthList;
		// Replace with new programData object
		setProgramData(newProgram);
	};

	// Remove strength item
	const removeStrengthItem = (e) => {
		const id = e.target.id;
		const dayIndex = id.charAt(4);
		const itemIndex = id.slice(15, id.indexOf('-', 15));

		// Deep copy programData object
		let newProgram = JSON.parse(JSON.stringify(programData));
		// Copy mobility list without item
		const strengthList = [...programData[dayIndex].strength];
		// Remove selected item
		strengthList.splice(itemIndex, 1);
		// Replace with new programData object
		newProgram[dayIndex].strength = strengthList;
		setProgramData(newProgram);
	};

	// Handle strength item change
	const handleStrengthChange = (e) => {
		const { name, value, id } = e.target;
		const dayIndex = id.charAt(4);
		const itemIndex = id.slice(15, id.indexOf('-', 15));

		// Deep copy programData object
		let newProgram = JSON.parse(JSON.stringify(programData));
		// Copy mobility list without item
		let strengthList = [...programData[dayIndex].strength];
		// Change selected item
		strengthList[itemIndex][name] = value;
		// Replace with new programData object
		newProgram[dayIndex].strength = strengthList;
		setProgramData(newProgram);
	};

	// Add conditioning item
	const addConditioningItem = (dayIndex) => {
		// Deep copy programData object
		let newProgram = JSON.parse(JSON.stringify(programData));
		// Copy conditioning list
		let conditioningList = [...programData[dayIndex].conditioning];
		// Add new blank item entry
		conditioningList.push({ name: '', duration: '', comment: '' });
		// Replace with new list
		newProgram[dayIndex].conditioning = conditioningList;
		// Replace with new programData object
		setProgramData(newProgram);
	};

	// Remove conditioning item
	const removeConditioningItem = (e) => {
		const id = e.target.id;
		const dayIndex = id.charAt(4);
		const itemIndex = id.slice(19, id.indexOf('-', 19));

		// Deep copy programData object
		let newProgram = JSON.parse(JSON.stringify(programData));
		// Copy conditioning list without item
		const conditioningList = [...programData[dayIndex].conditioning];
		// Remove selected item
		conditioningList.splice(itemIndex, 1);
		// Replace with new programData object
		newProgram[dayIndex].conditioning = conditioningList;
		setProgramData(newProgram);
	};

	// Handle conditioning item change
	const handleConditioningChange = (e) => {
		const { name, value, id } = e.target;
		const dayIndex = id.charAt(4);
		const itemIndex = id.slice(19, id.indexOf('-', 19));

		// Deep copy programData object
		let newProgram = JSON.parse(JSON.stringify(programData));
		// Copy conditioning list without item
		let conditioningList = [...programData[dayIndex].conditioning];
		// Change selected item
		conditioningList[itemIndex][name] = value;
		// Replace with new programData object
		newProgram[dayIndex].conditioning = conditioningList;
		setProgramData(newProgram);
	};

	// Handle release date change
	const handleReleaseChange = (e) => {
		const { value } = e.target;
		setReleaseDate(value);
	};

	const verifyValues = () => {
		var errorMessage = '';
		if (releaseDate === '') {
			errorMessage = 'Release date cannot be empty';
			return false;
		} else {
			programData?.forEach((day, dayIndex) => {
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
		}
		if (errorMessage === '') {
			return true;
		} else {
			setAlertMessage(errorMessage);
			return false;
		}
	};

	// Handle submit new program
	const handleSubmit = () => {
		if (verifyValues() === true) {
			const userID = selectedUser[1];
			const programList = [...programData];
			axiosPrivate
				.put(`/programs/${userID}`, {
					email: selectedUser[2],
					program: programList,
					releaseDate: releaseDate,
				})
				.then((res) => {
					setAlertMessage(res?.data);
					if (res?.status === 201) {
						setSearchValue('');
						setSearchIndex(null);
						setProgramData([{ day: 1, mobility: [], strength: [], conditioning: [] }]);
					}
				})
				.catch((err) => {
					alert('Unable to create program, check logs');
					console.log(err);
				});
		}
	};

	// On render
	useEffect(() => {
		resetAll();
		getUsers();

		let todayDate = new Date(); // New Date object
		const offset = todayDate.getTimezoneOffset(); // Timezone offset (min)

		todayDate = new Date(todayDate.getTime() - offset * 60 * 1000); // Time value - offset (milis)
		todayDate = todayDate.toISOString().split('T')[0]; // Format yyyy-mm-dd
		setDateToday(todayDate);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// On selected user change
	useEffect(() => {
		setSearchValue('');
		setSearchIndex(null);

		// Set default release date to today
		if (selectedUser !== '') {
			setReleaseDate(dateToday);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedUser]);

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
				<h3>New Weekly Program</h3>
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
						<div className='new-program'>
							<div className='header'>
								<span className='name'>
									Client:<strong>{`${selectedUser[0]}`}</strong>
								</span>
								<div className='settings-container'>
									<div className='days'>
										<span>Total Days:</span>
										<button
											onClick={() => {
												handleDayChange('decrease');
											}}>
											<i className='bi bi-dash-lg' />
										</button>

										<span className='number'>{programData.length}</span>
										<button
											onClick={() => {
												handleDayChange('increase');
											}}>
											<i className='bi bi-plus-lg' />
										</button>
									</div>
								</div>
							</div>
							<div className='content'>
								{programData.map((dayObject, dayIndex) => {
									return (
										<div
											className='day'
											id={`day-${dayIndex}`}
											key={`day-${dayIndex}`}>
											<div className='title'>{`Day: ${dayIndex + 1}`}</div>
											<div className='category'>
												<div className='title'>
													<button
														onClick={() => {
															addMobilityItem(dayIndex);
														}}>
														Add Mobility
													</button>
												</div>
												<>
													{dayObject.mobility.map((item, itemIndex) => {
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
																		programData[dayIndex]
																			.mobility[itemIndex]
																			.name
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
																		programData[dayIndex]
																			.mobility[itemIndex]
																			.sets
																	}
																	placeholder='Sets'
																	onChange={(e) => {
																		handleMobilityChange(e);
																	}}
																	min={1}
																/>
																<input
																	type='number'
																	name='reps'
																	id={`day-${dayIndex}-mobility-${itemIndex}-reps`}
																	key={`day-${dayIndex}-mobility-${itemIndex}-reps`}
																	value={
																		programData[dayIndex]
																			.mobility[itemIndex]
																			.reps
																	}
																	placeholder='Reps'
																	onChange={(e) => {
																		handleMobilityChange(e);
																	}}
																	min={1}
																/>
																<input
																	type='text'
																	name='comment'
																	id={`day-${dayIndex}-mobility-${itemIndex}-comment`}
																	key={`day-${dayIndex}-mobility-${itemIndex}-comment`}
																	value={
																		programData[dayIndex]
																			.mobility[itemIndex]
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
												</>
											</div>
											<div className='category'>
												<div className='title'>
													<button
														onClick={() => {
															addStrengthItem(dayIndex);
														}}>
														Add Strength
													</button>
												</div>
												<>
													{dayObject.strength.map((item, itemIndex) => {
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
																		programData[dayIndex]
																			.strength[itemIndex]
																			.name
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
																		programData[dayIndex]
																			.strength[itemIndex]
																			.sets
																	}
																	placeholder='Sets'
																	onChange={(e) => {
																		handleStrengthChange(e);
																	}}
																	min={1}
																/>
																<input
																	type='number'
																	name='reps'
																	id={`day-${dayIndex}-strength-${itemIndex}-reps`}
																	key={`day-${dayIndex}-strength-${itemIndex}-reps`}
																	value={
																		programData[dayIndex]
																			.strength[itemIndex]
																			.reps
																	}
																	placeholder='Reps'
																	onChange={(e) => {
																		handleStrengthChange(e);
																	}}
																	min={1}
																/>
																<input
																	type='number'
																	name='load'
																	id={`day-${dayIndex}-strength-${itemIndex}-load`}
																	key={`day-${dayIndex}-strength-${itemIndex}-load`}
																	value={
																		programData[dayIndex]
																			.strength[itemIndex]
																			.load
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
																		programData[dayIndex]
																			.strength[itemIndex]
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
												</>
											</div>
											<div className='category'>
												<div className='title'>
													<button
														onClick={() => {
															addConditioningItem(dayIndex);
														}}>
														Add Conditioning
													</button>
												</div>
												<>
													{dayObject.conditioning.map(
														(item, itemIndex) => {
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
																			programData[dayIndex]
																				.conditioning[
																				itemIndex
																			].name
																		}
																		placeholder='Name'
																		onChange={(e) => {
																			handleConditioningChange(
																				e
																			);
																		}}
																	/>
																	<input
																		type='number'
																		name='duration'
																		id={`day-${dayIndex}-conditioning-${itemIndex}-duration`}
																		key={`day-${dayIndex}-conditioning-${itemIndex}-duration`}
																		value={
																			programData[dayIndex]
																				.conditioning[
																				itemIndex
																			].duration
																		}
																		placeholder='Duration (min)'
																		onChange={(e) => {
																			handleConditioningChange(
																				e
																			);
																		}}
																	/>
																	<input
																		type='text'
																		name='comment'
																		id={`day-${dayIndex}-conditioning-${itemIndex}-comment`}
																		key={`day-${dayIndex}-conditioning-${itemIndex}-comment`}
																		value={
																			programData[dayIndex]
																				.conditioning[
																				itemIndex
																			].comment
																		}
																		placeholder='Comments (optional)'
																		onChange={(e) => {
																			handleConditioningChange(
																				e
																			);
																		}}
																	/>
																	<button
																		id={`day-${dayIndex}-conditioning-${itemIndex}-button`}
																		key={`day-${dayIndex}-conditioning-${itemIndex}-button`}
																		onClick={(e) =>
																			removeConditioningItem(
																				e
																			)
																		}>
																		X
																	</button>
																</div>
															);
														}
													)}
												</>
											</div>
										</div>
									);
								})}
							</div>
						</div>
						<div className='btn-container'>
							<div className='date'>
								Release On:
								<input
									type='date'
									name='release-date'
									value={releaseDate}
									onChange={handleReleaseChange}
									style={{ marginLeft: '1em' }}
									min={dateToday}
								/>
							</div>
							<button onClick={handleSubmit}>Submit</button>
							<button
								onClick={() => {
									resetAll();
								}}>
								Clear All
							</button>
						</div>
					</>
				)}
			</DesktopDiv>
		</>
	);
};

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

		& > .alert-background {
			position: fixed;
			z-index: 3;
			width: 100%;
			height: 100%;
			background-color: #f0e9df;
			opacity: 0.8;
			left: 0%;
			top: 0%;
		}

		& > .alert {
			position: fixed;
			z-index: 4;
			width: max-content;
			height: max-content;
			border: 2px solid black;
			border-radius: 10px;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background-color: #d2d2d2;
			color: black;

			& > .close {
				width: 2em;
				background-color: black;
				color: white;
				border: 2px solid black;
				border-radius: 5px;
				position: absolute;
				right: 0%;
				top: 0%;
				transform: translate(50%, -50%);
				@media (hover: hover) and (pointer: fine) {
					&:hover {
						background-color: #87ceeb;
					}
				}
			}

			& > .message {
				margin: 2em 4em;
			}
		}

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
				width: calc(max(400px, 50%));
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
					width: calc(100% + 1ch);
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

		& > .new-program {
			width: 100%;
			margin: 2em 0;
			height: fit-content;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: start;

			& > .header {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-around;
				margin-bottom: 10px;

				& > .name {
					width: fit-content;
					text-align: left;
					padding-left: 20px;
					font-size: large;

					& > strong {
						margin-left: 1ch;
					}
				}

				& > .settings-container {
					flex: 1;
					display: flex;
					flex-direction: row;
					justify-content: start;
					align-items: center;
					padding: 0 25px;
					font-size: large;
					flex-wrap: wrap;

					& > .days {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;

						& > span {
							margin-right: 1ch;
						}

						& > .number {
							padding: 0 0.5ch;
							margin: 0 0.5ch;
							color: black;
							background-color: white;
							width: 3ch;
							text-align: center;
							border-radius: 5px;
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
			}

			& > .content {
				width: 100%;
				height: fit-content;
				display: flex;
				flex-direction: column;
				justify-content: start;
				align-items: center;
				border: solid white;
				border-width: 3px 0 0 0;
				margin-top: 10px;

				& > .day {
					width: 100%;
					display: flex;
					flex-direction: column;
					justify-content: start;
					align-items: center;
					border: solid white;
					border-width: 0 0 3px 0;
					padding: 10px 0;

					& > .title {
						width: 100%;
						font-size: large;
						padding-left: 20px;
						margin-bottom: 1ch;
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
							padding-left: 10px;
							margin-bottom: 1ch;
							font-size: large;

							& > button {
								background-color: black;
								color: white;
								border: 2px solid #87ceeb;
								box-shadow: 2px 2px 2px #87ceeb;
								border-radius: 10px;
								font-size: large;
								padding: 5px 10px;

								@media (hover: hover) and (pointer: fine) {
									&:hover {
										background-color: #87ceeb;
										color: black;
										cursor: pointer;
									}

									&:active {
										box-shadow: 0 0 0;
										translate: 2px 2px;
									}
								}
							}
						}

						& > .item-mobility {
							width: calc(100% - 20px + 1ch);
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: space-evenly;
							margin-bottom: 5px;
							font-size: large;

							& > input {
								font-size: large;
								margin: 0 0.5ch;
							}

							& > input[name='name'] {
								flex: 6;
							}
							& > input[name='sets'] {
								width: 8ch;
							}
							& > input[name='reps'] {
								width: 8ch;
							}
							& > input[name='comment'] {
								flex: 8;
							}

							& > button {
								background-color: black;
								color: white;
								border: 2px solid #87ceeb;
								box-shadow: 2px 2px 2px #87ceeb;
								border-radius: 10px;
								padding: 5px 10px;
								font-size: large;
								margin-right: 0.5ch;

								@media (hover: hover) and (pointer: fine) {
									&:hover {
										background-color: #87ceeb;
										color: black;
										cursor: pointer;
									}

									&:active {
										box-shadow: 0 0 0;
										translate: 2px 2px;
									}
								}
							}
						}

						& > .item-strength {
							width: calc(100% - 20px + 1ch);
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: space-evenly;
							margin-bottom: 5px;
							font-size: large;

							& > input {
								font-size: large;
								margin: 0 0.5ch;
							}

							& > input[name='name'] {
								flex: 6;
							}
							& > input[name='sets'] {
								width: 8ch;
							}
							& > input[name='reps'] {
								width: 8ch;
							}
							& > input[name='load'] {
								width: 8ch;
							}
							& > input[name='comment'] {
								flex: 8;
							}

							& > button {
								background-color: black;
								color: white;
								border: 2px solid #87ceeb;
								box-shadow: 2px 2px 2px #87ceeb;
								border-radius: 10px;
								padding: 5px 10px;
								font-size: large;
								margin-right: 0.5ch;

								@media (hover: hover) and (pointer: fine) {
									&:hover {
										background-color: #87ceeb;
										color: black;
										cursor: pointer;
									}

									&:active {
										box-shadow: 0 0 0;
										translate: 2px 2px;
									}
								}
							}
						}

						& > .item-conditioning {
							width: calc(100% - 20px + 1ch);
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: space-evenly;
							margin-bottom: 5px;
							font-size: large;

							& > input {
								font-size: large;
								margin: 0 0.5ch;
							}

							& > input[name='name'] {
								flex: 6;
							}
							& > input[name='duration'] {
								width: 14ch;
							}
							& > input[name='comment'] {
								flex: 8;
							}

							& > button {
								background-color: black;
								color: white;
								border: 2px solid #87ceeb;
								box-shadow: 2px 2px 2px #87ceeb;
								border-radius: 10px;
								padding: 5px 10px;
								font-size: large;
								margin-right: 0.5ch;

								@media (hover: hover) and (pointer: fine) {
									&:hover {
										background-color: #87ceeb;
										color: black;
										cursor: pointer;
									}

									&:active {
										box-shadow: 0 0 0;
										translate: 2px 2px;
									}
								}
							}
						}
					}
				}
			}
		}

		& > .btn-container {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-evenly;
			margin: 10px 0 20px;

			& > .date {
				width: fit-content;
				display: flex;
				flex-direction: row;
				justify-content: start;
				align-items: center;
				font-size: large;

				& > input {
					font-size: large;
					margin-left: 5px;
					padding: 0.5ch 1ch;
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
				font-size: large;
				padding: 5px 10px;

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

export default NewProgram;
