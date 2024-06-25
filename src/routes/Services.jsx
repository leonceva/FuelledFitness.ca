import styled from 'styled-components';
import DesktopLayout from '../layouts/DesktopLayout';
import MobileLayout from '../layouts/MobileLayout';
import Image from '../components/Image';
import { useEffect, useState } from 'react';

import nutrition_low_res from '../images/nutrition-01-placeholder.jpg';
import nutrition_high_res from '../images/nutrition-01.jpg';
import training_low_res from '../images/krystin-gym-05-placeholder.jpg';
import training_high_res from '../images/krystin-gym-05.jpg';
import nutrigenomix_low_res from '../images/genetics-placeholder.jpg';
import nutrigenomix_high_res from '../images/genetics.jpg';

const Services = () => {
	return (
		<>
			<DesktopLayout content={<DesktopContent />} />
			<MobileLayout content={<MobileContent />} />
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
						...{ opacity: `${hoverItem === 'nutrition' ? '0.8' : '0.55'}` },
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
					setServiceSelected('Training');
					setInfoSelected('online-coaching');
				}}>
				<Image
					styleWrapper={{
						...styleWrapper,
						...{ opacity: `${hoverItem === 'training' ? '0.8' : '0.55'}` },
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
				onMouseEnter={() => setHoverItem('nutrigenomix')}
				onMouseLeave={() => setHoverItem(null)}
				onClick={() => {
					setServiceSelected('Nutrigenomix');
					setInfoSelected('about');
				}}>
				<Image
					styleWrapper={{
						...styleWrapper,
						...{ opacity: `${hoverItem === 'nutrigenomix' ? '0.8' : '0.55'}` },
					}}
					styleImage={
						screenSize.width > 1200 ? { ...styleImageLarge } : { ...styleImageSmall }
					}
					lowResSrc={nutrigenomix_low_res}
					highResSrc={nutrigenomix_high_res}
				/>
				<div
					className={`title ${
						hoverItem === 'nutrigenomix' ? 'title-hover' : 'title-no-hover'
					}`}>
					Nutrigenomix
				</div>
				<div
					className={`info ${
						hoverItem === 'nutrigenomix' ? 'info-hover' : 'info-no-hover'
					}`}>
					By analyzing your unique genetic makeup, Nutrigenomix provides tailored dietary
					recommendations designed to optimize your health, enhance performance, and
					prevent chronic diseases.
				</div>
			</div>
			<div className={`service-info ${serviceSelected === null ? 'hidden' : ''}`}>
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
						</>
					)}
					{serviceSelected === 'Training' && (
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
						</>
					)}
					{serviceSelected === 'Nutrigenomix' && (
						<>
							<h2>{serviceSelected}</h2>
							<div
								className={`menu-item ${
									infoSelected === 'about' ? 'menu-item-selected' : ''
								}`}
								onClick={() => setInfoSelected('about')}>
								About
							</div>
							<div
								className={`menu-item ${
									infoSelected === 'testing' ? 'menu-item-selected' : ''
								}`}
								onClick={() => setInfoSelected('testing')}>
								Genetic Testing
							</div>
							<div
								className={`menu-item ${
									infoSelected === 'package' ? 'menu-item-selected' : ''
								}`}
								onClick={() => setInfoSelected('package')}>
								Bundle with Meal Plan
							</div>
						</>
					)}
					<div className='btn-container'>
						<button
							className='btn'
							onClick={() => {
								window.open(
									'https://my.practicebetter.io/#/649ca3c56d0b43d466e3b1f8/bookings?step=services',
									'_blank'
								);
							}}>
							Book Appointment
						</button>
						<button
							className='btn'
							onClick={() => {
								setInfoSelected(null);
								setServiceSelected(null);
							}}>
							<i className='bi bi-box-arrow-left' />
							<span>Go Back</span>
						</button>
					</div>
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
								<br />
								Follow-up (30 minutes) - $80
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
								include nutrition presentations, workshops, or one-on-one
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
								reviewed and tailored by a Registered Dietitian.
							</p>
							<p>Some examples may include:</p>
							<ul>
								<li>Analyzing the nutritional content of your meals</li>
								<li>Suggesting healthier ingredient substitutions</li>
								<li>Ensuring compliance with dietary guidelines and regulations</li>
								<li>
									Modifying menus for specific dietary needs, such as gluten-free,
									vegetarian, or diabetic-friendly options
								</li>
							</ul>
							<p>
								Contact us today to discuss the unique needs of your organization.
							</p>
						</>
					)}
					{serviceSelected === 'Training' && infoSelected === 'online-coaching' && (
						<>
							<h2>Online Coaching</h2>
							<p>
								Discover the ultimate online coaching experience with a personalized
								program and consistent support. Our online coaching program is
								delivered in 4-week intervals with a tailored workout plan, weekly
								video review and feedback, and on-demand expert guidance through
								virtual support with your coach.
							</p>
							<p>Cost - $150 / 4-weeks</p>
						</>
					)}
					{serviceSelected === 'Training' && infoSelected === 'personal-training' && (
						<>
							<h2>Personal Training</h2>
							<p>
								Experience personalized 1:1 coaching with hands on guidance,
								immediate feedback, and continuous support throughout your session.
								Our personal training sessions include a customized weekly program
								to follow, ensuring continuous progress in between sessions with
								your coach.
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
								Looking for a personal training session without a program to follow?
								$90 per session
							</p>
						</>
					)}
					{serviceSelected === 'Training' && infoSelected === 'team-training' && (
						<>
							<h2>Team Strength and Conditioning</h2>
							<p>
								Enhance performance, prevent injuries, and foster resilience within
								your team through expertly crafted strength and conditioning
								programs. Bring your athlete preparation to the next level with a
								periodized program tailored to the needs of your athletes. We offer
								flexible options which can accommodate a wide range of team sizes
								and budgets.
							</p>
							<p>Contact us today to learn more.</p>
						</>
					)}
					{serviceSelected === 'Nutrigenomix' && infoSelected === 'about' && (
						<>
							<h2>About Nutrigenomix</h2>
							<p>
								<strong>
									Nutrigenomix provides genetic predisposition for a variety of
									areas:
								</strong>
							</p>
							<ul>
								<li>Nutrient metabolism</li>
								<li>Food intolerances and sensitivities</li>
								<li>Cardiometabolic health</li>
								<li>Weight management and body composition </li>
								<li>Eating habits</li>
								<li>Exercise physiology, fitness, and injury risk</li>
							</ul>
							<p>
								<strong>How is my sample taken?</strong>
							</p>
							<p>
								A saliva test is delivered to your home. It is quick, simple, and
								painless!
							</p>
							<button
								className='btn'
								style={{
									marginTop: '1ch',
									alignSelf: 'flex-start',
									marginLeft: '4ch',
								}}
								onClick={() => {
									window.open(
										'https://nutrigenomix.com/storage/pages/about-nutrigenomix.pdf',
										'_blank'
									);
								}}>
								Learn More
							</button>
						</>
					)}
					{serviceSelected === 'Nutrigenomix' && infoSelected === 'testing' && (
						<>
							<h2>Genetic Testing</h2>
							<p>
								An advanced genetic testing service that revolutionizes personalized
								nutrition.
							</p>
							<p>Genetic Testing Package - $650</p>
							<ul>
								<li>Nutrigenomix genetic test (70 gene test)</li>
								<li>
									Follow-up appointment to review genetic test results (45
									minutes)
								</li>
							</ul>
						</>
					)}
					{serviceSelected === 'Nutrigenomix' && infoSelected === 'package' && (
						<>
							<h2>Genetic Testing & Meal Plan</h2>
							<p>
								Combining the genetic test results with a specially tailored meal
								plan empowers you to achieve optimal health by leveraging
								personalized nutrition insights.
							</p>
							<p>Genetic Testing and Personalized Meal Plan - $850</p>
							<ul>
								<li>Initial nutrition assessment (1 hour)</li>
								<li>Nutrigenomix genetic test (70 gene test)</li>
								<li>Personalized meal plan</li>
								<li>
									Follow-up appointment to review genetic test results (45
									minutes)
								</li>
							</ul>
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
			background-color: black;
			border-radius: 20px;
			position: relative;
			display: flex;
			overflow: auto;

			@media (hover: hover) and (pointer: fine) {
				&:hover {
					cursor: pointer;
					box-shadow: 0px 0px 3px 10px #87ceeb;
				}
			}

			&:active {
				box-shadow: 0px 0px 0px 0px;
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
			height: calc(100% - 10px);
			top: 5px;
			z-index: 3;
			background-color: black;
			opacity: 1;
			border-radius: 20px;
			color: #f2f2f2;
			display: flex;
			flex-direction: row;
			justify-content: start;
			align-items: center;
			overflow: hidden;

			& > .menu {
				height: calc(100% - 50px);
				top: 50px;
				width: 40%;
				display: flex;
				flex-direction: column;
				justify-content: start;
				align-items: center;
				position: absolute;
				left: 0%;
				overflow-y: auto;

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
					border-color: black;
					padding: 0.5ch 2ch;

					@media (hover: hover) and (pointer: fine) {
						&:hover {
							cursor: pointer;
							color: #87ceeb;
						}
					}
				}

				& > .menu-item-selected {
					border-color: #87ceeb;
					color: #87ceeb;
				}

				& > .btn-container {
					padding: 0 10%;
					margin: 1ch 0;
				}
			}

			& > .info {
				position: absolute;
				height: 100%;
				width: 60%;
				left: 40%;
				display: flex;
				flex-direction: column;
				justify-content: start;
				align-items: center;
				overflow-x: hidden;
				overflow-y: auto;
				border-style: solid;
				border-width: 0 0 0 3px;
				border-color: #f2f2f2;

				& > h2 {
					width: calc(100% - 2ch);
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
				& > ul {
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
				top: 0px;
				font-size: 40px;
				display: flex;
				justify-content: center;
				align-items: center;

				@media (hover: hover) and (pointer: fine) {
					&:hover {
						cursor: pointer;
						color: #87ceeb;
					}
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
			background-color: black;
			border-radius: 20px;
			position: relative;
			display: flex;
			overflow: hidden;

			@media (hover: hover) and (pointer: fine) {
				&:hover {
					cursor: pointer;
					transition: 0.25s;
					box-shadow: 0px 0px 3px 10px #87ceeb;
				}
			}

			& > .title {
				position: absolute;
				width: 100%;
				height: 15%;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: black;
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
				background-color: black;
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
			background-color: black;
			opacity: 1;
			border-radius: 20px;
			color: white;
			display: flex;
			flex-direction: row;
			justify-content: start;
			align-items: center;
			overflow: hidden;

			& > .menu {
				height: calc(100% - 50px);
				width: 40%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				position: absolute;
				left: 0%;
				overflow-y: auto;

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
					border-color: black;
					padding: 0.5ch 2ch;

					@media (hover: hover) and (pointer: fine) {
						&:hover {
							cursor: pointer;
							border-color: none;
							color: #87ceeb;
						}
					}
				}

				& > .menu-item-selected {
					border-color: #87ceeb;
					color: #87ceeb;
				}

				& > .btn-container {
					display: flex;
					flex-direction: column;
					justify-content: start;
					align-items: center;

					& > button {
						margin: 1ch 0;

						& > span {
							margin-left: 1ch;
						}
					}
				}
			}

			& > .info {
				position: absolute;
				height: 100%;
				width: 60%;
				left: 40%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				overflow-x: hidden;
				overflow-y: auto;
				border-style: solid;
				border-width: 0 0 0 3px;
				border-color: #f2f2f2;

				& h2 {
					width: 100%;
					text-align: center;
					margin: 1ch 0;
					padding: 0;
					font-size: xx-large;
				}
				& p {
					margin: 1ch 0;
					text-align: left;
					width: calc(100% - 8ch);
					font-size: large;
				}
				& ul {
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

				@media (hover: hover) and (pointer: fine) {
					&:hover {
						cursor: pointer;
						color: #87ceeb;
					}
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

/************************************************************* MOBILE MODE ****************************************************************************/

export const MobileContent = () => {
	const styleWrapper = {
		position: 'absolute',
		width: '100%',
		height: '100%',
		overflowY: 'hidden',
		overflowX: 'hidden',
		opacity: '0.55',
	};

	const styleImage = {
		position: 'absolute',
		width: '100%',
		minHeight: '100%',
		height: 'auto',
		right: '0%',
		top: '0%',
		zIndex: '1',
	};

	const [serviceSelected, setServiceSelected] = useState(null);
	const [infoSelected, setInfoSelected] = useState(null);

	return (
		<MobileDiv>
			{serviceSelected === null && (
				<div className='service-container'>
					<div
						className='service-item'
						onClick={() => {
							setServiceSelected('Nutrition');
							setInfoSelected('individuals');
							window.scrollTo({
								top: 0,
								behavior: 'smooth',
							});
						}}>
						<h2>Nutrition</h2>
						<Image
							styleWrapper={styleWrapper}
							styleImage={styleImage}
							lowResSrc={nutrigenomix_low_res}
							highResSrc={nutrition_high_res}
						/>
					</div>
					<div
						className='service-item'
						onClick={() => {
							setServiceSelected('Strength Training');
							setInfoSelected('online-coaching');
							window.scrollTo({
								top: 0,
								behavior: 'smooth',
							});
						}}>
						<h2>Training</h2>
						<Image
							styleWrapper={styleWrapper}
							styleImage={styleImage}
							lowResSrc={training_low_res}
							highResSrc={training_high_res}
						/>
					</div>
					<div
						className='service-item'
						onClick={() => {
							setServiceSelected('Nutrigenomix');
							setInfoSelected('about');
							window.scrollTo({
								top: 0,
								behavior: 'smooth',
							});
						}}>
						<h2>Nutrigenomix</h2>
						<Image
							styleWrapper={styleWrapper}
							styleImage={styleImage}
							lowResSrc={nutrigenomix_low_res}
							highResSrc={nutrigenomix_high_res}
						/>
					</div>
				</div>
			)}
			{serviceSelected !== null && (
				<div className='info-container'>
					<div className='item-menu'>
						{serviceSelected === 'Nutrition' && (
							<>
								<div
									className={`menu-item ${
										infoSelected === 'individuals' ? 'selected' : ''
									}`}
									onClick={() => {
										setInfoSelected('individuals');
									}}>
									Individuals
								</div>
								<div
									className={`menu-item ${
										infoSelected === 'team-programs' ? 'selected' : ''
									}`}
									onClick={() => {
										setInfoSelected('team-programs');
									}}>
									Team Programs
								</div>
								<div
									className={`menu-item ${
										infoSelected === 'corporate' ? 'selected' : ''
									}`}
									onClick={() => {
										setInfoSelected('corporate');
									}}>
									Corporate
								</div>
								<div
									className={`menu-item ${
										infoSelected === 'menu-review' ? 'selected' : ''
									}`}
									onClick={() => {
										setInfoSelected('menu-review');
									}}>
									Menu Review
								</div>
							</>
						)}
						{serviceSelected === 'Strength Training' && (
							<>
								<div
									className={`menu-item ${
										infoSelected === 'online-coaching' ? 'selected' : ''
									}`}
									onClick={() => {
										setInfoSelected('online-coaching');
									}}>
									Online Coaching
								</div>
								<div
									className={`menu-item ${
										infoSelected === 'personal-training' ? 'selected' : ''
									}`}
									onClick={() => {
										setInfoSelected('personal-training');
									}}>
									Personal Training
								</div>
								<div
									className={`menu-item ${
										infoSelected === 'team-training' ? 'selected' : ''
									}`}
									onClick={() => {
										setInfoSelected('team-training');
									}}>
									Team Training
								</div>
							</>
						)}
						{serviceSelected === 'Nutrigenomix' && (
							<>
								<div
									className={`menu-item ${
										infoSelected === 'about' ? 'selected' : ''
									}`}
									onClick={() => {
										setInfoSelected('about');
									}}>
									About Nutrigenomix
								</div>
								<div
									className={`menu-item ${
										infoSelected === 'testing' ? 'selected' : ''
									}`}
									onClick={() => {
										setInfoSelected('testing');
									}}>
									Genetic Testing
								</div>
								<div
									className={`menu-item ${
										infoSelected === 'package' ? 'selected' : ''
									}`}
									onClick={() => {
										setInfoSelected('package');
									}}>
									Bundle with Meal Plan
								</div>
							</>
						)}
						<div
							className='menu-item'
							onClick={() => {
								setServiceSelected(null);
								setInfoSelected(null);
							}}>
							Go Back
						</div>
					</div>
					<div className='info'>
						{infoSelected === 'individuals' && (
							<>
								<h2>Nutrition Counselling</h2>
								<p>
									Say goodbye to guesswork, and hello to a personalized nutrition
									plan! Work 1:1 with a Registered Dietitian to achieve your
									goals. Whether you're striving for peak performance, weight
									loss, improved energy levels, or optimal health and wellbeing
									for yourself and your family, we offer personalized strategies
									to support you in achieving your goals.
								</p>
								<p>
									Initial Consult (60 minutes) - $140
									<br />
									Follow-up (45 minutes) - $105
									<br />
									Follow-up (30 minutes) - $80
								</p>
								<h2>Meal Plan Add-On</h2>
								<p>
									A meal plan is not the answer for everyone. Your Registered
									Dietitian will work with you to address the challenges you face
									to optimally achieve your nutrition goals.
								</p>
								<p>Cost - $80</p>
							</>
						)}
						{infoSelected === 'team-programs' && (
							<>
								<h2>Team Nutrition Programs</h2>
								<p>
									Complement the hard work your athletes are putting in during
									training with nutrition support. Some services offered include
									nutrition presentations, interactive activities, or 1:1
									counselling sessions.
								</p>
								<p>
									Contact us today to design a program that fits the needs of your
									team.
								</p>
							</>
						)}
						{infoSelected === 'corporate' && (
							<>
								<h2>Employee Nutrition Program</h2>
								<p>
									Support the wellbeing of your employees through nutrition
									support. Healthier and happier employees promote improved
									productivity, longevity, and a better workplace culture. Some
									services offered include nutrition presentations, workshops, or
									one-on-one counselling sessions.
								</p>
								<p>
									Contact us today to discuss the unique needs of your
									organization.
								</p>
							</>
						)}
						{infoSelected === 'menu-review' && (
							<>
								<h2>Menu Review</h2>
								<p>
									Do you provide meals as part of your business? Provide assurance
									of nutritional balance, and credibility to clients by having
									your menu reviewed and tailored by a Registered Dietitian.
								</p>
								<p>Some examples may include:</p>
								<ul>
									<li>Analyzing the nutritional content of your meals</li>
									<li>Suggesting healthier ingredient substitutions</li>
									<li>
										Ensuring compliance with dietary guidelines and regulations
									</li>
									<li>
										Modifying menus for specific dietary needs, such as
										gluten-free, vegetarian, or diabetic-friendly options
									</li>
								</ul>
								<p>
									Contact us today to discuss the unique needs of your
									organization.
								</p>
							</>
						)}
						{infoSelected === 'online-coaching' && (
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
						{infoSelected === 'personal-training' && (
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
									follow? $90 per session
								</p>
							</>
						)}
						{infoSelected === 'team-training' && (
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
						{infoSelected === 'about' && (
							<>
								<h2>About Nutrigenomix</h2>
								<p>
									<strong>
										Nutrigenomix provides genetic predisposition for a variety
										of areas:
									</strong>
								</p>
								<ul>
									<li>Nutrient metabolism</li>
									<li>Food intolerances and sensitivities</li>
									<li>Cardiometabolic health</li>
									<li>Weight management and body composition </li>
									<li>Eating habits</li>
									<li>Exercise physiology, fitness, and injury risk</li>
								</ul>

								<p>
									<strong>How is my sample taken?</strong>
								</p>
								<p>
									A saliva test is delivered to your home. It is quick, simple,
									and painless!
								</p>
								<button
									className='btn'
									style={{}}
									onClick={() => {
										window.open(
											'https://nutrigenomix.com/storage/pages/about-nutrigenomix.pdf',
											'_blank'
										);
									}}>
									Learn More
								</button>
							</>
						)}
						{infoSelected === 'testing' && (
							<>
								<h2>Genetic Testing</h2>
								<p>
									An advanced genetic testing service that revolutionizes
									personalized nutrition.
								</p>
								<p>Genetic Testing Package - $650</p>
								<ul>
									<li>Nutrigenomix genetic test (70 gene test)</li>
									<li>
										Follow-up appointment to review genetic test results (45
										minutes)
									</li>
								</ul>
							</>
						)}
						{infoSelected === 'package' && (
							<>
								<h2>Genetic Testing & Meal Plan</h2>
								<p>
									Combining the genetic test results with a specially tailored
									meal plan empowers you to achieve optimal health by leveraging
									personalized nutrition insights.
								</p>
								<p>Genetic Testing and Personalized Meal Plan - $850</p>
								<ul>
									<li>Initial nutrition assessment (1 hour)</li>
									<li>Nutrigenomix genetic test (70 gene test)</li>
									<li>Personalized meal plan</li>
									<li>
										Follow-up appointment to review genetic test results (45
										minutes)
									</li>
								</ul>
							</>
						)}
						<button
							className='btn'
							onClick={() => {
								window.open(
									'https://my.practicebetter.io/#/649ca3c56d0b43d466e3b1f8/bookings?step=services',
									'_blank'
								);
							}}>
							Book Appointment
						</button>
					</div>
				</div>
			)}
		</MobileDiv>
	);
};

export const MobileDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: calc(100vh - 100px);
	position: absolute;
	overflow: hidden;

	& > .service-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		overflow: hidden;

		& > .service-item {
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 90%;
			height: 30%;
			background-color: black;
			border-radius: 10px;
			overflow: hidden;

			& > h2 {
				position: absolute;
				width: 100%;
				text-align: center;
				color: #d2d2d2;
				font-size: x-large;
				margin: 0;
				top: 10%;
				padding: 1ch 0;
				background-color: rgba(0, 0, 0, 0.5);
				z-index: 2;
			}
		}
	}

	& > .info-container {
		color: white;
		position: absolute;
		width: calc(100% - 20px);
		height: calc(100vh - 120px);
		top: 10px;
		border-radius: 10px;
		background-color: black;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		overflow: hidden;
		border: 3px solid black;

		& > .item-menu {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;
			padding-top: 10px;

			& > .menu-item {
				width: 100%;
				text-align: center;
				padding: 5px 0;
				font-size: x-large;
				border: 2px solid black;
			}

			& > .selected {
				font-weight: bold;
				color: #87ceeb;
				border: 2px solid #87ceeb;
			}
		}

		& > .info {
			flex: 1;
			width: 100%;
			overflow-y: auto;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;
			background-color: #d2d2d2;
			color: black;

			& > h2 {
				width: 100%;
				margin: 1ch 0;
				padding: 0;
				text-align: center;
				font-size: x-large;
			}

			& > p {
				width: calc(100% - 4ch);
				font-size: large;
				margin: 1ch 0;
			}

			& > ul {
				width: calc(100% - 8ch);
				font-size: large;
			}

			& > button {
				box-shadow: none;
				margin-bottom: 20px;

				&:active {
					box-shadow: none;
				}
			}
		}
	}
`;
