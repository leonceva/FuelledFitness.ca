import styled from 'styled-components';
import DesktopLayout from '../layouts/DesktopLayout';
import MobileLayout from '../layouts/MobileLayout';
import Carousel from '../components/Carousel';
import SocialMediaLink from '../components/SocialMediaLink';
import { Link } from 'react-router-dom';

import carousel_01_low_res from '../images/krystin-business-01-low-res.jpg';
import carousel_02_low_res from '../images/krystin-gym-01-low-res.jpg';
import carousel_03_low_res from '../images/krystin-wrestling-01-low-res.jpg';

import carousel_01_high_res from '../images/krystin-business-01-high-res.jpg';
import carousel_02_high_res from '../images/krystin-gym-01-high-res.jpg';
import carousel_03_high_res from '../images/krystin-wrestling-01-high-res.jpg';

const home = () => {
	return (
		<>
			<DesktopLayout content={<DesktopContent />} />
			<MobileLayout content={<MobileContent />} />
		</>
	);
};

export default home;

/************************************************************* DESKTOP MODE ****************************************************************************/

export const DesktopContent = () => {
	return (
		<DesktopDiv>
			<div className='content-container'>
				<div className='preview-container'>
					<div className='preview-item'>
						<div className='heading'>Book Your Consultation </div>
						<div className='sub-heading'>Online and in-person options available</div>
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
					<div className='preview-item'>
						<div className='heading'>Expert Support for You</div>
						<div className='sub-heading'>
							Get to know your nutrition and training expert
						</div>
						<button className='btn'>
							<Link
								to='/about'
								style={{ textDecoration: 'inherit', color: 'inherit' }}>
								Read More
							</Link>
						</button>
					</div>
					<div className='preview-item'>
						<div className='heading'>Stay in Touch</div>
						<div className='sub-heading'>Connect with us on social media</div>
						<div className='social-media-container'>
							<SocialMediaLink
								type='instagram'
								size='40px'
							/>
							<SocialMediaLink
								type='linkedin'
								size='40px'
							/>
						</div>
					</div>
				</div>
				<div className='carousel-container'>
					<Carousel
						lowRes={[carousel_01_low_res, carousel_02_low_res, carousel_03_low_res]}
						highRes={[carousel_01_high_res, carousel_02_high_res, carousel_03_high_res]}
						length={3}
					/>
				</div>
			</div>
		</DesktopDiv>
	);
};

export const DesktopDiv = styled.div`
	width: 100%;
	min-height: calc(100vh - 100px);
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	& > .content-container {
		width: 100%;
		display: flex;
		flex-direction: row-reverse;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		height: fit-content;

		& > .carousel-container {
			width: 450px;
			border: 5px solid #6e88a1;
			border-radius: 10px;
			height: calc(min(70vh, 600px));
			position: relative;

			// Smaller screen size
			@media screen and ((max-width: 1200px )or (width: 1200px)) {
				margin-top: 5px;
				margin-bottom: 10px;
			}
			// Larger screen size
			@media screen and (min-width: 1201px) {
				margin-right: 10px;
			}

			& > .img-div {
				height: 100%;
				width: 100%;
				background-color: #333;
				position: relative;

				& > .left {
					position: absolute;
					height: 100%;
					width: 25px;
					left: 0;
					background-color: #333;
					color: white;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
					z-index: 3;
					transition: all 500ms;

					@media (hover: hover) and (pointer: fine) {
						&:hover {
							width: 30px;
							background-color: #6e88a1; // TODO blue
							transition: all 200ms;
						}
					}
					&:active {
						transition: all 100ms;
						width: 20px;
					}
				}
				& > .right {
					position: absolute;
					height: 100%;
					width: 25px;
					right: 0;
					background-color: #333;
					color: white;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
					z-index: 3;
					transition: all 500ms;

					@media (hover: hover) and (pointer: fine) {
						&:hover {
							width: 30px;
							background-color: #6e88a1; // TODO blue
							transition: all 200ms;
						}
					}

					&:active {
						transition: all 100ms;
						width: 20px;
					}
				}
				& > .background {
					position: absolute;
					width: 100%;
					height: 100%;
					image-rendering: pixelated;
					opacity: 0.2;
				}
			}
		}

		& > .preview-container {
			// Smaller screen size
			@media screen and ((max-width: 1200px )or (width: 1200px)) {
				width: 95%;
				min-height: 200px;
				margin-bottom: 5px;
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
				margin-top: 10px;

				& > .preview-item {
					width: 30%;
					border: 5px solid #6e88a1;
					border-radius: 10px;
					background-color: #333;
					color: #f2f2f2;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 10px 5px;
					margin: 5px 5px;

					& > .heading {
						font-size: large;
						font-weight: bold;
						width: 95%;
						text-align: center;
						padding: 5px;
					}

					& > .sub-heading {
						font-size: medium;
						width: 100%;
						text-align: center;
						padding: 5px;
					}

					& > .social-media-container {
						padding: 5px 0;
						width: 150px;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: space-around;
					}
				}
			}

			// Larger screen size
			@media screen and (min-width: 1201px) {
				flex: 1;
				margin-left: 10px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				height: fit-content;

				& > .preview-item {
					width: 100%;
					height: fit-content;
					border: 5px solid #6e88a1;
					border-radius: 10px;
					background-color: #333;
					color: #f2f2f2;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 10px 0;
					margin: 5px 5px;

					& > .heading {
						font-size: x-large;
						font-weight: bold;
						padding: 0px;
						margin: 5px 0;
						width: 100%;
						text-align: center;
					}
					& > .sub-heading {
						padding: 0px;
						margin: 5px;
						width: 100%;
						text-align: center;
						font-size: larger;
					}
					& > .social-media-container {
						width: 200px;
						margin: 5px;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: space-evenly;
					}
				}
			}
		}
	}
`;

/************************************************************* MOBILE MODE ****************************************************************************/

export const MobileContent = () => {
	return <MobileDiv>Home</MobileDiv>;
};

export const MobileDiv = styled.div``;
