import styled from 'styled-components';
import DesktopLayout from '../layouts/DesktopLayout';
import Image from '../components/Image';
import { useEffect, useState } from 'react';

import nutrition_low_res from '../images/nutrition-01-placeholder.jpg';
import nutrition_high_res from '../images/nutrition-01.jpg';
import training_low_res from '../images/krystin-gym-05-placeholder.jpg';
import training_high_res from '../images/krystin-gym-05.jpg';
import nutrigenomics_low_res from '../images/genetics-placeholder.jpg';
import nutrigenomics_high_res from '../images/genetics.jpg';

const Services = () => {
	return (
		<>
			<DesktopLayout content={<DesktopContent />} />
		</>
	);
};

export default Services;

/************************************************************* DESKTOP MODE ****************************************************************************/

export const DesktopContent = () => {
	// Styles for large screen
	const styleWrapper = {
		position: 'absolute',
		width: '100%',
		height: '100%',
		overflowX: 'hidden',
		overflowY: 'hidden',
	};

	const styleImageLarge = {
		position: 'absolute',
		width: 'auto',
		height: 'auto',
		maxHeight: '100%',
		minWidth: '100%',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		zIndex: '1',
		animation: 'fadein 1s',
	};
	// Styles for small screens
	const styleImageSmall = {
		position: 'absolute',
		width: '40%',
		height: 'auto',
		right: '0%',
		borderStyle: 'solid',
		borderColor: '#f2f2f2',
		borderWidth: '0 0 0 2px',
	};

	const [hoverItem, setHoverItem] = useState(null);
	const [serviceSelected, setServiceSelected] = useState(null);
	const [infoSelected, setInfoSelected] = useState(null);

	const [screenSize, setScreenSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		// Callback for when screen is resized
		const handleResize = () => {
			setScreenSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		// Screen resize listener
		window.addEventListener('resize', handleResize);

		// Clean-up listener
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<DesktopDiv>
			<div
				className='service-item'
				onMouseEnter={() => setHoverItem('nutrition')}
				onMouseLeave={() => setHoverItem(null)}
				onClick={() => {
					setServiceSelected('Nutrition');
					setInfoSelected('individuals');
				}}>
				<Image
					styleWrapper={{
						...styleWrapper,
						...{ opacity: `${hoverItem === 'nutrition' ? '0.7' : '0.2'}` },
					}}
					styleImage={
						screenSize.width > 1200 ? { ...styleImageLarge } : { ...styleImageSmall }
					}
					lowResSrc={nutrition_low_res}
					highResSrc={nutrition_high_res}
				/>
				<div
					className={`title ${
						hoverItem === 'nutrition' ? 'title-hover' : 'title-no-hover'
					}`}>
					Nutrition
				</div>
				<div
					className={`info ${
						hoverItem === 'nutrition' ? 'info-hover' : 'info-no-hover'
					}`}>
					If you're looking for help with managing your weight, dealing with a specific
					health issue, or just want to feel your best, our skilled team creates custom
					plans to support you on your path to better health.
				</div>
			</div>
			<div
				className='service-item'
				onMouseEnter={() => setHoverItem('training')}
				onMouseLeave={() => setHoverItem(null)}
				onClick={() => {
					setServiceSelected('Strength Training');
					setInfoSelected('online-coaching');
				}}>
				<Image
					styleWrapper={{
						...styleWrapper,
						...{ opacity: `${hoverItem === 'training' ? '0.4' : '0.2'}` },
					}}
					styleImage={
						screenSize.width > 1200 ? { ...styleImageLarge } : { ...styleImageSmall }
					}
					lowResSrc={training_low_res}
					highResSrc={training_high_res}
				/>
				<div
					className={`title ${
						hoverItem === 'training' ? 'title-hover' : 'title-no-hover'
					}`}>
					Training
				</div>
				<div
					className={`info ${hoverItem === 'training' ? 'info-hover' : 'info-no-hover'}`}>
					From beginners looking to get in shape to elite athletes aiming to enhance their
					performance, we're here to support you every step of the way on your fitness
					journey with tailored programs.
				</div>
			</div>
			<div
				className='service-item'
				onMouseEnter={() => setHoverItem('nutrigenomics')}
				onMouseLeave={() => setHoverItem(null)}
				onClick={() => setServiceSelected('Nutrigenomics')}>
				<Image
					styleWrapper={{
						...styleWrapper,
						...{ opacity: `${hoverItem === 'nutrigenomics' ? '0.4' : '0.2'}` },
					}}
					styleImage={
						screenSize.width > 1200 ? { ...styleImageLarge } : { ...styleImageSmall }
					}
					lowResSrc={nutrigenomics_low_res}
					highResSrc={nutrigenomics_high_res}
				/>
				<div
					className={`title ${
						hoverItem === 'nutrigenomics' ? 'title-hover' : 'title-no-hover'
					}`}>
					Nutrigenomics
				</div>
				<div
					className={`info ${
						hoverItem === 'nutrigenomics' ? 'info-hover' : 'info-no-hover'
					}`}>
					Whether you're curious about how your genes impact your diet or seeking targeted
					nutrition advice to optimize your health, our expert team utilizes cutting-edge
					genetic testing powered by Nutrigenomix for nutrition guidance tailored to your
					DNA.
				</div>
			</div>
			<div className={`service-info ${serviceSelected === null ? 'hidden' : ''}`}>
				<div
					className='go-back'
					onClick={() => {
						setServiceSelected(null);
						setInfoSelected(null);
					}}>
					<i className='bi bi-arrow-left-square' />
				</div>
				<div className='menu'>
					{/*Menu Items on the Left*/}
					{serviceSelected === 'Nutrition' && (
						<>
							<h2>{serviceSelected}</h2>
							<div
								className={`menu-item ${
									infoSelected === 'individuals' ? 'menu-item-selected' : ''
								}`}
								onClick={() => setInfoSelected('individuals')}>
								Individuals
							</div>
							<div
								className={`menu-item ${
									infoSelected === 'team-programs' ? 'menu-item-selected' : ''
								}`}
								onClick={() => setInfoSelected('team-programs')}>
								Team Programs
							</div>
							<div
								className={`menu-item ${
									infoSelected === 'corporate' ? 'menu-item-selected' : ''
								}`}
								onClick={() => setInfoSelected('corporate')}>
								Corporate
							</div>
							<div
								className={`menu-item ${
									infoSelected === 'menu-review' ? 'menu-item-selected' : ''
								}`}
								onClick={() => setInfoSelected('menu-review')}>
								Menu Review
							</div>
							<div className='btn-container'>
								<div
									className='btn'
									onClick={() => {
										window.open(
											'https://my.practicebetter.io/#/649ca3c56d0b43d466e3b1f8/bookings?step=services',
											'_blank'
										);
									}}>
									Book Appointment
								</div>
							</div>
						</>
					)}
					{serviceSelected === 'Strength Training' && (
						<>
							<h2>{serviceSelected}</h2>
							<div
								className={`menu-item ${
									infoSelected === 'online-coaching' ? 'menu-item-selected' : ''
								}`}
								onClick={() => setInfoSelected('online-coaching')}>
								Online Coaching
							</div>
							<div
								className={`menu-item ${
									infoSelected === 'personal-training' ? 'menu-item-selected' : ''
								}`}
								onClick={() => setInfoSelected('personal-training')}>
								Personal Training
							</div>
							<div
								className={`menu-item ${
									infoSelected === 'team-training' ? 'menu-item-selected' : ''
								}`}
								onClick={() => setInfoSelected('team-training')}>
								Team Strength & Conditioning
							</div>
							<div className='btn-container'>
								<div
									className='btn'
									onClick={() => {
										window.open(
											'https://my.practicebetter.io/#/649ca3c56d0b43d466e3b1f8/bookings?step=services',
											'_blank'
										);
									}}>
									Book Appointment
								</div>
							</div>
						</>
					)}
				</div>
				<div className='info'>
					{/*Information of each service*/}
					{serviceSelected === 'Nutrition' && infoSelected === 'individuals' && (
						<>
							<h2>Nutrition Counselling</h2>
							<p>
								Say goodbye to guesswork, and hello to a personalized nutrition
								plan! Work 1:1 with a Registered Dietitian to achieve your goals.
								Whether you're striving for peak performance, weight loss, improved
								energy levels, or optimal health and wellbeing for yourself and your
								family, we offer personalized strategies to support you in achieving
								your goals.
							</p>
							<p>
								Initial Consult (60 minutes) - $140
								<br />
								Follow-up (45 minutes) - $105
							</p>
							<h2>Meal Plan Add-On</h2>
							<p>
								A meal plan is not the answer for everyone. Your Registered
								Dietitian will work with you to address the challenges you face to
								optimally achieve your nutrition goals.
							</p>
							<p>Cost - $80</p>
						</>
					)}
					{serviceSelected === 'Nutrition' && infoSelected === 'team-programs' && (
						<>
							<h2>Team Nutrition Programs</h2>
							<p>
								Complement the hard work your athletes are putting in during
								training with nutrition support. Some services offered include
								nutrition presentations, interactive activities, or 1:1 counselling
								sessions.
							</p>
							<p>
								Contact us today to design a program that fits the needs of your
								team.
							</p>
						</>
					)}
					{serviceSelected === 'Nutrition' && infoSelected === 'corporate' && (
						<>
							<h2>Employee Nutrition Program</h2>
							<p>
								Support the wellbeing of your employees through nutrition support.
								Healthier and happier employees promote improved productivity,
								longevity, and a better workplace culture. Some services offered
								include nutrition presentations, interactive activities, or 1:1
								counselling sessions.
							</p>
							<p>
								Contact us today to discuss the unique needs of your organization.
							</p>
						</>
					)}
					{serviceSelected === 'Nutrition' && infoSelected === 'menu-review' && (
						<>
							<h2>Menu Review</h2>
							<p>
								Do you provide meals as part of your business? Provide assurance of
								nutritional balance, and credibility to clients by having your menu
								reviewed and critiqued by a Registered Dietitian.
							</p>
							<p>
								Contact us today to discuss the unique needs of your organization.
							</p>
						</>
					)}
					{serviceSelected === 'Strength Training' &&
						infoSelected === 'online-coaching' && (
							<>
								<h2>Online Coaching</h2>
								<p>
									Discover the ultimate online coaching experience with a
									personalized program and consistent support. Our online coaching
									program is delivered in 4-week intervals with a tailored workout
									plan, weekly video review and feedback, and on-demand expert
									guidance through virtual support with your coach.
								</p>
								<p>Cost - $150 / 4-weeks</p>
							</>
						)}
					{serviceSelected === 'Strength Training' &&
						infoSelected === 'personal-training' && (
							<>
								<h2>Personal Training</h2>
								<p>
									Experience personalized 1:1 coaching with hands on guidance,
									immediate feedback, and continuous support throughout your
									session. Our personal training sessions include a customized
									weekly program to follow, ensuring continuous progress in
									between sessions with your coach.
								</p>
								<p>
									1 x per week - $100 per session <br />
									2 x per week - $90 per session <br />
									3+ x per week - $75 per session
								</p>
								<p>
									Already a client of online coaching? Add an in-person coaching
									session for $75
								</p>
								<p>
									Looking for a personal training session without a program to
									follow? $90 per session.
								</p>
							</>
						)}
					{serviceSelected === 'Strength Training' &&
						infoSelected === 'team-training' && (
							<>
								<h2>Team Strength and Conditioning</h2>
								<p>
									Enhance performance, prevent injuries, and foster resilience
									within your team through expertly crafted strength and
									conditioning programs. Bring your athlete preparation to the
									next level with a periodized program tailored to the needs of
									your athletes. We offer flexible options which can accommodate a
									wide range of team sizes and budgets.
								</p>
								<p>Contact us today to learn more.</p>
							</>
						)}
				</div>
			</div>
		</DesktopDiv>
	);
};

export const DesktopDiv = styled.div`
	// Smaller screen size
	@media screen and ((max-width: 1200px )or (width: 1200px)) {
		width: 100%;
		height: calc(100vh - 100px);
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;

		& > .service-item {
			color: #f2f2f2;
			width: 100%;
			height: 30%;
			background-color: #333;
			border-radius: 20px;
			position: relative;
			display: flex;
			overflow: auto;

			&:hover {
				cursor: pointer;
				transform: 0.25s;
				box-shadow: 0px 0px 3px 10px #6e88a1;
			}

			& > .title {
				position: absolute;
				width: fit-content;
				left: 2ch;
				font-size: x-large;
				font-weight: bold;
			}

			& > .title-no-hover {
				bottom: 50%;
				transform: translateY(50%);
				transition: 250ms all;
			}

			& > .title-hover {
				transition: 250ms all;
				top: 0.5ch;
			}

			& > .info {
				position: absolute;
				width: calc(60% - 2ch);
				height: fit-content;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 1ch;
				font-size: medium;
				text-align: justify;
			}

			& > .info-no-hover {
				top: 100%;
				transition: 250ms all;
				display: none;
			}

			& > .info-hover {
				bottom: 1ch;
				transition: 250ms all;
			}
		}

		& > .service-info {
			position: absolute;
			width: 100%;
			height: calc(100% - 20px);
			top: 10px;
			z-index: 3;
			background-color: #333;
			opacity: 1;
			border-radius: 20px;
			color: #f2f2f2;
			display: flex;
			flex-direction: row;
			justify-content: start;
			align-items: center;
			overflow: hidden;

			& > .menu {
				flex: 2;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-style: solid;
				border-width: 0 3px 0 0;
				border-color: #f2f2f2;

				& > h2 {
					width: 100%;
					text-align: center;
					margin: 1ch 0;
					font-size: xx-large;
				}

				& > .menu-item {
					width: calc(100% - 4ch);
					text-align: center;
					margin: 0.5ch 0;
					font-size: x-large;
					border-style: solid;
					border-width: 3px 0;
					border-color: #333;
					padding: 0.5ch 2ch;

					&:hover {
						cursor: pointer;
						border-color: #f2f2f2;
						background-color: #6e88a1;
					}
				}

				& > .menu-item-selected {
					border-color: #f2f2f2;
				}

				& > .btn-container {
					padding: 0 10%;
					margin: 1ch 0;
				}
			}

			& > .info {
				flex: 3;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: start;
				align-items: center;
				overflow-x: hidden;
				overflow-y: scroll;

				& > h2 {
					width: 100%;
					text-align: center;
					margin: 1ch 0;
					padding: 0;
					font-size: xx-large;
				}
				& > p {
					margin: 1ch 0;
					text-align: left;
					width: calc(100% - 8ch);
					font-size: large;
				}
			}

			& > .go-back {
				position: absolute;
				width: 50px;
				height: 50px;
				left: 5px;
				top: 5px;
				font-size: 40px;
				display: flex;
				justify-content: center;
				align-items: center;

				&:hover {
					cursor: pointer;
					color: red;
				}
				&:active {
					transform: translate(3px 3px);
				}
			}
		}

		& > .hidden {
			width: 0%;
			height: 0%;
			opacity: 0;
			transition: 250ms all;
		}
	}

	// Larger screen size
	@media screen and (min-width: 1201px) {
		width: 100%;
		min-height: calc(100vh - 100px);
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;

		& > .service-item {
			color: #f2f2f2;
			margin: 20px 0;
			width: 30%;
			background-color: #333;
			border-radius: 20px;
			position: relative;
			display: flex;
			overflow: hidden;

			&:hover {
				cursor: pointer;
				transition: 0.25s;
				box-shadow: 0px 0px 3px 10px #6e88a1;
			}

			& > .title {
				position: absolute;
				width: 100%;
				height: 15%;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #333;
				z-index: 2;
				font-size: xx-large;
				text-align: center;
				font-weight: bold;
				border-style: solid;
				border-color: #d2d2d2;
				border-width: 2px 0;
			}

			& > .title-no-hover {
				transform: translateY(250%);
				transition: 250ms all;
			}

			& > .title-hover {
				transform: translateY(calc(0% - 2px));
				transition: 250ms all;
			}

			& > .info {
				position: absolute;
				width: calc(100% - 4ch);
				height: fit-content;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 10px 2ch;
				background-color: #333;
				z-index: 2;
				font-size: large;
				text-align: justify;
				border-style: solid;
				border-color: #d2d2d2;
				border-width: 2px 0;
			}

			& > .info-no-hover {
				top: 100%;
				transition: 250ms all;
			}

			& > .info-hover {
				bottom: 5%;
			}
		}

		& > .service-info {
			position: absolute;
			width: 100%;
			height: calc(100% - 40px);
			top: 20px;
			z-index: 3;
			background-color: #333;
			opacity: 1;
			border-radius: 20px;
			color: #f2f2f2;
			display: flex;
			flex-direction: row;
			justify-content: start;
			align-items: center;
			overflow: hidden;

			& > .menu {
				flex: 1;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-style: solid;
				border-width: 0 3px 0 0;
				border-color: #f2f2f2;

				& > h2 {
					width: 100%;
					text-align: center;
					margin: 1ch 0;
					font-size: xx-large;
				}

				& > .menu-item {
					width: calc(100% - 4ch);
					text-align: center;
					margin: 0.5ch 0;
					font-size: x-large;
					border-style: solid;
					border-width: 3px 0;
					border-color: #333;
					padding: 0.5ch 2ch;

					&:hover {
						cursor: pointer;
						border-color: #f2f2f2;
						background-color: #6e88a1;
					}
				}

				& > .menu-item-selected {
					border-color: #f2f2f2;
				}

				& > .btn-container {
					padding: 0 10%;
					margin: 1ch 0;
				}
			}

			& > .info {
				flex: 3;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				overflow-x: hidden;
				overflow-y: auto;

				& > h2 {
					width: 100%;
					text-align: center;
					margin: 1ch 0;
					padding: 0;
					font-size: xx-large;
				}
				& > p {
					margin: 1ch 0;
					text-align: left;
					width: calc(100% - 8ch);
					font-size: large;
				}
			}

			& > .go-back {
				position: absolute;
				width: 50px;
				height: 50px;
				left: 5px;
				top: 5px;
				font-size: 40px;
				display: flex;
				justify-content: center;
				align-items: center;

				&:hover {
					cursor: pointer;
					color: red;
				}
				&:active {
					transform: translate(3px 3px);
				}
			}
		}

		& > .hidden {
			width: 0%;
			height: 0%;
			opacity: 0;
			transition: 250ms all;
		}
	}
`;
