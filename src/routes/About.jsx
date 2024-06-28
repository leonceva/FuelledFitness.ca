import styled from 'styled-components';
import DesktopLayout from '../layouts/DesktopLayout';
import MobileLayout from '../layouts/MobileLayout';
import Image from '../components/Image';

import about_01_low_res from '../images/krystin-business-02-low-res.jpg';
import about_02_low_res from '../images/krystin-gym-03-low-res.jpg';
import about_01_high_res from '../images/krystin-business-02-high-res.jpg';
import about_02_high_res from '../images/krystin-gym-03-high-res.jpg';

const About = () => {
	return (
		<>
			<DesktopLayout content={<DesktopContent />} />
			<MobileLayout content={<MobileContent />} />
		</>
	);
};

/************************************************************* DESKTOP MODE ****************************************************************************/

export const DesktopContent = () => {
	const styleWrapperImageLeft = {
		position: 'relative',
		width: 'calc(min(50%, 400px))',
		aspectRatio: '1/1.05',
		float: 'left',
		overflowX: 'hidden',
		overflowY: 'hidden',
		marginRight: '10px',
		backgroundColor: '#333',
		border: '2px solid black',
	};

	const styleImage = {
		position: 'absolute',
		width: 'auto',
		height: 'auto',
		maxHeight: '110%',
		maxWidth: '125%',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		zIndex: '2',
		animation: 'fadein 1s',
	};

	const styleWrapperImageCenter = {
		position: 'relative',
		height: 'calc(min(35vw, 400px))',
		aspectRatio: '1.75/1',
		overflowX: 'hidden',
		overflowY: 'hidden',
		marginTop: '10px',
		backgroundColor: '#333',
		border: '2px solid black',
		left: '50%',
		transform: 'translate(-50%, 0)',
	};

	return (
		<DesktopDiv>
			<article>
				<Image
					styleWrapper={styleWrapperImageLeft}
					styleImage={styleImage}
					lowResSrc={about_01_low_res}
					highResSrc={about_01_high_res}
				/>
				<div className='title'>About Fuelled Fitness</div>
				<p>
					We're your destination for tailored nutrition and training programs, catering to
					everyone from elite athletes to individuals seeking healthier lifestyles. Our
					mission is to help you reach peak health and performance through personalized
					strategies.
				</p>
				<div className='title'>Krystin Paquette, RD, BKin</div>
				<p>
					Krystin's educational foundation includes a BSc. in Nutrition and Food Science
					with a specialization in Dietetics, complemented by a Bachelor of Kinesiology
					degree. By bridging the areas of nutrition and training, Krystin can offer a
					comprehensive coaching experience tailored to your unique needs and aspirations.
				</p>
				<p>
					Krystin's approach is always grounded in evidence-based practice, and
					person-centred principles. She believes in adaptive coaching strategies that are
					tailored to your goals, and that meet you where you are now in order to
					effectively get you to where you want to be.
				</p>
				<div className='title'>Let's Get Started!</div>
				<p>
					Whether you aspire to excel as a high-performance athlete, effectively manage a
					medical condition, or simply cultivate a healthier lifestyle, we are here to
					support you every step of the way. Reach out through the contact page, or click
					the "book appointment" button to get started!
				</p>
				<div className='btn-container'>
					<button
						className='btn btn-secondary'
						onClick={() => {
							window.open(
								'https://my.practicebetter.io/#/649ca3c56d0b43d466e3b1f8/bookings?step=services',
								'_blank'
							);
						}}>
						Book Appointment
					</button>
				</div>
				<Image
					styleWrapper={styleWrapperImageCenter}
					styleImage={styleImage}
					lowResSrc={about_02_low_res}
					highResSrc={about_02_high_res}
				/>
			</article>
		</DesktopDiv>
	);
};

export const DesktopDiv = styled.div`
	width: 100%;
	min-height: calc(100vh - 120px);
	margin: 15px 0;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	text-align: justify;

	& .title {
		width: 100%;
		text-align: left;
		font-size: x-large;
		font-weight: bold;
	}

	& p {
		font-size: medium;
	}

	& .btn-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
`;

/************************************************************* MOBILE MODE ****************************************************************************/

export const MobileContent = () => {
	const styleWrapperImage = {
		position: 'relative',
		width: 'calc(min(90%, 400px))',
		aspectRatio: '1/1.05',
		overflowX: 'hidden',
		overflowY: 'hidden',
		backgroundColor: '#333',
		border: '2px solid black',
		alignSelf: 'center',
	};

	const styleImage = {
		position: 'absolute',
		width: 'auto',
		height: 'auto',
		maxHeight: '110%',
		maxWidth: '125%',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		zIndex: '2',
		animation: 'fadein 1s',
	};
	return (
		<MobileDiv>
			<article>
				<h2>About Fuelled Fitness</h2>
				<p>
					We're your destination for tailored nutrition and training programs, catering to
					everyone from elite athletes to individuals seeking healthier lifestyles. Our
					mission is to help you reach peak health and performance through personalized
					strategies.
				</p>
				<Image
					styleWrapper={styleWrapperImage}
					styleImage={styleImage}
					lowResSrc={about_01_low_res}
					highResSrc={about_01_high_res}
				/>
				<h2>Krystin Paquette, RD, BKin</h2>
				<p>
					Krystin's educational foundation includes a BSc. in Nutrition and Food Science
					with a specialization in Dietetics, complemented by a Bachelor of Kinesiology
					degree. By bridging the areas of nutrition and training, Krystin can offer a
					comprehensive coaching experience tailored to your unique needs and aspirations.
				</p>
				<p>
					Krystin's approach is always grounded in evidence-based practice, and
					person-centred principles. She believes in adaptive coaching strategies that are
					tailored to your goals, and that meet you where you are now in order to
					effectively get you to where you want to be.
				</p>
				<h2>Let's Get Started!</h2>
				<p>
					Whether you aspire to excel as a high-performance athlete, effectively manage a
					medical condition, or simply cultivate a healthier lifestyle, we are here to
					support you every step of the way. Reach out through the contact page, or click
					the "book appointment" button to get started!
				</p>
				<button
					className='btn btn-secondary'
					onClick={() => {
						window.open(
							'https://my.practicebetter.io/#/649ca3c56d0b43d466e3b1f8/bookings?step=services',
							'_blank'
						);
					}}>
					Book Appointment
				</button>
				<Image
					styleWrapper={styleWrapperImage}
					styleImage={styleImage}
					lowResSrc={about_02_low_res}
					highResSrc={about_02_high_res}
				/>
			</article>
		</MobileDiv>
	);
};

export const MobileDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;

	& > article {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-bottom: 10px;

		& > h2 {
			width: 100%;
			text-align: center;
			margin: 10px 0 0;
			font-size: x-large;
		}

		& > p {
			width: calc(100% - 4ch);
			margin: 10px 0;
			padding: 0 2ch;
			font-size: large;
		}

		& > button {
			margin: 0 0 10px;
			box-shadow: none;
		}
	}
`;

export default About;
