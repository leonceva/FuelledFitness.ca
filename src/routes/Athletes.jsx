import DesktopLayout from '../layouts/DesktopLayout';
import MobileLayout from '../layouts/MobileLayout';
import styled from 'styled-components';
import AthleteCard from '../components/AthleteCard';
import Application from '../components/Application';

import data from '../frontend-data.json';
import no_img from '../images/athletes/no-img.jpg';
import { useState } from 'react';

const Athletes = () => {
	const athletes = data.athletes;
	return (
		<>
			<DesktopLayout content={<DesktopContent athletes={athletes} />} />
			<MobileLayout content={<MobileContent athletes={athletes} />} />
		</>
	);
};

export const DesktopContent = (props) => {
	const athletes = props.athletes;
	const [showApplication, setShowAppilcation] = useState(false);
	const [showAthlete, setShowAthlete] = useState(null);
	const [athleteImg, setAthleteImg] = useState(null);

	return (
		<>
			<DesktopDiv
				style={showAthlete || showApplication ? { opacity: '0.4' } : { opacity: '1' }}>
				<h3>Athlete Sponsorship Program</h3>
				<p>
					Our athlete sponsorship program at our dietitian and personal trainer website is
					designed to foster mutually beneficial partnerships with dedicated athletes who
					prioritize their health and fitness journey. Through this program, we aim to
					support athletes in achieving their performance goals by providing them with
					personalized nutrition plans, tailored training regimens, and exclusive access
					to our expert dietitians and trainers. In return, sponsored athletes become
					ambassadors for our brand, sharing their success stories, progress updates, and
					promoting our services to their followers. We believe in empowering athletes to
					reach their peak potential, and our sponsorship program is a testament to our
					commitment to fostering a community of individuals dedicated to optimal health
					and performance.
				</p>
				<div className='application'>
					<h4>Think you'd be a good fit?</h4>
					<button
						onClick={() => {
							setShowAppilcation(true);
						}}>
						Apply Now
					</button>
				</div>
				<h3>Support Their Dreams</h3>
				<p>
					Check out the athletes profiles below to read about their journey, and to find
					out how you can support their continued success.
				</p>
				<div className='athletes'>
					{athletes.map((athlete) => {
						return (
							<div
								className='card-container'
								key={athlete.name}
								onClick={() => {
									setShowAthlete(athlete);
									try {
										setAthleteImg(
											require(`../images/athletes/${athlete.last_name}.jpg`)
										);
									} catch (error) {
										setAthleteImg(null);
									}
								}}>
								<AthleteCard athlete={athlete} />
							</div>
						);
					})}
				</div>
			</DesktopDiv>
			{showAthlete && (
				<>
					<BioBackground
						className='bio-bg'
						onClick={() => {
							setShowAthlete(null);
						}}
					/>
					<AthleteBioDesktop className='athlete-bio'>
						<img
							src={athleteImg ? athleteImg : no_img}
							alt=''
						/>
						<div className='bio-container'>
							<h3>
								{showAthlete.name} {showAthlete.last_name}
							</h3>
							<h4>Sport: {showAthlete.sport}</h4>
							<p>{showAthlete.bio}</p>
						</div>
						<button
							className='close-bio'
							onClick={() => {
								setShowAthlete(null);
							}}>
							<i class='bi bi-x-lg'></i>
						</button>
					</AthleteBioDesktop>
				</>
			)}
			{showApplication && (
				<>
					<BioBackground
						className='bio-bg'
						onClick={() => {
							setShowAppilcation(false);
						}}
					/>
					<ApplicationDivDesktop>
						<Application />
						<button
							className='close-bio'
							onClick={() => {
								setShowAppilcation(false);
							}}>
							<i class='bi bi-x-lg'></i>
						</button>
					</ApplicationDivDesktop>
				</>
			)}
		</>
	);
};

export const DesktopDiv = styled.div`
	height: 100%;
	width: 100%;
	padding-right: 2vw;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	z-index: 1;

	& > h3 {
		font-weight: normal;
		align-self: start;
		margin: 1vh 0;
		font-size: 3.5vh;
	}
	& > p {
		text-align: justify;
		align-self: start;
		font-size: 2.5vh;
	}
	& > .application {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		& > h4 {
			text-align: left;
			margin-right: 2vw;
			font-size: calc(min(2.5vw, 2.5vh));
		}

		& > button {
			border: solid 2px #333;
			color: #333;
			border-radius: 3vw;
			font-size: calc(min(2.5vw, 2.5vh));
			padding: 1vh 2vw;
			box-shadow: 2px 2px 2px #333;
			background-color: #d0dceb;
			margin-left: 2vw;

			&:hover {
				background-color: #87ceeb;
				cursor: pointer;
			}
			&:active {
				translate: 3px 3px;
				box-shadow: 0 0 0;
			}
		}
	}
	& > .athletes {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-evenly;
		flex-wrap: wrap;
		margin-bottom: 2vh;

		& > .card-container {
			width: 30%;
			height: 45vh;
			margin: 1vh 1vw;
		}
	}
`;

export const AthleteBioDesktop = styled.div`
	position: absolute;
	width: 60%;
	height: 60%;
	top: 20%;
	left: 20%;
	z-index: 3;
	background-color: #d0dceb;
	border: solid #333 calc(min(0.5vw, 0.5vh));
	border-radius: 1vw;
	display: flex;
	flex-direction: row;
	align-items: center;

	& > img {
		max-height: 95%;
		max-width: 35%;
		margin-left: 1%;
		border-radius: 1vw;
	}

	& > .bio-container {
		display: flex;
		flex-direction: column;
		justify-content: start;
		height: calc(100% - 2vh);
		flex: 1;
		margin: 1vh 0 1vh 1vw;
		overflow-y: auto;

		& > h3 {
			font-size: 2.5vh;
		}

		& > p {
			text-align: justify;
			padding-right: 1vw;
			font-size: 2vh;
		}
	}

	& > .close-bio {
		position: absolute;
		width: calc(min(5vw, 5vh));
		height: calc(min(5vw, 5vh));
		background-color: red;
		border: solid #333 calc(min(0.5vw, 0.5vh));
		border-radius: calc(min(1vw, 1vh));
		right: calc(max(-2.5vw, -2.5vh));
		top: calc(max(-2.5vw, -2.5vh));
		font-weight: bolder;
		font-size: calc(min(2.5vw, 2.5vh));
	}
`;

export const AthleteBioMobile = styled.div`
	position: fixed;
	top: 30%;
	width: 90%;
	max-height: 80%;
	top: 20%;
	left: 5%;
	z-index: 3;
	background-color: #d0dceb;
	border: solid #333 calc(min(0.5vw, 0.5vh));
	border-radius: 1vw;
	display: flex;
	flex-direction: column;

	& > h3 {
		width: 100%;
	}

	& > h4 {
		width: 100%;
		border-bottom: solid #333 calc(min(0.5vw, 0.5vh));
		padding-bottom: 0.5vh;
	}

	& > .bio-container {
		width: 100%;
		height: 100%;
		overflow-y: auto;

		& > p {
			text-align: justify;
			padding: 0 1.5vw;
			width: 100%;
		}
	}

	& > .close-bio {
		position: absolute;
		width: calc(min(7vw, 7vh));
		height: calc(min(7vw, 7vh));
		background-color: red;
		border: solid #333 calc(min(0.5vw, 0.5vh));
		border-radius: calc(min(1vw, 1vh));
		right: calc(max(-2.5vw, -2.5vh));
		top: calc(max(-2.5vw, -2.5vh));
		font-weight: bolder;
		font-size: calc(min(3.5vw, 3.5vh));
	}
`;

export const BioBackground = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 2;
	background-color: transparent;
`;

export const ApplicationDivDesktop = styled.div`
	z-index: 3;
	position: fixed;
	width: 60%;
	max-height: 70%;
	min-height: max-content;
	overflow-y: auto;
	top: 20%;
	left: 20%;
	background-color: #d0dceb;
	border: solid #333 calc(min(0.5vw, 0.5vh));
	border-radius: 1vw;

	& > form {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		padding-top: 1vh;
		padding-bottom: 1vh;

		& > h3 {
			margin-bottom: 0.5vh;
			font-size: calc(min(3vw, 3vh));
		}

		& > .input-text {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			margin-bottom: 0.5vh;

			& label {
				width: 20%;
				text-align: end;
				padding-left: 2vw;
				font-size: calc(min(2vw, 2vh));
			}

			& input {
				width: 75%;
				margin-left: 2%;
				margin-right: 3%;
				font-size: calc(min(2vw, 2vh));
			}
		}

		& > .about {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			max-height: 10%;

			& label {
				width: 20%;
				text-align: end;
				padding-left: 2vw;
				font-size: calc(min(2vw, 2vh));
			}

			& textarea {
				width: 75%;
				margin-left: 2%;
				margin-right: 3%;
				resize: none;
				font-size: calc(min(2vw, 2vh));
			}
		}

		& > .error-msg {
			width: 100%;
			margin-top: -0.5vh;
			margin-bottom: 1vh;
		}

		> .submit-btn {
			width: max-content;
			background-color: #d0dceb;
			border: 2px solid #333;
			border-radius: 10px;
			padding: 1vh 2vw;
			color: #333;
			box-shadow: 3px 3px 2px #333;
			margin-bottom: 1.5vh;
			font-size: calc(min(2vw, 2vh));

			&::after {
				content: 'Submit Application';
			}

			&:hover {
				background-color: #87ceeb;
				cursor: pointer;
			}
			&:active {
				translate: 3px 3px;
				box-shadow: 0 0 0;
			}
		}

		> .submitted::after {
			content: 'Message Sent!';
		}
	}

	& > .close-bio {
		position: fixed;
		width: calc(min(5vw, 5vh));
		height: calc(min(5vw, 5vh));
		background-color: red;
		border: solid #333 calc(min(0.5vw, 0.5vh));
		border-radius: calc(min(1vw, 1vh));
		right: calc(max(-2.5vw, -2.5vh));
		top: calc(20% - min(2.5vw, 2.5vh));
		right: calc(20% - min(2.5vw, 2.5vh));
		font-weight: bolder;
		font-size: calc(min(2.5vw, 2.5vh));
	}
`;

export const ApplicationDivMobile = styled.div`
	z-index: 3;
	position: fixed;
	width: 90%;
	max-height: 80%;
	min-height: max-content;
	overflow-y: auto;
	top: 15%;
	left: 5%;
	background-color: #d0dceb;
	border: solid #333 calc(min(0.5vw, 0.5vh));
	border-radius: 1vw;

	& > form {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		padding-top: 1vh;
		padding-bottom: 1vh;

		& > h3 {
			margin-bottom: 0.5vh;
		}

		& > .input-text {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			margin-bottom: 0.5vh;

			& label {
				width: 20%;
				text-align: end;
				padding-left: 2vw;
			}

			& input {
				width: 75%;
				margin-left: 2%;
				margin-right: 3%;
			}
		}

		& > .about {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			max-height: 10%;

			& label {
				width: 20%;
				text-align: end;
				padding-left: 2vw;
			}

			& textarea {
				width: 75%;
				margin-left: 2%;
				margin-right: 3%;
				resize: none;
			}
		}

		& > .error-msg {
			width: 100%;
			margin-top: -0.5vh;
			margin-bottom: 1vh;
		}

		> .submit-btn {
			width: max-content;
			background-color: #d0dceb;
			border: 2px solid #333;
			border-radius: 10px;
			padding: 1vh 2vw;
			color: #333;
			box-shadow: 3px 3px 2px #333;
			margin-bottom: 1.5vh;

			&::after {
				content: 'Submit Application';
			}

			&:hover {
				background-color: #87ceeb;
				cursor: pointer;
			}
			&:active {
				translate: 3px 3px;
				box-shadow: 0 0 0;
			}
		}

		> .submitted::after {
			content: 'Message Sent!';
		}
	}

	& > .close-bio {
		position: fixed;
		width: calc(min(7vw, 7vh));
		height: calc(min(7vw, 7vh));
		background-color: red;
		border: solid #333 calc(min(0.5vw, 0.5vh));
		border-radius: calc(min(1vw, 1vh));
		right: calc(max(-2.5vw, -2.5vh));
		top: calc(15% - min(3.5vw, 3.5vh));
		right: calc(5% - min(3.5vw, 3.5vh));
		font-weight: bolder;
		font-size: calc(min(3.5vw, 3.5vh));
	}
`;

export const MobileContent = (props) => {
	const athletes = props.athletes;
	const [showApplication, setShowAppilcation] = useState(false);
	const [showAthlete, setShowAthlete] = useState(null);

	return (
		<>
			<MobileDiv
				style={showAthlete || showApplication ? { opacity: '0.4' } : { opacity: '1' }}>
				<h3>Athlete Sponsorship Program</h3>
				<p>
					Our athlete sponsorship program at our dietitian and personal trainer website is
					designed to foster mutually beneficial partnerships with dedicated athletes who
					prioritize their health and fitness journey. Through this program, we aim to
					support athletes in achieving their performance goals by providing them with
					personalized nutrition plans, tailored training regimens, and exclusive access
					to our expert dietitians and trainers. In return, sponsored athletes become
					ambassadors for our brand, sharing their success stories, progress updates, and
					promoting our services to their followers. We believe in empowering athletes to
					reach their peak potential, and our sponsorship program is a testament to our
					commitment to fostering a community of individuals dedicated to optimal health
					and performance.
				</p>
				<div className='application'>
					<h4>Think you'd be a good fit?</h4>
					<button
						onClick={() => {
							setShowAppilcation(true);
						}}>
						Apply Now
					</button>
				</div>
				<h3>Support Their Dreams</h3>
				<p>
					Check out the athletes profiles below to read about their journey, and to find
					out how you can support their continued success.
				</p>
				<div className='athletes'>
					{athletes.map((athlete) => {
						return (
							<div
								className='card-container'
								key={athlete.name}
								onClick={() => {
									setShowAthlete(athlete);
								}}>
								<AthleteCard athlete={athlete} />
							</div>
						);
					})}
				</div>
			</MobileDiv>
			{showAthlete && (
				<>
					<BioBackground
						className='bio-bg'
						onClick={() => {
							setShowAthlete(null);
						}}
					/>
					<AthleteBioMobile>
						<h3>
							{showAthlete.name} {showAthlete.last_name}
						</h3>
						<h4>Sport: {showAthlete.sport}</h4>
						<div className='bio-container'>
							<p>{showAthlete.bio}</p>
						</div>

						<button
							className='close-bio'
							onClick={() => {
								setShowAthlete(null);
							}}>
							<i class='bi bi-x-lg'></i>
						</button>
					</AthleteBioMobile>
				</>
			)}
			{showApplication && (
				<>
					<BioBackground
						className='bio-bg'
						onClick={() => {
							setShowAppilcation(false);
						}}
					/>
					<ApplicationDivMobile>
						<Application />
						<button
							className='close-bio'
							onClick={() => {
								setShowAppilcation(false);
							}}>
							<i class='bi bi-x-lg'></i>
						</button>
					</ApplicationDivMobile>
				</>
			)}
		</>
	);
};

export const MobileDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 2vh;

	& > p {
		text-align: justify;
		margin: 1vh 2vw;
	}

	& > .application {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-evenly;
		margin-bottom: 2vh;

		& > button {
			border: solid 2px #333;
			color: #333;
			border-radius: 3vw;
			padding: 0.5vh 1vw;
			box-shadow: 2px 2px 2px #333;
			background-color: #d0dceb;
			margin-left: 2vw;
			width: fit-content;
			height: fit-content;
		}
	}

	& > .athletes {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
		align-items: center;
		width: 100%;

		& > .card-container {
			height: 40vh;
			width: 45%;
			margin-bottom: 2vh;
		}
	}
`;

export default Athletes;
