import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import LoaderMobile from '../client/LoaderMobile';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE_LIMIT;

const Programs = (props) => {
	const [awaiting, setAwaiting] = useState(true);
	const [programList, setProgramList] = useState(null);
	const [selectedProgram, setSelectedProgram] = useState(null);

	const user = props.user;

	const axiosPrivate = useAxiosPrivate();

	// Get the array of all programs for the user
	const getProgramList = async () => {
		setAwaiting(true);
		await axiosPrivate
			.get(`/programs/${user.id}`)
			.then((res) => {
				let todayDate = new Date(); // New Date object
				const offset = todayDate.getTimezoneOffset(); // Timezone offset (min)
				todayDate = new Date(todayDate.getTime() - offset * 60 * 1000);
				todayDate = Date.parse(todayDate);

				// Only show released programs
				const programList = res?.data;

				// If at least one program assigned to the user
				if (programList.length > 0) {
					// Ccompare each program release date with today
					programList.forEach((program, index) => {
						const releaseDate = Date.parse(program.release_date);

						// If program is unreleased
						if (releaseDate > todayDate) {
							programList.splice(index, 1); // Remove program from list
						}
					});

					// After all iterations, set program list
					setProgramList(programList);
					setSelectedProgram(programList[0]);

					// If user has no programs assigned
				} else {
					setProgramList(null);
				}
			})
			.catch((err) => {
				console.log(err);
				setProgramList(null);
			})
			.finally(() => {
				setAwaiting(false);
			});
	};

	// On render, get the program list
	useEffect(() => {
		getProgramList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<MobileDiv>
				{awaiting && (
					<div className='loader-container'>
						<LoaderMobile />
					</div>
				)}
				{!awaiting && programList === null && <>No program data to show</>}
				{programList !== null && (
					<div className='program-select'>
						<span>Release Date:</span>
						<select
							name='release-date'
							onChange={(e) => {
								e.preventDefault();
								e.stopPropagation();
								setSelectedProgram(programList[e?.target?.value]);
							}}>
							{programList.map((program, index) => {
								return (
									<option
										name='release-date'
										value={index}
										key={`program-id-${program.program_id}`}>
										{program.release_date.split('T')[0]}
									</option>
								);
							})}
						</select>
					</div>
				)}
				{selectedProgram !== null && (
					<div className='selected-program'>
						{selectedProgram.workout.map((day, dayIndex) => {
							return (
								<div className='workout-day'>
									<span className='title'>{`Day: ${day.day}`}</span>
									{day.mobility.length > 0 && (
										<table>
											<tbody>
												<tr
													className='item-title'
													style={{ backgroundColor: '#3EB489' }}>
													<td colSpan={4}>Mobility</td>
												</tr>
												<tr className='item-header'>
													<td>Name</td>
													<td>Sets</td>
													<td>Reps</td>
													<td>Notes</td>
												</tr>
												{day.mobility.map((item, itemIndex) => {
													return (
														<tr>
															<td>{item.name}</td>
															<td>{item.sets}</td>
															<td>{item.reps}</td>
															<td>{item?.comment || '-'}</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									)}
									{day.strength.length > 0 && (
										<table>
											<tbody>
												<tr
													className='item-title'
													style={{ backgroundColor: '#cc5500' }}>
													<td colSpan={5}>Strength</td>
												</tr>
												<tr className='item-header'>
													<td>Name</td>
													<td>Sets</td>
													<td>Reps</td>
													<td>Load (kg)</td>
													<td>Notes</td>
												</tr>
												{day.strength.map((item, itemIndex) => {
													return (
														<tr>
															<td>{item.name}</td>
															<td>{item.sets}</td>
															<td>{item.reps}</td>
															<td>{item.load}</td>
															<td>{item?.comment || '-'}</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									)}
									{day.conditioning.length > 0 && (
										<table>
											<tbody>
												<tr
													className='item-title'
													style={{ backgroundColor: '#FFDB58' }}>
													<td colSpan={3}>Conditioning</td>
												</tr>
												<tr className='item-header'>
													<td>Name</td>
													<td>Duration</td>
													<td>Notes</td>
												</tr>
												{day.conditioning.map((item, itemIndex) => {
													return (
														<tr>
															<td>{item.name}</td>
															<td>{item.duration}</td>
															<td>{item?.comment || '-'}</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									)}
								</div>
							);
						})}
					</div>
				)}
			</MobileDiv>
		</>
	);
};

export const MobileDiv = styled.div`
	display: none;

	@media screen and (max-width: ${MOBILE_MODE_LIMIT}) {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;

		& > .loader-container {
			width: 100%;
			height: calc(100% - 5vh);
			position: absolute;
			display: flex;
			flex-direction: column;
		}

		& > .program-select {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: start;
			margin-top: 1em;
			margin-left: 1em;
			margin-bottom: 1em;

			& > span {
			}
			& > select {
				margin-left: 1em;
			}
		}

		& > .selected-program {
			width: 100%;
			height: fit-content;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: start;
			border: solid #333;
			border-width: 2px 0 0 0;

			& > .workout-day {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: start;
				align-items: start;
				border: solid #333;
				border-width: 0 0 2px 0;
				padding: 1em 0;
				overflow-y: auto;

				& > .title {
					align-self: flex-start;
					padding-left: 1em;
					font-weight: bold;
				}

				& > table {
					margin-top: 0.5em;
					margin-left: 1em;
					border: 2px solid #333;

					& .item-title {
						border: solid #333;
						border-width: 0 0 2px 0;
						font-weight: bold;
					}

					td {
						border: 1px solid #333;
						border-width: 1px 2px 1px 1px;
						padding: 0.25em 0.5em;
						text-align: center;
					}
				}
			}
		}
	}
`;

export default Programs;
