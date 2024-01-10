import DesktopLayout from '../layouts/DesktopLayout';
import MobileLayout from '../layouts/MobileLayout';
import { styled } from 'styled-components';
import { Map, MapContainerDesktop, MapContainerMobile } from '../components/Map';
import InstagramLink from '../components/InstagramLink';
import LinkedInLink from '../components/LinkedInLink';
import Form from '../components/ContactMeForm';

const Contact = () => {
	return (
		<>
			<DesktopLayout content={<DesktopContent />} />
			<MobileLayout content={<MobileContent />} />
		</>
	);
};

export default Contact;

export const DesktopContent = () => {
	return (
		<DesktopDiv>
			<div className='container'>
				<Form />
				<div className='info'>
					<ul className='info-list'>
						<li>
							<h2>Get In Touch</h2>
						</li>
						<li className='socials'>
							<InstagramLink width='3vw' />
							<LinkedInLink width='3vw' />
						</li>
						<li style={{ padding: '0vh 2vw' }}>
							In-Person Nutrition Consults and Personal Training offered at 613 Lift:
						</li>
						<li className='map'>
							<MapContainerDesktop>
								<Map />
							</MapContainerDesktop>
						</li>
					</ul>
				</div>
			</div>
		</DesktopDiv>
	);
};

export const DesktopDiv = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	justify-content: center;
	flex: 1;

	& > .container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;

		& > form {
			width: 50%;
			display: flex;
			flex-direction: column;
			align-items: center;
			max-height: 90%;
			font-size: calc(min(1.5vw, 1.5vh));

			> h2 {
				width: 100%;
				padding-top: 5%;
				font-size: calc(min(3vw, 3vh));
				font-weight: 700;
				height: 10%;
			}

			> .input-text {
				margin: 0.5vh 0;
				width: 80%;
				padding: 1vh 1vw;
			}

			> .submit-btn {
				margin: 0.5vh 0;
				width: 80%;
				background-color: #d0dceb;
				border: 2px solid #333;
				border-radius: 10px;
				padding: 1vh 2vw;
				color: #333;
				box-shadow: 3px 3px 2px #333;
				font-size: (min(2vw, 2vh));

				&::after {
					content: 'Send Message';
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

			> textarea {
				width: 80%;
				margin: 0.5vh 0;
				padding: 1vh 1vw;
				overflow-y: auto;
				min-height: 10vh;
			}
		}

		& > .info {
			width: 50%;
			height: 90%;
			font-size: calc(min(2vw, 2vh));

			& > .info-list {
				list-style: none;
				text-align: start;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding: 0;

				& > li {
					padding: 1vh 0;
					text-align: center;
					font-size: calc(min(2vw, 2vh));

					& > .email {
						text-decoration: underline;
					}

					& > .email:hover {
						cursor: pointer;
						color: blue;
					}

					& > h2 {
						width: 100%;
						padding-top: 5%;
						font-size: calc(min(3vw, 3vh));
						font-weight: 700;
						height: 10%;
					}
				}

				& > .socials {
					display: flex;
					flex-direction: row;
					width: 50%;
					justify-content: space-evenly;
				}

				& > .map {
					padding-top: 2vh;
					display: flex;
					flex-direction: row;
					justify-content: center;
				}
			}
		}
	}
`;

export const MobileContent = () => {
	return (
		<MobileDiv>
			<h2>Get In Touch</h2>
			<div className='info'>
				<ul className='info-list'>
					<li className='socials'>
						<InstagramLink
							width='min(10vw, 13vh)'
							height='min(10vw, 13vh)'
						/>
						<LinkedInLink
							width='min(10vw, 13vh)'
							height='min(10vw, 13vh)'
						/>
					</li>
					<li>
						<Form />
					</li>
					<li>In-Person Nutrition Consults and Personal Training offered at 613 Lift:</li>
					<li className='map'>
						<MapContainerMobile>
							<Map />
						</MapContainerMobile>
					</li>
				</ul>
			</div>
		</MobileDiv>
	);
};

export const MobileDiv = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 100vw;
	padding-top: 2vh;
	padding-bottom: 2vh;
	min-height: calc(100vh - 100px - 4vh);
	align-items: center;

	& > h2 {
		text-align: center;
		font-size: 3vh;
		font-weight: 700;
		padding-top: 1vh;
	}

	& > .info {
		padding-top: 2vh;
		width: 100%;
		height: 100%;
		margin-bottom: 2vh;

		& > .info-list {
			list-style: none;
			text-align: center;
			font-size: 3vh;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			padding: 0;
			align-items: center;
			width: 100%;

			& > li {
				padding: 1vh 5vw;
				width: 100%;

				& > form {
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;

					> h2 {
						text-align: center;
						font-size: 3vh;
						font-weight: 700;
						padding-top: 1vh;
					}

					> .input-text {
						margin: 0.5vh 0;
						width: 80%;
						padding: 1vh 1vw;
						font-size: 2vh;
					}

					> textarea {
						width: 80%;
						margin: 0.5vh 0;
						padding: 1vh 1vw;
						flex: 1;
						height: 300vh;
						font-size: 2vh;
					}

					> .submit-btn {
						margin: 0.5vh 0;
						width: 80%;
						background-color: #d0dce7;
						border: 2px solid #333;
						border-radius: 10px;
						padding: 1vh 2vw;
						color: #333;
						box-shadow: 3px 3px 2px #333;

						&::after {
							content: 'Send Message';
						}

						&:hover {
							background-color: #6e88a1;
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
			}

			& > li > .email {
				color: blue;
				text-decoration: underline;
			}

			& > .socials {
				display: flex;
				flex-direction: row;
				width: 60%;
				justify-content: space-evenly;
			}

			& > .map {
				width: calc(max(80vw, 60vh));
				max-width: 100vw;
				height: calc(min(80vw, 60vh));
				display: flex;
				flex-direction: row;
				justify-content: center;
			}
		}
	}
`;
