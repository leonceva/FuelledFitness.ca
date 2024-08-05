import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Loader from './Loader';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE_LIMIT;

const Exercises = () => {
	const axiosPrivate = useAxiosPrivate();
	const [searchValue, setSearchValue] = useState('');
	const [searchIndex, setSearchIndex] = useState(null);
	const currentSearchIndex = useRef(searchIndex);
	const [exercises, setExercises] = useState(null);
	const [selectedExercise, setSelectedExercise] = useState('');
	const [selectedNew, setSelectedNew] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		link: '',
	});
	const [embedLink, setEmbedLink] = useState(null);
	const [formError, setFormError] = useState(null);
	const [selectedDelete, setSelectedDelete] = useState(false);
	const [awaiting, setAwaiting] = useState(false);

	// Reset all states
	const resetAll = () => {
		setSearchValue('');
		setSelectedExercise('');
		setSearchIndex(null);
		setSelectedNew(false);
		setFormData({
			name: '',
			link: '',
		});
		setFormError(null);
		setSelectedDelete(false);
		setEmbedLink(null);
	};

	// Handle change to the exercise search field
	const onChangeSearch = (e) => {
		setSearchValue(e.target.value);
		setSearchIndex(null);
	};

	// When pressed Enter in search select top option as the user
	const onKeyDown = (e) => {
		// Get all the list elements from the search result
		const searchElements = document.querySelectorAll('.dropdown-row');
		const countSearchElements = searchElements.length;

		if (e.code === 'Enter') {
			if (currentSearchIndex.current !== null) {
				searchElements[currentSearchIndex.current]?.click();
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
		if (e.target.id === 'exercise-new') {
			setSelectedNew(true);
			setFormData({ name: searchValue, link: '' });
			setSearchValue('');
		} else {
			exercises.map((exercise) => {
				if (exercise[0] === e.target.innerHTML) {
					setSelectedExercise(exercise);
					setSearchValue('');
					return null;
				}
				return null;
			});
		}
	};

	// When a search item is hovered
	const onMouseMove = (e) => {
		if (searchValue !== '') {
			const searchElements = document?.querySelectorAll('.dropdown-row');
			const countSearchElements = searchElements.length;
			const itemId = e.target.id;
			let itemIndex;
			if (itemId !== 'exercise-new') {
				itemIndex = itemId.slice(itemId.indexOf('-') + 1);
			} else {
				itemIndex = countSearchElements - 1;
			}
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
		}
	};

	// When a user is no longer hovered with mouse
	const onMouseLeaveSearch = (e) => {
		const searchElements = document?.querySelectorAll('.dropdown-row');
		const countSearchElements = searchElements.length;
		const itemId = e.target.id;
		let itemIndex;
		if (itemId !== 'exercise-new') {
			itemIndex = itemId.slice(itemId.indexOf('-') + 1);
		} else {
			itemIndex = countSearchElements - 1;
		}

		// Remove hover class for element
		searchElements[itemIndex]?.classList?.remove('hover');
	};

	// When the exercise form is changed
	const handleChangeForm = (e) => {
		// Clear any existing form error
		if (formError !== null) {
			setFormError(null);
		}
		const { name, value, id } = e.target;
		// Exercise name change
		if (id === 'exercise-name') {
			setFormData((prevData) => {
				return { ...prevData, [name]: value };
			});
		}

		// Exercise link change
		if (id === 'exercise-link') {
			setFormData((prevData) => {
				return { ...prevData, [name]: value };
			});
		}
	};

	// Get an array of all the exercises in the database
	const getExercises = async () => {
		setAwaiting(true);
		await axiosPrivate
			.get('/exercises')
			.then((res) => {
				setExercises(
					res?.data?.rows?.map((exercise, i) => {
						// console.log(res.data.rows);
						return [exercise.name, exercise.exercise_id, exercise.link];
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

	// When selected exercise is changed
	useEffect(() => {
		setFormData({
			name: selectedExercise[0],
			link: selectedExercise[2],
		});
		const splitArray = selectedExercise[2]?.split('/') || null;
		let embedCode = null;
		if (splitArray !== null) {
			embedCode = splitArray[splitArray.length - 1];
			setEmbedLink(embedCode);
		}
	}, [selectedExercise]);

	// Validate inputs
	const validateInputs = () => {
		// Exercise Name
		if (formData.name.length < 1 || formData.name.length > 50) {
			setFormError('Exercise name must be between 1 and 50 characters');
			return false;
		}
		// Check if exercise link matches a Youtube link
		if (
			!formData.link.match(
				// eslint-disable-next-line no-useless-escape
				/(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/
			)
		) {
			setFormError('Invalid YouTube link');
			return false;
		}

		// If no error with inputs
		setFormError(null);
		return true;
	};

	// When form is submitted for new exercise
	const handleCreateNew = (e) => {
		e.preventDefault();
		if (validateInputs()) {
			// Send the put request
			sendFormDataNew();
		}
	};

	// When form is submitted to change exercise
	const handleApplyChanges = (e) => {
		e.preventDefault();
		if (validateInputs()) {
			// Send the patch request
			sendFormDataChanges();
		}
	};

	// Send form data to create new exercise
	const sendFormDataNew = async () => {
		setAwaiting(true);
		await axiosPrivate
			.post('/exercises', {
				name: formData.name,
				link: formData.link,
			})
			.then((res) => {
				// Clear form data
				setFormData({
					name: '',
					link: '',
				});
				setSelectedNew(false);
			})
			.catch((err) => {
				console.log(err?.response?.status);
				if (err?.response?.status) {
					switch (err.response.status) {
						case 503:
							setFormError('Database entry failed');
							break;
						case 409:
							setFormError('Exercise/Link already exists');
							break;
						default:
							setFormError('Exercise entry failed');
							break;
					}
				} else {
					console.log(err);
					setFormError('Service Failed - check logs');
				}
			})
			.finally(() => {
				setAwaiting(false);
				getExercises();
			});
	};

	// Send for data to apply changes
	const sendFormDataChanges = async () => {
		setAwaiting(true);
		await axiosPrivate
			.patch('/exercises', {
				name: formData.name,
				id: selectedExercise[1],
				link: formData.link,
			})
			.then((res) => {
				// Clear form data
				setFormData({
					name: '',
					link: '',
				});
				setSelectedExercise('');
			})
			.catch((err) => {
				console.log(err?.response?.status);
				if (err?.response?.status) {
					switch (err.response.status) {
						case 404:
							setFormError('Not found in database');
							break;
						default:
							setFormError('Exercise update failed');
							break;
					}
				} else {
					console.log(err);
					setFormError('Service Failed - check logs');
				}
			})
			.finally(() => {
				setAwaiting(false);
				getExercises();
			});
	};

	// Remove exercise from data base
	const deleteExercise = async (e) => {
		e.preventDefault();
		setAwaiting(true);
		await axiosPrivate
			.delete('/exercises', {
				data: {
					id: selectedExercise[1],
				},
			})
			.then((res) => {
				resetAll();
				getExercises();
			})
			.catch((err) => {
				console.log(err?.response?.status);
				if (err?.response?.status) {
					switch (err.response.status) {
						// Response codes
						case 406:
							setFormError('Exercise ID not valid');
							break;
						case 404:
							setFormError('Exercise ID not found in database');
							break;
						default:
							setFormError('Exercise update failed');
							break;
					}
				} else {
					console.log(err);
					setFormError('Service Failed - check logs');
				}
			})
			.finally(() => {
				setAwaiting(false);
			});
	};

	// On render
	useEffect(() => {
		resetAll();
		getExercises();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<DesktopDiv>
				{awaiting && <Loader />}
				<h3>Exercise List & Tutorials</h3>
				<div className='search'>
					<div className='search-results'>
						<input
							type='text'
							name='exercise'
							disabled={selectedNew}
							onChange={onChangeSearch}
							value={searchValue}
							onKeyDown={onKeyDown}
							placeholder='Type an exercise name to begin search'
						/>

						{searchValue !== '' && (
							<div className='dropdown'>
								{exercises
									?.filter((exercise) => {
										return exercise[0]
											.toLowerCase()
											.includes(searchValue.toLowerCase());
									})
									.slice(0, 9)
									.sort()
									.map((exercise, i) => {
										return (
											<li
												id={`exercise-${i}`}
												key={exercise[1]}
												className='dropdown-row'
												onClick={onClick}
												onMouseMove={onMouseMove}
												onMouseLeave={onMouseLeaveSearch}>
												{exercise[0]}
											</li>
										);
									})}
								<li
									className='dropdown-row'
									id='exercise-new'
									onMouseMove={onMouseMove}
									onMouseLeave={onMouseLeaveSearch}
									onClick={onClick}
									style={{ fontWeight: 'bold' }}>
									Create New Item
								</li>
							</div>
						)}
					</div>
				</div>
				{selectedNew && (
					<form
						className='new-exercise'
						onSubmit={handleChangeForm}>
						<div
							className={`error ${formError === null ? 'hide-error' : 'show-error'}`}>
							{formError}
						</div>
						<label htmlFor='exercise-name'>Exercise Name:</label>
						<input
							id='exercise-name'
							name='name'
							type='text'
							value={formData.name}
							onChange={handleChangeForm}
						/>

						<label htmlFor='exercise-link'>Exercise Link:</label>
						<input
							id='exercise-link'
							name='link'
							type='text'
							value={formData.link}
							onChange={handleChangeForm}
						/>
						<div className='btn-container'>
							<button
								type='button'
								className='btn'
								onClick={handleCreateNew}>
								Save Changes
							</button>
							<button
								type='button'
								className='btn'
								onClick={resetAll}>
								Cancel
							</button>
						</div>
					</form>
				)}
				{selectedExercise && (
					<form
						className='selected-exercise'
						onSubmit={handleChangeForm}>
						<div
							className={`error ${formError === null ? 'hide-error' : 'show-error'}`}>
							{formError}
						</div>
						<label htmlFor='exercise-name'>Exercise Name:</label>
						<input
							id='exercise-name'
							name='name'
							type='text'
							value={formData.name}
							onChange={handleChangeForm}
						/>

						<label htmlFor='exercise-link'>Exercise Link:</label>
						<input
							id='exercise-link'
							name='link'
							type='text'
							value={formData.link}
							onChange={handleChangeForm}
						/>
						{embedLink !== null && (
							<div className='video-container'>
								<iframe
									src={`https://youtube.com/embed/${embedLink}`}
									title='embed-video'
									width='100%'
									height='100%'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
									referrerPolicy='strict-origin-when-cross-origin'
									allowFullScreen
								/>
							</div>
						)}
						<div className='btn-container'>
							<button
								type='button'
								className='btn'
								onClick={handleApplyChanges}>
								Save Changes
							</button>
							<button
								type='button'
								className='btn'
								onClick={resetAll}>
								Cancel
							</button>
							<button
								type='button'
								className='btn delete'
								onClick={() => {
									setSelectedDelete(true);
								}}>
								Delete
							</button>
						</div>
						{selectedDelete && (
							<div className='delete-container'>
								This cannot be undone, delete?
								<button
									type='button'
									className='btn'
									onClick={deleteExercise}>
									Yes
								</button>
								<button
									type='button'
									className='btn'
									onClick={() => {
										setSelectedDelete(false);
									}}>
									No
								</button>
							</div>
						)}
					</form>
				)}
			</DesktopDiv>
		</>
	);
};

export default Exercises;

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
					left: 0;
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

		& > .new-exercise,
		.selected-exercise {
			width: calc(max(400px, 50%));
			height: auto;
			margin-top: 10px;
			margin-bottom: 20px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: start;

			& > .error {
				width: 100%;
				height: auto;
				margin: 0.5ch;
				font-size: large;
				color: red;
			}

			& > .hide-error {
				opacity: 0;

				&::after {
					content: 'placeholder';
				}
			}

			& > .show-error {
				opacity: 1;
			}

			& > label {
				width: 100%;
				margin: 0.5ch 0;
				font-size: large;
			}

			& > input {
				width: calc(100% - 1ch);
				padding: 0.5ch;
				font-size: large;
			}

			& > .video-container {
				width: 50%;
				aspect-ratio: 1/1;
				margin-top: 10px;

				& > iframe {
					border: 2px solid white;
				}
			}

			& > .btn-container {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-evenly;
				align-items: center;
				margin-top: 10px;

				& > button {
					width: fit-content;
					max-width: 100%;
					margin-bottom: 10px;
				}

				& > .delete {
					background-color: darkred;

					&:hover {
						color: black;
						background-color: red;
					}
				}
			}

			& > .delete-container {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-evenly;
				align-items: center;
				margin-top: 10px;
			}
		}
	}
	// Hide for mobile size
	@media screen and ((max-width: ${MOBILE_MODE_LIMIT}) or (width: ${MOBILE_MODE_LIMIT})) {
		display: none;
	}
`;
