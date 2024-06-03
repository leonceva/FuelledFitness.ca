import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo_img from '../images/fuelled-fitness-logo.svg';
import logo_letters from '../images/fuelled-fitness-letters.svg';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE_LIMIT;

const Navbar = () => {
	const [scrollPosition, setPosition] = useState(0);

	useEffect(() => {
		const updatePosition = () => {
			setPosition(window.scrollY);
		};
		window.addEventListener('scroll', updatePosition);
		updatePosition();

		return () => {
			window.removeEventListener('scroll', updatePosition);
		};
	}, []);

	return (
		<>
			<DesktopNavbar scrollPosition={scrollPosition} />
			<MobileNavbar scrollPosition={scrollPosition} />
		</>
	);
};

export default Navbar;

/************************************************************* DESKTOP MODE ****************************************************************************/

export const DesktopNavbar = (props) => {
	const navigate = useNavigate();

	const scrollPosition = props.scrollPosition;

	return (
		<DesktopDiv
			style={{
				backgroundColor: `${
					scrollPosition > 100 ? 'rgba(51, 51, 51, 0.9)' : 'rgba(51, 51, 51, 1)'
				}`,
			}}>
			<img
				className='logo-img'
				src={logo_img}
				alt='Fuelled Fitness Logo'
				onClick={() => {
					navigate('/');
				}}
			/>
			<img
				className='logo-letters'
				src={logo_letters}
				alt='Fuelled Fitness'
				onClick={() => {
					navigate('/');
				}}
			/>
			<div className='link-container'>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/about'>About</NavLink>
				<NavLink to='/services'>Services</NavLink>
				<NavLink to='/contact'>Contact</NavLink>
				<NavLink to='/athletes'>Athletes</NavLink>
				<NavLink to='/myAccount'>My Account</NavLink>
			</div>
		</DesktopDiv>
	);
};

export const DesktopDiv = styled.div`
	@media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		overflow: hidden;
		justify-content: space-between;
		position: relative;

		& > .logo-img {
			cursor: pointer;
			left: 0;
			height: 100%;
			aspect-ratio: 1/1;
			padding: 0 5px;
			filter: invert(1);
		}
		& > .logo-letters {
			height: 130%;
			aspect-ratio: 1/1;
			padding: 0 5px;
			filter: invert(1);
			cursor: pointer;
			@media screen and (max-width: 925px) {
				display: none;
			}
		}
		& > .link-container {
			min-width: calc(100vw - 350px);
			flex: 1;
			height: 100%;
			padding: 0 5px;
			display: flex;
			flex-direction: row;
			justify-content: end;
			align-items: center;
			padding-right: 20px;
		}
	}
	@media screen and ((max-width: ${MOBILE_MODE_LIMIT} )or (width: ${MOBILE_MODE_LIMIT})) {
		display: none;
	}
`;

export const NavLink = styled(Link)`
	color: #f2f2f2;
	text-decoration: none;
	text-align: center;
	margin: 0 25px;
	font-weight: bold;
	&:hover {
		transition: 200ms;
		box-shadow: 0 3px 0 0 #f2f2f2;
	}

	@media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
		font-size: 15px;
	}

	@media screen and (min-width: 1000px) {
		font-size: large;
	}
	@media screen and (min-width: 1400px) {
		font-size: x-large;
	}
`;

/************************************************************* MOBILE MODE ****************************************************************************/

export const MobileNavbar = (props) => {
	const navigate = useNavigate();

	const scrollPosition = props.scrollPosition;
	const [isExpanded, setIsExpanded] = useState(false);

	const handleClick = () => {
		document.addEventListener(
			'click',
			(e) => {
				e.preventDefault();
				e.stopPropagation();
				setIsExpanded(false);
			},
			{ once: true }
		);
	};

	return (
		<MobileDiv
			style={{
				backgroundColor: `${
					scrollPosition > 100 ? 'rgba(51, 51, 51, 0.9)' : 'rgba(51, 51, 51, 1)'
				}`,
			}}>
			<img
				className='logo-img'
				src={logo_img}
				alt='Fuelled Fitness Logo'
				onClick={() => {
					navigate('/');
				}}
			/>
			<img
				className='logo-letters'
				src={logo_letters}
				alt='Fuelled Fitness'
				onClick={() => {
					navigate('/');
				}}
			/>
			<div className='nav-button'>
				<div
					className={`${isExpanded ? 'change-button-container' : 'button-container'}`}
					onClick={() => {
						if (isExpanded === true) {
							setIsExpanded(false);
						} else {
							setIsExpanded(true);
							document.addEventListener(
								'click',
								(e) => {
									e.preventDefault();
									e.stopPropagation();
									handleClick();
								},
								{ once: true }
							);
						}
					}}>
					<div className={isExpanded ? 'change-bar-1' : 'bar-1'} />
					<div className={isExpanded ? 'change-bar-2' : 'bar-2'} />
					<div className={isExpanded ? 'change-bar-3' : 'bar-3'} />
				</div>
				<div className={isExpanded ? 'expanded-menu' : 'expanded-menu-hidden'}>
					{isExpanded && (
						<>
							<NavLink
								className='expanded-link'
								to='/'>
								Home
							</NavLink>
							<NavLink
								className='expanded-link'
								to='/about'>
								About
							</NavLink>

							<NavLink
								className='expanded-link'
								to='/services'>
								Services
							</NavLink>
							<NavLink
								className='expanded-link'
								to='/contact'>
								Contact
							</NavLink>
							<NavLink
								className='expanded-link'
								to='/athletes'>
								Athletes
							</NavLink>
							<NavLink
								className='expanded-link'
								to='/myAccount'>
								My Account
							</NavLink>
						</>
					)}
				</div>
			</div>
		</MobileDiv>
	);
};

export const MobileDiv = styled.div`
	@media screen and ((max-width: ${MOBILE_MODE_LIMIT} )or (width: ${MOBILE_MODE_LIMIT})) {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		overflow: hidden;
		justify-content: start;
		position: relative;

		& > .logo-img {
			cursor: pointer;
			left: 0;
			height: 100%;
			aspect-ratio: 1/1;
			padding: 0 5px;
			filter: invert(1);
		}

		& > .logo-letters {
			cursor: pointer;
			height: 130%;
			aspect-ratio: 1/1;
			padding: 0 5px;
			filter: invert(1);
		}

		& > .nav-button {
			display: flex;
			flex: auto;
			justify-content: end;
			align-items: center;
			height: 45px;
			margin-right: 10px;

			& > .button-container {
				width: 35px;
				cursor: pointer;
				border-width: 3px;
				border-style: solid;
				border-color: #d2d2d2;
				border-radius: 10px;
				padding-left: 10px;
				padding-right: 10px;
				position: absolute;
				background-color: #333;
				padding-top: 4px;
				padding-bottom: 4px;

				&:active {
					transition: all 0.3s;
				}

				& > .bar-1,
				.bar-2,
				.bar-3 {
					width: 35px;
					height: 5px;
					background-color: #d2d2d2;
					margin: 6px 0;
					transition: 0.4s;
				}
			}

			& > .change-button-container {
				width: 35px;
				cursor: pointer;
				border-width: 3px;
				border-style: solid;
				border-color: #d2d2d2;
				border-radius: 10px;
				padding-left: 10px;
				padding-right: 10px;
				position: absolute;
				background-color: #333;
				padding-top: 4px;
				padding-bottom: 4px;

				& > .change-bar-1 {
					width: 35px;
					height: 5px;
					background-color: lightgray;
					margin: 6px 0;
					transform: translate(0, 11px) rotate(-45deg);
					transition: 0.6s;
				}

				& > .change-bar-2 {
					width: 35px;
					height: 5px;
					background-color: lightgray;
					margin: 6px 0;
					margin: 6px 0;
					opacity: 0;
				}

				& > .change-bar-3 {
					width: 35px;
					height: 5px;
					background-color: lightgray;
					margin: 6px 0;
					transform: translate(0, -11px) rotate(45deg);
					transition: 0.6s;
				}
			}

			& > .expanded-menu {
				display: flex;
				flex-direction: column;
				background-color: #333;
				border-width: 2px;
				border-color: #d2d2d2;
				border-style: solid;
				border-radius: 10px;
				z-index: 1;
				height: auto;
				width: 200px;
				position: fixed;
				right: 10px;
				top: 80px;

				& > .expanded-link {
					cursor: pointer;
					text-align: center;
					display: flex;
					justify-content: center;
					margin: 0.7ch 0;
					font-size: larger;
				}
			}

			& > .expanded-menu-hidden {
				height: 0px;
				transition: 0s all;
			}
		}
	}

	@media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
		display: none;
	}
`;
