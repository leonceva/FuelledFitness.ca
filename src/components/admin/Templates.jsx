import styled from 'styled-components';
import Loader from './Loader';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useState, useEffect, useRef } from 'react';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE_LIMIT;

const Templates = () => {
	const axiosPrivate = useAxiosPrivate();
	const [alertMessage, setAlertMessage] = useState('');
	const [awaiting, setAwaiting] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [templates, setTemplates] = useState(null);
	const [selectedTemplate, setSelectedTemplate] = useState(null);
	const [selectedNew, setSelectedNew] = useState(false);
	const [templateData, setTemplateData] = useState({
		name: '',
		description: '',
		data: [{ day: 1, mobility: [], strength: [], conditioning: [] }],
	});
	const cardRefs = useRef({});
	const [searchResults, setSearchResults] = useState([]);

	const resetAll = () => {
		setAlertMessage('');
		setAwaiting(false);
		setSearchValue('');
		setTemplates(null);
		setSelectedTemplate(null);
		setSelectedNew(false);
		setTemplateData({
			name: '',
			description: '',
			data: [{ day: 1, mobility: [], strength: [], conditioning: [] }],
		});
		setSearchResults([]);
	};

	// Request all templates from database
	const getTemplates = async () => {
		setAwaiting(true);
		await axiosPrivate
			.get('/templates')
			.then((res) => {
				// Empty results
				setTemplates(
					res?.data?.rows?.map((template, i) => {
						return [template.template_id, template.name, template.description];
					})
				);
			})
			.catch((err) => {
				alert(err);
			})
			.finally(() => {
				setAwaiting(false);
			});
	};

	// Handle key press when alert message is visible
	const handleKeyAlert = (e) => {
		setAlertMessage('');
		document.removeEventListener('keydown', handleKeyAlert);
	};

	// Handle change to the template search field
	const onChangeSearch = (e) => {
		setSearchValue(e.target.value);
	};

	// Handle change to template name
	const onChangeTemplateName = (e) => {
		// Deep copy templateData object
		let newTemplate = JSON.parse(JSON.stringify(templateData));
		newTemplate.name = e.target.value;
		setTemplateData(newTemplate);
	};

	// Handle change to template description
	const onChangeTemplateDescription = (e) => {
		// Deep copy templateData object
		let newTemplate = JSON.parse(JSON.stringify(templateData));
		newTemplate.description = e.target.value;
		setTemplateData(newTemplate);
	};

	// Handle cinrease/decrease of days in template
	const handleDayChange = (change) => {
		// Deep copy templateData object
		let newTemplate = JSON.parse(JSON.stringify(templateData));
		const numDays = templateData.data.length;

		// Handle increase in days
		if (change === 'increase') {
			if (numDays < 7) {
				const templateList = [
					...templateData.data,
					{
						day: numDays + 1,
						mobility: [],
						strength: [],
						conditioning: [],
					},
				];
				newTemplate.data = templateList;
				setTemplateData(newTemplate);
			}
		}

		// Handle decrease in days
		if (change === 'decrease') {
			if (numDays > 1) {
				let templateList = [...newTemplate.data];
				templateList.pop();
				newTemplate.data = templateList;
				setTemplateData(newTemplate);
			}
		}
	};

	// Add mobility item
	const addMobilityItem = (dayIndex) => {
		// Deep copy templateData object
		let newTemplate = JSON.parse(JSON.stringify(templateData));
		// Copy mobility list
		let mobilityList = [...templateData.data[dayIndex].mobility];
		// Add new blank item entry
		mobilityList.push({ name: '', sets: '', resps: '', comment: '' });
		// Replace with new list
		newTemplate.data[dayIndex].mobility = mobilityList;
		// Replace with new templateData object
		setTemplateData(newTemplate);
	};

	// Handle mobility item change
	const handleMobilityChange = (e) => {
		const { name, value, id } = e.target;
		const dayIndex = id.charAt(4);
		const itemIndex = id.slice(15, id.indexOf('-', 15));

		// Deep copy templateData object
		let newTemplate = JSON.parse(JSON.stringify(templateData));
		// Copy mobility list
		let mobilityList = [...templateData.data[dayIndex].mobility];
		// Change selected item
		mobilityList[itemIndex][name] = value;
		// Replace with new templateData object
		newTemplate.data[dayIndex].mobility = mobilityList;
		setTemplateData(newTemplate);
	};

	// Remove mobility item
	const removeMobilityItem = (e) => {
		const id = e.target.id;
		const dayIndex = id.charAt(4);
		const itemIndex = id.slice(15, id.indexOf('-', 15));

		// Deep copy templateData object
		let newTemplate = JSON.parse(JSON.stringify(templateData));
		// Copy mobility list
		let mobilityList = [...templateData.data[dayIndex].mobility];
		// Remove selected item
		mobilityList.splice(itemIndex, 1);
		// Replace with new templateData object
		newTemplate.data[dayIndex].mobility = mobilityList;
		setTemplateData(newTemplate);
	};

	// Add strength item
	const addStrengthItem = (dayIndex) => {
		// Deep copy templateData object
		let newTemplate = JSON.parse(JSON.stringify(templateData));
		// Copy strength list
		let strengthList = [...templateData.data[dayIndex].strength];
		// Add new blank item entry
		strengthList.push({ name: '', sets: '', reps: '', load: '', comment: '' });
		// Replace with new list
		newTemplate.data[dayIndex].strength = strengthList;
		// Replace with new templateData object
		setTemplateData(newTemplate);
	};

	// Handle strength item change
	const handleStrengthChange = (e) => {
		const { name, value, id } = e.target;
		const dayIndex = id.charAt(4);
		const itemIndex = id.slice(15, id.indexOf('-', 15));

		// Deep copy templateData object
		let newTemplate = JSON.parse(JSON.stringify(templateData));
		// Copy strength list
		let strengthList = [...templateData.data[dayIndex].strength];
		// Change selected item
		strengthList[itemIndex][name] = value;
		// Replace with new templateData object
		newTemplate.data[dayIndex].strength = strengthList;
		setTemplateData(newTemplate);
	};

	// Remove strength item
	const removeStrengthItem = (e) => {
		const id = e.target.id;
		const dayIndex = id.charAt(4);
		const itemIndex = id.slice(15, id.indexOf('-', 15));

		// Deep copy templateData object
		let newTemplate = JSON.parse(JSON.stringify(templateData));
		// Copy strength list
		let strengthList = [...templateData.data[dayIndex].strength];
		// Remove selected item
		strengthList.splice(itemIndex, 1);
		// Replace with new templateData object
		newTemplate.data[dayIndex].strength = strengthList;
		setTemplateData(newTemplate);
	};

	// Add conditioning item
	const addConditioningItem = (dayIndex) => {
		// Deep copy templateData object
		let newTemplate = JSON.parse(JSON.stringify(templateData));
		// Copy strength list
		let conditioningList = [...templateData.data[dayIndex].conditioning];
		// Add new blank item entry
		conditioningList.push({ name: '', duration: '', comment: '' });
		// Replace with new list
		newTemplate.data[dayIndex].conditioning = conditioningList;
		// Replace with new templateData object
		setTemplateData(newTemplate);
	};

	// Handle conditioning item change
	const handleConditioningChange = (e) => {
		const { name, value, id } = e.target;
		const dayIndex = id.charAt(4);
		const itemIndex = id.slice(19, id.indexOf('-', 19));

		// Deep copy templateData object
		let newTemplate = JSON.parse(JSON.stringify(templateData));
		// Copy strength list
		let conditioningList = [...templateData.data[dayIndex].conditioning];
		// Change selected item
		conditioningList[itemIndex][name] = value;
		// Replace with new templateData object
		newTemplate.data[dayIndex].conditioning = conditioningList;
		setTemplateData(newTemplate);
	};

	// Remove conditioning item
	const removeConditioningItem = (e) => {
		const id = e.target.id;
		const dayIndex = id.charAt(4);
		const itemIndex = id.slice(19, id.indexOf('-', 19));

		// Deep copy templateData object
		let newTemplate = JSON.parse(JSON.stringify(templateData));
		// Copy strength list
		let conditioningList = [...templateData.data[dayIndex].conditioning];
		// Remove selected item
		conditioningList.splice(itemIndex, 1);
		// Replace with new templateData object
		newTemplate.data[dayIndex].conditioning = conditioningList;
		setTemplateData(newTemplate);
	};

	// Handle submission of templateData
	const handleSubmitTemplate = () => {
		if (verifyValues() === true) {
			setAwaiting(true);
			// Create a new template
			if (selectedNew === true && selectedTemplate === null) {
				axiosPrivate
					.put('/templates', {
						name: templateData.name,
						description: templateData.description,
						data: templateData.data,
					})
					.then((res) => {
						setAlertMessage(res?.data);
						if (res?.status === 201) {
							resetAll();
						}
					})
					.catch((err) => {
						alert('Unable to create program, check logs');
						console.log(err);
					})
					.finally(() => {
						setAwaiting(false);
						getTemplates();
					});
			}
			// TODO -- Update an existing template
			if (selectedNew === false && selectedTemplate !== null) {
				setAwaiting(false);
			}
		}
	};

	// Verify templateData values
	const verifyValues = () => {
		var errorMessage = '';

		// Check if template name is empty (less than 5 chars)
		if (templateData.name?.length < 5) {
			errorMessage = 'Template name must be 5 characters or more';
		} else {
			templateData.data?.forEach((day, dayIndex) => {
				// Check if day is empty
				if (
					day.mobility.length === 0 &&
					day.strength.length === 0 &&
					day.conditioning.length === 0
				) {
					errorMessage = `Day ${dayIndex + 1} is empty`;
				} else {
					if (day.mobility.length !== 0) {
						day.mobility.forEach((item, itemIndex) => {
							// Check .name
							if (item.name === '') {
								// Check if empty
								errorMessage = `Day ${dayIndex + 1}\nMobility #${
									itemIndex + 1
								} - Name is empty`;
							}
							// Check .sets
							if (item.sets === '') {
								// Check if empty
								errorMessage = `Day ${dayIndex + 1}\nMobility #${
									itemIndex + 1
								} - Sets is empty`;
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
							}
							// Check .sets
							if (item.sets === '') {
								// Check if empty
								errorMessage = `Day ${dayIndex + 1}\nStrength #${
									itemIndex + 1
								} - Sets is empty`;
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

		// Return depending on errorMessage
		if (errorMessage === '') {
			return true;
		} else {
			setAlertMessage(errorMessage);
			return false;
		}
	};

	// Handle card mouse leave and scroll to top of description
	const cardMouseLeave = (cardID) => {
		if (cardRefs.current[cardID]) {
			cardRefs.current[cardID].scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	// Handle click of a template card
	const handleSelectCard = async (cardID) => {
		// Get info of the selected template
		setAwaiting(true);
		await axiosPrivate
			.get(`/templates/${cardID}`)
			.then((res) => {
				// Succesful request
				if (res?.status === 200) {
					setSelectedTemplate(res.data);
					setTemplateData(res.data);
					setSearchValue('');
					setSelectedNew(false);
				} else {
					// Unexpected query results
					setAlertMessage(`Failed to load template - check logs`);
					console.log(res);
				}
			})
			.catch((err) => {
				setAlertMessage('Could not get template data');
				console.log(err);
			})
			.finally(() => {
				setAwaiting(false);
			});
	};

	// TODO -- Handle delete selected template
	const handleDeleteTemplate = (templateID) => {
		console.log(templateID);
	};

	// When alert status changes
	useEffect(() => {
		if (alertMessage !== '') {
			// Create event lsitener
			document.addEventListener('keydown', handleKeyAlert, { once: true });
			// Remove event listener
			return () => {
				document.removeEventListener('keydown', handleKeyAlert);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [alertMessage]);

	// On render
	useEffect(() => {
		resetAll();
		getTemplates();
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
							onKeyDown={handleKeyAlert}
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
				<h3>Program Templates</h3>
				<div className='search'>
					<label htmlFor='search'>Template Name:</label>
					<div className='search-results'>
						<input
							type='text'
							name='search'
							id='search'
							disabled={selectedNew}
							onChange={onChangeSearch}
							value={searchValue}
							placeholder='Type a name to begin search'
						/>
					</div>
				</div>

				{selectedNew === false && selectedTemplate === null && (
					<>
						<button
							className='btn'
							onClick={() => {
								setSelectedNew(true);
								setSelectedTemplate(null);
							}}>
							Create New Template
						</button>
						<div className='results-container'>
							{templates?.length === 0 && <h4>No Templates Found</h4>}
							{templates?.length !== 0 && (
								<>
									{/* 	
									Display all templates when search bar is empty
									May need to rivist in future if too many templates are loading
									*/}
									{searchValue === '' && (
										// List all templates for empty search
										<>
											{templates?.map((template, index) => {
												return (
													<div
														className='template-card'
														id={`template-${index}`}
														key={`template-${index}`}
														onClick={() =>
															handleSelectCard(template[0])
														}>
														<div
															className='card-content'
															ref={(el) => {
																cardRefs.current[template[0]] = el;
															}}
															onMouseLeave={() => {
																cardMouseLeave(template[0]);
															}}>
															<h3>{template[1]}</h3>
															<p>{template[2]}</p>
														</div>
													</div>
												);
											})}
										</>
									)}
									{searchValue !== '' && <>{searchResults}</>}
									{/* Div added to create proper margin bottom for cards in the event flex-wrap is needed for .results-container */}
									<div style={{ width: '100%', height: '1px' }} />
								</>
							)}
						</div>
					</>
				)}

				{(selectedNew || selectedTemplate) && !awaiting && (
					<>
						<div className='template'>
							{selectedNew === true && selectedTemplate === null && (
								<span className='title'>New Template</span>
							)}
							{selectedNew === false && selectedTemplate !== null && (
								<span className='title'>Edit Template</span>
							)}
							<div className='header'>
								<input
									type='text'
									className='template-name'
									name='template-name'
									id='template-name'
									value={templateData.name}
									onChange={onChangeTemplateName}
									placeholder='Template Name'
								/>
								<textarea
									name='template-description'
									className='template-description'
									id='template-description'
									value={templateData.description}
									onChange={onChangeTemplateDescription}
									placeholder='Enter a description for the template (optional)'
								/>
								<div className='days'>
									<span>Total Days:</span>
									<button
										onClick={() => {
											handleDayChange('decrease');
										}}>
										<i className='bi bi-dash-lg' />
									</button>
									<span className='number'>{templateData?.data?.length}</span>
									<button
										onClick={() => {
											handleDayChange('increase');
										}}>
										<i className='bi bi-plus-lg' />
									</button>
								</div>
							</div>
							<div className='content'>
								{templateData?.data?.map((dayObject, dayIndex) => {
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
																		templateData.data[dayIndex]
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
																		templateData.data[dayIndex]
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
																		templateData.data[dayIndex]
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
																		templateData.data[dayIndex]
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
																		templateData.data[dayIndex]
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
																		templateData.data[dayIndex]
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
																		templateData.data[dayIndex]
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
																		templateData.data[dayIndex]
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
																		templateData.data[dayIndex]
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
																			templateData.data[
																				dayIndex
																			].conditioning[
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
																			templateData.data[
																				dayIndex
																			].conditioning[
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
																			templateData.data[
																				dayIndex
																			].conditioning[
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
							<button
								className='btn'
								onClick={handleSubmitTemplate}>
								Save
							</button>
							{selectedNew === false && selectedTemplate !== null && (
								<button
									className='btn'
									onClick={() => {
										setTemplateData(selectedTemplate);
									}}>
									Discard Changes
								</button>
							)}
							<button
								className='btn'
								onClick={() => {
									setSearchValue('');
									setTemplateData({
										name: '',
										description: '',
										data: [
											{
												day: 1,
												mobility: [],
												strength: [],
												conditioning: [],
											},
										],
									});
									setSelectedTemplate(null);
									setSelectedNew(false);
								}}>
								Cancel
							</button>
							{selectedNew === false && selectedTemplate !== null && (
								<button
									className='btn'
									onClick={() => {
										handleDeleteTemplate(selectedTemplate.template_id);
									}}>
									Delete
								</button>
							)}
						</div>
					</>
				)}
			</DesktopDiv>
		</>
	);
};

export default Templates;

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
			z-index: 5;
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
				width: 3ch;
				font-size: large;
				aspect-ratio: 1/1;
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
						cursor: pointer;
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
			align-items: center;
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
				width: calc(min(300px, 50%));
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
			}
		}

		& > .btn {
			margin: 20px 0;
		}

		& > h4 {
			font-size: x-large;
			width: 100%;
			margin: 0;
			padding: 0;
			text-align: center;
		}

		& > .template {
			display: flex;
			flex-direction: column;
			width: 100%;
			justify-content: start;
			align-items: center;
			margin-top: 10px;
			border-style: solid;
			border-width: 2px 0 0 0;
			border-color: white;

			& > .title {
				width: 100%;
				font-size: x-large;
				font-weight: bold;
				text-align: center;
			}

			& > .header {
				margin-top: 10px;
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: start;
				align-items: center;

				& > .template-name {
					width: calc(min(50%, 300px));
					font-size: large;
					padding: 2px 5px;
				}

				& > .template-description {
					margin: 10px 0;
					min-width: calc(min(50%, 300px));
					width: calc(min(70%, 500px));
					max-width: calc(min(70%, 500px));
					font-size: large;
					padding: 2px 5px;
					min-height: 5ch;
					max-height: 15ch;
				}

				& > .days {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					margin-bottom: 10px;

					& > span {
						margin-right: 1ch;
					}

					& > .number {
						padding: 2px 5px;
						margin: 0 5px;
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
							font-size: large;
							flex-wrap: wrap;

							& > input {
								font-size: large;
								margin: 0 5px 5px;
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
							font-size: large;
							flex-wrap: wrap;

							& > input {
								font-size: large;
								margin: 0 5px 5px;
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
							font-size: large;
							flex-wrap: wrap;

							& > input {
								font-size: large;
								margin: 0 5px 5px;
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
			justify-content: center;
			margin: 10px 0 20px;

			& > button {
				margin: 0 10px;
			}
		}

		& > .results-container {
			width: 100%;
			height: fit-content;
			margin: 10px 0;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-evenly;
			align-items: center;

			& > .template-card {
				width: calc(min(50%, 400px));
				max-height: calc(min(30vh, 400px));
				height: 100%;
				border: 2px solid white;
				border-radius: 10px;
				display: flex;
				flex-direction: column;
				justify-content: start;
				align-items: center;
				margin-bottom: 20px;
				box-shadow: none;
				transition: all 100ms;
				overflow-y: hidden;
				position: relative;

				& > .card-content {
					width: calc(100% - 10px);
					height: 100%;
					overflow-y: auto;
					margin-bottom: 10px;
					display: flex;
					flex-direction: column;
					justify-content: start;
					align-items: center;

					&::-webkit-scrollbar {
						display: none;
					}

					// Template title
					& > h3 {
						width: 100%;
						text-align: center;
						font-size: x-large;
						margin: 5px 0 10px;
					}

					// Template description
					& > p {
						width: 100%;
						flex: 1;
						margin: 5px 0;
						font-size: large;
					}
				}

				@media (hover: hover) and (pointer: fine) {
					&:hover {
						cursor: pointer;
						box-shadow: 0 0 10px 5px white;
						transition: all 100ms;
					}

					&:active {
						transform: translate(2px, 2px);
					}
				}

				// Blur effect to bottom
				&:after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					height: 30px; /* Adjust the height of the blur effect */
					background: linear-gradient(
						to top,
						rgba(255, 255, 255, 0.3),
						rgba(255, 255, 255, 0)
					);
					pointer-events: none; /* Ensure the blur effect does not interfere with scrolling or clicks */
				}
			}
		}
	}

	// Hide for mobile size
	@media screen and ((max-width: ${MOBILE_MODE_LIMIT}) or (width: ${MOBILE_MODE_LIMIT})) {
		display: none;
	}
`;
