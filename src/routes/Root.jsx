import { Outlet, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE;

const Root = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<RootDiv>
			<div className='navbar'>
				<Navbar />
			</div>
			<div className='outlet'>
				<Outlet />
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
			height: calc(100vh - 150px);
			top: 100px;
		}
		@media screen and (width: ${MOBILE_MODE_LIMIT}) {
			height: calc(100vh - 100px);
			top: 100px;
		}
		@media screen and (max-width: ${MOBILE_MODE_LIMIT}) {
			height: calc(100vh - 100px);
			top: 100px;
		}
	}
`;

export default Root;
