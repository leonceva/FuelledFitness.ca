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

	const axiosPrivate = useAxiosPrivate();

	const resetAll = () => {
		setSearchValue('');
		setUsers(null);
		setSelectedUser('');
		setSearchIndex(null);
		setProgramList(null);
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
	const onClick = (e) => {
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
		// TODO -- set the default selected program to first item (most recently released)
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
			{selectedUser !== '' && (
				<>
					<div className='header'>
						<span className='name'>
							Client:<strong>{selectedUser[0]}</strong>
						</span>
					</div>
					{programList?.length === 0 && <div>No Program Info</div>}
					{programList?.length > 0 && (
						<div className='program-info'>
							<div className='program-select'></div>
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

	& > .program-info {
		background-color: red;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
	}
`;
