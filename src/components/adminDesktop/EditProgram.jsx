import styled from 'styled-components';
import Loader from './Loader';
import { useState, useRef, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const EditProgram = () => {
	const [awaiting, setAwaiting] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [users, setUsers] = useState(null);
	const [selectedUser, setSelectedUser] = useState('');
	const [searchIndex, setSearchIndex] = useState(null);
	const currentSearchIndex = useRef(searchIndex);
	const [programList, setProgramList] = useState(null);
	const [selectedProgram, setSelectedProgram] = useState('');

	const axiosPrivate = useAxiosPrivate();

	const resetAll = () => {
		setSearchValue('');
		setUsers(null);
		setSelectedUser('');
		setSearchIndex(null);
		setProgramList(null);
		setSelectedProgram('');
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
			.get(`/programs/${userId}`, { data: { email: `${selectedUser[2]}` } })
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

	// Add moblity item
	const addMobilityItem = (dayIndex) => {
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
		<EditProgramDiv>
			{awaiting && <Loader />}
			<h3>Edit Program</h3>
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
												<option value={programIndex}>{`${
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
															id={`day-${dayIndex}-mobility-${itemIndex}`}>
															<input
																type='text'
																name='name'
																id={`day-${dayIndex}-mobility-${itemIndex}-name`}
																value={day.mobility[itemIndex].name}
																placeholder='Name'
															/>
															<input
																type='number'
																name='sets'
																id={`day-${dayIndex}-mobility-${itemIndex}-sets`}
																value={day.mobility[itemIndex].sets}
																placeholder='Sets'
																min={1}
															/>
															<input
																type='number'
																name='reps'
																id={`day-${dayIndex}-mobility-${itemIndex}-reps`}
																value={day.mobility[itemIndex].reps}
																placeholder='Reps'
																min={1}
															/>
															<input
																type='text'
																name='comment'
																id={`day-${dayIndex}-mobility-${itemIndex}-comment`}
																value={
																	day.mobility[itemIndex].comment
																}
																placeholder='Comments (optional)'
															/>
															<button
																id={`day-${dayIndex}-mobility-${itemIndex}-button`}
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
													<span>Strength</span>
												</div>
												{day.strength?.map((item, itemIndex) => {
													return (
														<div
															className='item-strength'
															id={`day-${dayIndex}-strength-${itemIndex}`}>
															<input
																type='text'
																name='name'
																id={`day-${dayIndex}-strength-${itemIndex}-name`}
																value={day.strength[itemIndex].name}
																placeholder='Name'
															/>
															<input
																type='number'
																name='sets'
																id={`day-${dayIndex}-strength-${itemIndex}-sets`}
																value={day.strength[itemIndex].sets}
																placeholder='Sets'
																min={1}
															/>
															<input
																type='number'
																name='reps'
																id={`day-${dayIndex}-strength-${itemIndex}-reps`}
																value={day.strength[itemIndex].reps}
																placeholder='Reps'
																min={1}
															/>
															<input
																type='number'
																name='reps'
																id={`day-${dayIndex}-strength-${itemIndex}-load`}
																value={day.strength[itemIndex].load}
																placeholder='Reps'
																min={0}
															/>
															<input
																type='text'
																name='comment'
																id={`day-${dayIndex}-strength-${itemIndex}-comment`}
																value={
																	day.strength[itemIndex].comment
																}
																placeholder='Comments (optional)'
															/>
															<button
																id={`day-${dayIndex}-strength-${itemIndex}-button`}>
																X
															</button>
														</div>
													);
												})}
											</div>
											<div className='category'>
												<div className='title'>
													<span>Conditioning</span>
												</div>
												{day.conditioning?.map((item, itemIndex) => {
													return (
														<div
															className='item-conditioning'
															id={`day-${dayIndex}-conditioning-${itemIndex}`}>
															<input
																type='text'
																name='name'
																id={`day-${dayIndex}-conditioning-${itemIndex}-name`}
																value={
																	day.conditioning[itemIndex].name
																}
																placeholder='Name'
															/>
															<input
																type='number'
																name='duration'
																id={`day-${dayIndex}-conditioning-${itemIndex}-duration`}
																value={
																	day.conditioning[itemIndex]
																		.duration
																}
																placeholder='Duration (min)'
																min={1}
															/>
															<input
																type='text'
																name='comment'
																id={`day-${dayIndex}-conditioning-${itemIndex}-comment`}
																value={
																	day.conditioning[itemIndex]
																		.comment
																}
																placeholder='Comments (optional)'
															/>
															<button
																id={`day-${dayIndex}-conditioning-${itemIndex}-button`}>
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
							<div className='btn-container'>
								<button>Apply Changes</button>
								<button>Clear All</button>
								<button className='delete'>Delete Program</button>
							</div>
						</div>
					)}
				</>
			)}
		</EditProgramDiv>
	);
};

export default EditProgram;

export const EditProgramDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	font-size: calc(min(2vw, 2vh));
	position: relative;
	z-index: 1;
	overflow-y: scroll;

	& > h3 {
		font-size: calc(min(3vw, 3vh));
		width: 100%;
		margin-top: 1em;
		margin-bottom: 1em;
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
					padding-left: 2em;
					text-align: left;
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

		& > .btn-container {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-evenly;
			padding: 5px 0;
			margin: 1em 0;

			& > button {
				background-color: #87ceeb;
				border: 2px solid #333;
				border-radius: 10px;
				padding: 3px 8px;
				color: #333;
				box-shadow: 3px 3px 2px #333;
				width: max-content;

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
`;
