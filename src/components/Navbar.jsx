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
		</>
	);
};

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

export default Navbar;
