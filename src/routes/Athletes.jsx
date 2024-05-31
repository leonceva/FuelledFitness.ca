import styled from 'styled-components';
import DesktopLayout from '../layouts/DesktopLayout';
import data from '../frontend-data.json';
import AthleteCard from '../components/AthleteCard';
import Application from '../components/AthleteApplicationForm';
import Image from '../components/Image';
import SocialMediaLink from '../components/SocialMediaLink';

// Athlete Pictures
import moon_keca_low_res from '../images/athletes/Moon-Keca-placeholder.jpg';
import moon_keca_high_res from '../images/athletes/Moon-Keca.jpg';
import { useState } from 'react';

const Athletes = () => {
	return (
		<>
			<DesktopLayout content={<DesktopContent />} />
		</>
	);
};

export default Athletes;

/************************************************************* DESKTOP MODE ****************************************************************************/

export const DesktopContent = () => {
	const athletes = data.athletes;

	// Image styles for athlete cards
	const styleWrapperCard = {
		position: 'absolute',
		width: '100%',
		height: '100%',
		overflowX: 'hidden',
		overflowY: 'hidden',
		zIndex: '2',
	};

	const styleImageCard = {
		position: 'absolute',
		width: 'auto',
		heigh: 'auto',
		maxHeight: '125%',
		maxWidth: '125%',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		zIndex: '2',
		animation: 'fadein 1s',
	};

	// Image styles for bio when card is clicked
	const styleWrapperBio = {
		width: '30%',
		height: '100%',
		overflowx: 'hidden',
		overflowY: 'hidden',
		position: 'absolute',
		left: '2.5%',
	};

	const styleImageBio = {
		position: 'absolute',
		width: 'auto',
		heigh: 'auto',
		maxWidth: '100%',
		maxHeight: '125%',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%,-50%)',
	};

	const [showApplication, setShowApplication] = useState(false);
	const [showAthlete, setShowAthlete] = useState(null);

	return (
		<DesktopDiv>
			<h2>Athlete Sponsorship Program</h2>
			<p>
				Recognizing the financial challenges that often accompany high level training, our
				sponsorship program aims to ease the financial burden for selected athletes.
				Sponsored athletes will benefit from personalized nutrition plans and customized
				workout programs designed to optimize performance and recovery. By offering these
				services at a reduced cost, the sponsorship enables elite athletes to focus more on
				their sport, enhancing their chances of success without the added stress of
				expensive coaching fees. Registered Dietitian services will only be offered in
				Ontario at this time.
			</p>
			<div className='apply-container'>
				<span>Think you'd be a good fit?</span>
				<button
					className='btn'
					onClick={() => setShowApplication(true)}>
					Apply Now
				</button>
			</div>
			<h2>Support Their Dreams</h2>
			<p>
				Check out the athletes profiles below to read about their journey, and to find out
				how you can support their continued success.
			</p>
			<div className='athlete-container'>
				<div
					className='card-container'
					onClick={() => {
						setShowAthlete([
							athletes['Moon-Keca'],
							moon_keca_low_res,
							moon_keca_high_res,
						]);
					}}>
					<AthleteCard
						athlete={athletes['Moon-Keca']}
						styleWrapper={styleWrapperCard}
						styleImage={styleImageCard}
						lowResSrc={moon_keca_low_res}
						highResSrc={moon_keca_high_res}
					/>
				</div>
			</div>
			{showApplication && (
				<div className='application-container'>
					<div
						className='close-bg'
						onClick={() => setShowApplication(false)}
					/>
					<div className='application'>
						<Application />
					</div>
					<div
						className='close'
						onClick={() => setShowApplication(false)}>
						<i className='bi bi-x-lg' />
					</div>
				</div>
			)}
			{showAthlete && (
				<div className='athlete-bio-container'>
					<div
						className='close-bg'
						onClick={() => setShowAthlete(null)}
					/>
					<div className='athlete-bio'>
						<Image
							styleWrapper={styleWrapperBio}
							styleImage={styleImageBio}
							lowResSrc={showAthlete[1]}
							highResSrc={showAthlete[2]}
						/>
						<div className='bio'>
							<h3>
								{showAthlete[0].name} {showAthlete[0].last_name}
							</h3>
							<h4>Sport: {showAthlete[0].sport}</h4>
							<p>{showAthlete[0].bio}</p>
							<div className='links-container'>
								{showAthlete[0]?.instagram !== null && (
									<SocialMediaLink
										type='instagram'
										link={`${showAthlete[0].instagram}`}
										size='50px'
										hover='#333'
									/>
								)}
							</div>
						</div>
					</div>
					<div
						className='close'
						onClick={() => setShowAthlete(null)}>
						<i className='bi bi-x-lg' />
					</div>
				</div>
			)}
		</DesktopDiv>
	);
};

export const DesktopDiv = styled.div`
	// Larger screen size
	@media screen and (min-width: 1201px) {
		width: 100%;
		min-height: calc(100vh - 120px);
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		position: relative;

		& > h2 {
			width: 100%;
			text-align: center;
			font-size: x-large;
			font-weight: bold;
			padding: 0;
			margin: 2ch 0 1ch;
		}

		& > p {
			width: 100%;
			font-size: large;
		}

		& > .apply-container {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 1ch 0;

			& > span {
				margin: 0 2ch;
				font-size: large;
			}

			& > .btn {
				margin: 0 2ch;
			}
		}

		& > .athlete-container {
			width: 100%;
			height: max-content;
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;
			height: calc(min(500px, 50vh));
			flex-wrap: wrap;
			margin-bottom: 30px;
			margin-top: 10px;

			& > .card-container {
				height: 100%;
				width: 30%;
				border: 2px solid #333;
				position: relative;
				overflow: hidden;
				display: flex;
				background-color: #333;
				border-radius: 10px;
				@media (hover: hover) and (pointer: fine) {
					&:hover {
						cursor: pointer;
						box-shadow: 3px 3px 3px 0 #333;
						transition: box-shadow 250ms;
					}
				}

				&:active {
					transition: all 0s;
					box-shadow: 0 0 0;
					transform: translate(3px, 3px);
				}

				& > .athlete-card {
					height: 100%;
					width: 100%;
					position: relative;
					overflow: hidden;
					display: flex;
					background-color: #333;
					border-radius: 10px;

					& > h2 {
						position: absolute;
						z-index: 3;
						width: 100%;
						background-color: white;
						top: 0%;
						margin: 0;
						padding: 0.5ch;
						text-align: center;
						border-color: #333;
						border-style: solid;
						border-width: 0 0 2px;
					}
				}
			}
		}

		& > .application-container {
			position: fixed;
			height: calc(100% - 100px);
			top: 100px;
			width: 100%;
			left: 0%;
			z-index: 3;
			display: flex;
			background-color: rgba(31, 31, 31, 0.8);

			& > .application {
				position: fixed;
				z-index: 5;
				width: 60%;
				max-width: 2000px;
				height: fit-content;
				max-height: 70vh;
				overflow-y: auto;
				top: 20%;
				left: 20%;
				background-color: #6e88a1;
				border: solid #333 3px;
				border-radius: 10px;

				& > form {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					height: 100%;
					margin-bottom: 10px;

					& > h3 {
						width: 100%;
						text-align: center;
						font-size: x-large;
					}

					& > .input-text {
						width: 100%;
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;
						margin-bottom: 1ch;

						& > label {
							width: 20%;
							text-align: end;
							padding-left: 2ch;
							font-size: large;
						}

						& > input {
							width: 75%;
							margin-left: 2ch;
							margin-right: 2ch;
							font-size: large;
						}
					}

					& > .about {
						width: 100%;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						max-height: 5ch;
						margin-top: 1ch;

						& > label {
							width: 20%;
							text-align: end;
							padding-left: 2ch;
							font-size: large;
						}

						& > textarea {
							width: 75%;
							margin-left: 2ch;
							margin-right: 2ch;
							font-size: large;
						}
					}

					& > .error-msg {
						width: 100%;
						margin-top: 2ch;
						margin-bottom: 1ch;
						text-align: center;
					}

					& > .btn {
						margin-bottom: 2ch;

						&::after {
							content: 'Submit Application';
						}
					}

					& > .submitted::after {
						content: 'Message Sent!';
					}
				}

				& > .close {
					position: fixed;
					width: 40px;
					height: 40px;
					background-color: red;
					border: solid #333 3px;
					border-radius: 5px;
					top: calc(20% - 10px);
					left: calc(80% - 30px);
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 25px;
					@media (hover: hover) and (pointer: fine) {
						&:hover {
							cursor: pointer;
							background-color: darkred;
						}
					}
				}
			}
		}

		& > .athlete-bio-container {
			position: fixed;
			height: calc(100% - 100px);
			top: 100px;
			width: 100%;
			left: 0%;
			z-index: 3;
			display: flex;
			background-color: rgba(31, 31, 31, 0.8);

			& > .athlete-bio {
				position: relative;
				width: 70%;
				max-width: 2000px;
				height: 70vh;
				max-height: 2000px;
				overflow-y: auto;
				top: 10%;
				left: 15%;
				background-color: #d0cdeb;
				border: solid #333 3px;
				border-radius: 10px;
				z-index: 4;
				display: flex;
				flex-direction: row;
				justify-content: start;
				align-items: center;

				& > .bio {
					position: absolute;
					display: flex;
					flex-direction: column;
					justify-content: start;
					align-items: center;
					width: 62.5%;
					height: 100%;
					left: 35%;

					& > h3 {
						width: 100%;
						text-align: center;
						margin: 5px 0;
						padding: 0;
						font-size: xx-large;
					}

					& > h4 {
						width: 100%;
						text-align: center;
						margin: 5px 0;
						padding: 0;
						font-size: x-large;
					}

					& > p {
						width: 100%;
						margin: 2ch 0;
						padding: 0;
						font-size: large;
						text-align: justify;
					}

					& > .links-container {
						width: 100%;
						display: flex;
						flex-direction: row;
						height: 50px;
						flex-wrap: wrap;
						align-items: center;
						justify-content: space-evenly;
					}
				}
			}

			& > .close {
				position: absolute;
				width: 40px;
				height: 40px;
				background-color: red;
				border: solid #333 3px;
				border-radius: 5px;
				top: calc(10% - 10px);
				left: calc(85% - 30px);
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 20px;
				z-index: 5;

				@media (hover: hover) and (pointer: fine) {
					&:hover {
						cursor: pointer;
						background-color: darkred;
					}
				}
			}
		}
	}

	// Smaller screen size
	@media screen and ((max-width: 1200px )or (width: 1200px)) {
		width: 100%;
		min-height: calc(100vh - 120px);
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		position: relative;

		& > h2 {
			width: 100%;
			text-align: center;
			font-size: x-large;
			font-weight: bold;
			padding: 0;
			margin: 2ch 0 1ch;
		}

		& > p {
			width: 100%;
			font-size: large;
			text-align: justify;
		}

		& > .apply-container {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 1ch 0;

			& > span {
				margin: 0 2ch;
				font-size: medium;
			}

			& > .btn {
				margin: 0 2ch;
			}
		}

		& > .athlete-container {
			width: 100%;
			height: max-content;
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;
			height: calc(min(400px, 50vh));
			flex-wrap: wrap;
			margin-bottom: 30px;
			margin-top: 10px;

			& > .card-container {
				height: 100%;
				width: 40%;
				border: 2px solid #333;
				position: relative;
				overflow: hidden;
				display: flex;
				background-color: #333;
				border-radius: 10px;

				@media (hover: hover) and (pointer: fine) {
					&:hover {
						cursor: pointer;
						box-shadow: 3px 3px 3px 0 #333;
						transition: box-shadow 250ms;
					}
				}

				&:active {
					transition: all 0s;
					box-shadow: 0 0 0;
					transform: translate(3px, 3px);
				}

				& > .athlete-card {
					height: 100%;
					width: 100%;
					position: relative;
					overflow: hidden;
					display: flex;
					background-color: #333;
					border-radius: 10px;

					& > h2 {
						position: absolute;
						z-index: 3;
						width: 100%;
						background-color: white;
						top: 0%;
						margin: 0;
						padding: 0.5ch;
						text-align: center;
						border-color: #333;
						border-style: solid;
						border-width: 0 0 2px;
					}
				}
			}
		}

		& > .application-container {
			position: fixed;
			height: calc(100% - 100px);
			top: 100px;
			width: 100%;
			left: 0%;
			z-index: 3;
			display: flex;
			background-color: rgba(31, 31, 31, 0.8);

			& > .application {
				position: relative;
				z-index: 4;
				width: 80%;
				height: fit-content;
				max-height: 70vh;
				overflow-y: auto;
				top: 20px;
				left: 10%;
				background-color: #6e88a1;
				border: solid #333 3px;
				border-radius: 10px;

				& > form {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					height: 100%;
					margin-bottom: 10px;

					& > h3 {
						width: 100%;
						text-align: center;
						font-size: x-large;
					}

					& > .input-text {
						width: 100%;
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;
						margin-bottom: 1ch;

						& > label {
							width: 20%;
							text-align: end;
							padding-left: 2ch;
							font-size: large;
						}

						& > input {
							width: 60%;
							margin-left: 2ch;
							margin-right: 2ch;
							font-size: large;
						}
					}

					& > .about {
						width: 100%;
						height: max-content;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						max-height: 5ch;
						margin-top: 1ch;

						& > label {
							width: 20%;
							text-align: end;
							padding-left: 2ch;
							font-size: large;
						}

						& > textarea {
							width: 60%;
							margin-left: 2ch;
							margin-right: 2ch;
						}
					}

					& > .error-msg {
						width: 100%;
						margin-top: 2ch;
						margin-bottom: 1ch;
						text-align: center;
					}

					& > .btn {
						margin-bottom: 2ch;

						&::after {
							content: 'Submit Application';
						}
					}

					& > .submitted::after {
						content: 'Message Sent!';
					}
				}
			}

			& > .close {
				position: absolute;
				width: 40px;
				height: 40px;
				background-color: red;
				border: solid #333 3px;
				border-radius: 5px;
				top: 10px;
				left: calc(90% - 10px);
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 25px;
				z-index: 5;

				@media (hover: hover) and (pointer: fine) {
					&:hover {
						cursor: pointer;
						background-color: darkred;
					}
				}
			}
		}

		& > .athlete-bio-container {
			position: fixed;
			height: calc(100% - 100px);
			top: 100px;
			width: 100%;
			left: 0%;
			z-index: 3;
			display: flex;
			background-color: rgba(31, 31, 31, 0.8);

			& > .athlete-bio {
				position: relative;
				width: 80%;
				height: 70vh;
				overflow-y: auto;
				top: 20px;
				left: 10%;
				background-color: #d0cdeb;
				border: solid #333 3px;
				border-radius: 10px;
				z-index: 4;
				display: flex;
				flex-direction: row;
				justify-content: start;
				align-items: center;

				& > .bio {
					position: absolute;
					display: flex;
					flex-direction: column;
					justify-content: start;
					align-items: center;
					width: 62.5%;
					height: 100%;
					left: 35%;

					& > h3 {
						width: 100%;
						text-align: center;
						margin: 5px 0;
						padding: 0;
						font-size: xx-large;
					}

					& > h4 {
						width: 100%;
						text-align: center;
						margin: 5px 0;
						padding: 0;
						font-size: x-large;
					}

					& > p {
						width: 100%;
						margin: 2ch 0;
						padding: 0;
						font-size: large;
						text-align: justify;
					}

					& > .links-container {
						width: 100%;
						display: flex;
						flex-direction: row;
						height: 50px;
						flex-wrap: wrap;
						align-items: center;
						justify-content: space-evenly;
						padding-bottom: 10px;
					}
				}
			}

			& > .close {
				position: absolute;
				width: 40px;
				height: 40px;
				background-color: red;
				border: solid #333 3px;
				border-radius: 5px;
				top: 10px;
				left: calc(90% - 10px);
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 25px;
				z-index: 5;

				@media (hover: hover) and (pointer: fine) {
					&:hover {
						cursor: pointer;
						background-color: darkred;
					}
				}
			}
		}
	}
`;
