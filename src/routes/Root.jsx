import { Outlet, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE_LIMIT;

const Root = () => {
	const { pathname } = useLocation();

	const [screenSize, setScreenSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

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
		<RootDiv>
			<div className='navbar'>
				<Navbar />
			</div>
			<div className='outlet'>
				<Outlet />
			</div>
			<div className={`rotate ${screenSize.width >= screenSize.height * 1.3 ? '' : 'hide'}`}>
				<p>
					Landscape mode is not supported on mobile. Please rotate your device back to
					portrait mode.
				</p>
			</div>
		</RootDiv>
	);
};

export const RootDiv = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	width: 100%;

	& > .navbar {
		width: 100vw;
		position: fixed;
		z-index: 9;
		height: 100px;
	}

	& > .outlet {
		position: relative;

		@media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
			height: calc(100vh - 100px);
			top: 100px;
			position: absolute;
			overflow-y: auto;
			width: 100%;
			left: 0%;
		}
		@media screen and (width: ${MOBILE_MODE_LIMIT}) {
			height: calc(100vh - 100px);
			top: 100px;
			position: absolute;
			overflow-y: auto;
			width: 100%;
			left: 0%;
		}
		@media screen and (max-width: ${MOBILE_MODE_LIMIT}) {
			height: calc(100vh - 100px);
			top: 100px;
		}
	}

	& > .rotate {
		@media screen and ((max-width: ${MOBILE_MODE_LIMIT} )or (width: ${MOBILE_MODE_LIMIT})) {
			position: fixed;
			z-index: 9;
			background-color: #d2d2d2;
			width: 100vw;
			height: calc(100vh - 100px);
			top: 100px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;

			& > p {
				width: calc(100% - 4ch);
				font-size: large;
			}
		}
		// Larger screen size
		@media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
			display: none;
		}
	}

	& > .hide {
		display: none;
	}
`;

export default Root;
