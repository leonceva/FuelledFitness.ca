import styled from 'styled-components';
import DesktopLayout from '../layouts/DesktopLayout';
import SocialMediaLink from '../components/SocialMediaLink';
import { useState, useEffect } from 'react';
import ContactMeForm from '../components/ContactForm';

const Contact = () => {
	return (
		<>
			<DesktopLayout content={<DesktopContent />} />
		</>
	);
};

export default Contact;

/************************************************************* DESKTOP MODE ****************************************************************************/

export const DesktopContent = () => {
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

	let mapWidth, mapHeight;
	if (screenSize.width > 1200) {
		mapWidth = Math.min(500, screenSize.width * 0.3);
		mapHeight = Math.min(450, screenSize.height * 0.45);
	} else {
		mapWidth = Math.min(500, screenSize.width * 0.7);
		mapHeight = Math.min(450, screenSize.height * 0.5);
	}

	const apiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

	return (
		<DesktopDiv>
			<div className='links-container'>
				<h3>Get In Touch</h3>
				<div className='social-media-links'>
					<SocialMediaLink
						type='instagram'
						size='50px'
						hover='#333'
					/>
					<SocialMediaLink
						type='linkedin'
						size='50px'
						hover='#333'
					/>
				</div>
			</div>
			<div className='form-container'>
				<ContactMeForm />
			</div>
			<div className='map-container'>
				<div className='info'>
					<h5>In-Person Nutrition Consults and Personal Training offered at 613 Lift</h5>
				</div>
				<div className='map'>
					<iframe
						title='map'
						width={mapWidth}
						height={mapHeight}
						loading='lazy'
						src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJASX-87gHzkwRZsp9skl07KQ&key=${apiKey}`}></iframe>
				</div>
			</div>
		</DesktopDiv>
	);
};

export const DesktopDiv = styled.div`
	// Larger screen size
	@media screen and (min-width: 1201px) {
		width: 100%;
		height: calc(100vh - 120px);
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 10px;

		& > .links-container {
			position: absolute;
			width: 40%;
			height: 20%;
			right: 5%;
			top: 5%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			& > h3 {
				width: 100%;
				text-align: center;
				font-size: x-large;
				font-weight: bold;
				margin: 0 0 1ch;
				padding: 0;
			}

			& > .social-media-links {
				width: 200px;
				display: flex;
				align-items: center;
				justify-content: space-evenly;
			}
		}

		& > .form-container {
			position: absolute;
			width: 45%;
			height: 90%;
			left: 5%;
			top: 5%;

			& > form {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: large;

				& > h2 {
					width: 100%;
					font-size: x-large;
					text-align: center;
					margin: 1ch 0;
				}

				& > .input-text {
					margin: 1ch 0;
					width: 75%;
					max-width: 400px;
					padding: 5px;
				}

				& > textarea {
					width: 75%;
					max-width: 400px;
					margin: 1ch 0 2ch;
					padding: 5px;
					overflow-y: auto;
					min-height: 10ch;
				}

				& > .btn {
					margin-top: 1ch;

					&::after {
						content: 'Send Message';
					}
				}

				& > .submitted::after {
					content: 'Message Sent!';
				}
			}
		}

		& > .map-container {
			position: absolute;
			width: 40%;
			height: 65%;
			right: 5%;
			top: 25%;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;

			& > .info {
				width: 100%;
				height: fit-content;
				text-align: center;
				margin: 0;
				font-size: large;
			}

			& > .map {
				width: calc(min(500px, 30vw));
				height: calc(min(450px, 45vh));
				display: flex;
				justify-content: center;
				align-items: center;
				overflow: hidden;
				border: 3px solid #333;
				border-radius: 20px;
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

		& > .links-container {
			width: 100%;
			margin-top: 10px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			& > h3 {
				width: 100%;
				text-align: center;
				font-size: x-large;
				font-weight: bold;
				margin: 0 0 1ch;
				padding: 0;
			}

			& > .social-media-links {
				width: 200px;
				display: flex;
				align-items: center;
				justify-content: space-evenly;
			}
		}

		& > .form-container {
			width: 100%;

			& > form {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: start;
				align-items: center;

				& > h2 {
					width: 100%;
					font-size: x-large;
					text-align: center;
					margin: 1ch 0;
				}

				& > .input-text {
					margin: 1ch 0;
					width: 75%;
					max-width: 400px;
					padding: 5px;
				}

				& > textarea {
					width: 75%;
					max-width: 400px;
					margin: 1ch 0 2ch;
					padding: 5px;
					overflow-y: auto;
					min-height: 10ch;
				}

				& > .btn {
					margin-top: 1ch;

					&::after {
						content: 'Send Message';
					}
				}

				& > .submitted::after {
					content: 'Message Sent!';
				}
			}
		}

		& > .map-container {
			width: 100%;
			margin-bottom: 20px;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;

			& > .info {
				width: 100%;
				height: fit-content;
				text-align: center;
				margin: 0;
				font-size: x-large;
			}

			& > .map {
				width: calc(min(500px, 70vw));
				height: calc(min(450px, 50vh));
				overflow: hidden;
				display: flex;
				justify-content: center;
				align-items: center;
				border: 3px solid #333;
				border-radius: 20px;
			}
		}
	}
`;
