import styled from 'styled-components';
import Loader from './Loader';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useState, useEffect, useRef } from 'react';

const NewProgram = () => {
	const axiosPrivate = useAxiosPrivate();
	const [users, setUsers] = useState(null);
	const [selectedUser, setSelectedUser] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [searchIndex, setSearchIndex] = useState(null);
	const currentSearchIndex = useRef(searchIndex);
	const [awaiting, setAwaiting] = useState(false);
	const [units, setUnits] = useState('kg');
	const [releaseDate, setReleaseDate] = useState(null);
	const [programData, setProgramData] = useState([
		{ day: 1, mobility: [], strength: [], conditioning: [] },
	]);

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
	const onKeyDown = (e) => {
		// Get all the list elements from the search result
		const searchElements = document.querySelectorAll('.dropdown-row');
		const countSearchElements = searchElements.length;

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
	const handleSearchSelect = (e) => {
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
		// Copy mobility list without item
		const mobilityList = [...programData[dayIndex].mobility];
		// Remove selected item
		mobilityList.splice(itemIndex, 1);
		// Replace with new programData object
		newProgram[dayIndex].mobility = mobilityList;
		setProgramData(newProgram);
	};

	// Handle mobility item change
	const handleMobilityChange = (e) => {
		const { value, id } = e.target;
		const dayIndex = id.charAt(4);
		const itemIndex = id.slice(15, id.indexOf('-', 15));

		// Deep copy programData object
		let newProgram = JSON.parse(JSON.stringify(programData));
		// Copy mobility list without item
		let mobilityList = [...programData[dayIndex].mobility];
		// Change selected item
		mobilityList[itemIndex].name = value;
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
		const { value, id } = e.target;
		const dayIndex = id.charAt(4);
		const itemIndex = id.slice(15, id.indexOf('-', 15));

		// Deep copy programData object
		let newProgram = JSON.parse(JSON.stringify(programData));
		// Copy mobility list without item
		let strengthList = [...programData[dayIndex].strength];
		// Change selected item
		strengthList[itemIndex].name = value;
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
		const itemIndex = id.slice(18, id.indexOf('-', 18));

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
		const { value, id } = e.target;
		const dayIndex = id.charAt(4);
		const itemIndex = id.slice(18, id.indexOf('-', 18));

		// Deep copy programData object
		let newProgram = JSON.parse(JSON.stringify(programData));
		// Copy conditioning list without item
		let conditioningList = [...programData[dayIndex].conditioning];
		// Change selected item
		conditioningList[itemIndex].name = value;
		// Replace with new programData object
		newProgram[dayIndex].conditioning = conditioningList;
		setProgramData(newProgram);
	};

	// Toggle between kg and lbs
	const handleUnitChange = () => {
		if (units === 'kg') {
			setUnits('lbs');
		}
		if (units === 'lbs') {
			setUnits('kg');
		}
	};

	// Handle release date change
	const handleReleaseChange = (e) => {
		const { value } = e.target;
		setReleaseDate(value);
	};

	// Handle submit new program
	const handleSubmit = () => {
		const programList = [...programData];
		console.log('Program Data');
		console.log(programList);
		console.log(`Release Date: ${releaseDate}`);
		console.log(`Client Email: ${selectedUser[2]}`);
	};

	// On render
	useEffect(() => {
		resetAll();
		getUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// On selected user change
	useEffect(() => {
		setSearchValue('');
		setSearchIndex(null);
	}, [selectedUser]);

	return (
		<NewProgramDiv>
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
											onClick={handleSearchSelect}>
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
								<div className='units'>
									kg
									<div
										className='slider'
										onClick={handleUnitChange}>
										<div
											className={`circle ${
												units === 'kg' ? 'left' : 'right'
											}`}
										/>
									</div>
									lbs
								</div>
							</div>
						</div>
						<div className='content'>
							{programData.map((dayObject, dayIndex) => {
								return (
									<div
										className='day'
										id={`day-${dayIndex}`}>
										<div className='title'>{`Day: ${dayIndex + 1}`}</div>
										<div className='category'>
											<div className='title'>
												<span
													onClick={() => {
														addMobilityItem(dayIndex);
													}}>
													Add Mobility
												</span>
											</div>
											<>
												{dayObject.mobility.map((item, itemIndex) => {
													return (
														<div
															className='item-mobility'
															id={`day-${dayIndex}-mobility-${itemIndex}`}>
															<input
																type='text'
																name='name'
																id={`day-${dayIndex}-mobility-${itemIndex}-name`}
																value={
																	programData[dayIndex].mobility[
																		itemIndex
																	].name
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
																value={
																	programData[dayIndex].mobility[
																		itemIndex
																	].sets
																}
																placeholder='Sets'
																onChange={(e) => {
																	handleMobilityChange(e);
																}}
															/>
															<input
																type='number'
																name='reps'
																id={`day-${dayIndex}-mobility-${itemIndex}-reps`}
																value={
																	programData[dayIndex].mobility[
																		itemIndex
																	].reps
																}
																placeholder='Reps'
																onChange={(e) => {
																	handleMobilityChange(e);
																}}
															/>
															<input
																type='text'
																name='comment'
																id={`day-${dayIndex}-mobility-${itemIndex}-comment`}
																value={
																	programData[dayIndex].mobility[
																		itemIndex
																	].comment
																}
																placeholder='Comments'
																onChange={(e) => {
																	handleMobilityChange(e);
																}}
															/>
															<></>
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
											</>
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
											<>
												{dayObject.strength.map((item, itemIndex) => {
													return (
														<div
															className='item-strength'
															id={`day-${dayIndex}-strength-${itemIndex}`}>
															<input
																type='text'
																name='name'
																id={`day-${dayIndex}-strength-${itemIndex}-name`}
																value={
																	programData[dayIndex].strength[
																		itemIndex
																	].name
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
																value={
																	programData[dayIndex].strength[
																		itemIndex
																	].sets
																}
																placeholder='Sets'
																onChange={(e) => {
																	handleStrengthChange(e);
																}}
															/>
															<input
																type='number'
																name='reps'
																id={`day-${dayIndex}-strength-${itemIndex}-reps`}
																value={
																	programData[dayIndex].strength[
																		itemIndex
																	].reps
																}
																placeholder='Reps'
																onChange={(e) => {
																	handleStrengthChange(e);
																}}
															/>
															<input
																type='number'
																name='load'
																id={`day-${dayIndex}-strength-${itemIndex}-load`}
																value={
																	programData[dayIndex].strength[
																		itemIndex
																	].load
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
																value={
																	programData[dayIndex].strength[
																		itemIndex
																	].comment
																}
																placeholder='Comments'
																onChange={(e) => {
																	handleStrengthChange(e);
																}}
															/>
															<></>
															<button
																id={`day-${dayIndex}-strength-${itemIndex}-button`}
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
												<span
													onClick={() => {
														addConditioningItem(dayIndex);
													}}>
													Add Conditioning
												</span>
											</div>
											<>
												{dayObject.conditioning.map((item, itemIndex) => {
													return (
														<div
															className='item-conditioning'
															id={`day-${dayIndex}-conditioning-${itemIndex}`}>
															<input
																type='text'
																name='name'
																id={`day-${dayIndex}-conditioning-${itemIndex}-name`}
																value={
																	programData[dayIndex]
																		.conditioning[itemIndex]
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
																value={
																	programData[dayIndex]
																		.conditioning[itemIndex]
																		.duration
																}
																placeholder='Duration'
																onChange={(e) => {
																	handleConditioningChange(e);
																}}
															/>
															<input
																type='text'
																name='comment'
																id={`day-${dayIndex}-conditioning-${itemIndex}-comment`}
																value={
																	programData[dayIndex]
																		.conditioning[itemIndex]
																		.comment
																}
																placeholder='Comments'
																onChange={(e) => {
																	handleConditioningChange(e);
																}}
															/>
															<></>
															<button
																id={`day-${dayIndex}-conditioning-${itemIndex}-button`}
																onClick={(e) =>
																	removeConditioningItem(e)
																}>
																X
															</button>
														</div>
													);
												})}
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
								pattern='\d{4}-\d{2}-\d{2}'
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
		</NewProgramDiv>
	);
};

export default NewProgram;

export const NewProgramDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	font-size: calc(min(2vw, 2vh));
	position: relative;
	overflow-x: hidden;
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
						background-color: lightgray;
					}
				}

				& > .hover {
					background-color: lightgray;
				}
			}
		}
	}

	& > .new-program {
		width: 100%;
		flex: 1;
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

			& > .name {
				width: fit-content;
				text-align: left;
				padding-left: 5%;
				margin-top: 1em;

				& > strong {
					margin-left: 0.5em;
				}
			}

			& > .settings-container {
				flex: 1;
				display: flex;
				flex-direction: row;
				justify-content: end;
				align-items: center;
				margin-left: 5%;
				flex-wrap: wrap;

				& > .days {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					margin: 1em 0.5em 0;

					& > .number {
						padding: 0 0.5em;
						margin: 0 0.5em;
						background-color: #ffffff;
						border: 2px solid #333;
						width: 3em;
						border-radius: 5px;
					}

					& > span {
						margin-right: 0.5em;
					}

					& > button {
						background-color: #87ceeb;
						border: 2px solid #333;
						border-radius: 10px;
						padding: 3px 8px;
						color: black;
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
				}

				& > .units {
					display: flex;
					align-items: center;
					justify-content: center;
					padding-right: 3em;
					margin: 1em 0.5em 0;

					& > .slider {
						width: 50px;
						position: relative;
						height: 1em;
						border: 2px solid #333;
						border-radius: 5px;
						margin: 0 0.6em;
						box-shadow: 2px 2px 2px #333;
						background-color: lightgray;

						&:hover {
							cursor: pointer;
						}
						&:active {
							box-shadow: 0px 0px 0px;
							transform: translate(2px, 2px);
						}

						& > .circle {
							height: 0.8em;
							width: 0.8em;
							background-color: #333;
							border-radius: 0.8em;
							position: absolute;
						}
						& > .left {
							left: 0.1em;
							transition: all 300ms;
						}
						& > .right {
							transition: all 300ms;
							left: calc(100% - 0.9em);
						}
					}
				}
			}
		}
		& > .content {
			width: 100%;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;

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
					font-size: 1.2em;
					text-align: left;
					padding-left: 2em;
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
						padding-left: 5em;
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
	}

	& > .btn-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;
		padding: 5px 0;

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
	}
`;
