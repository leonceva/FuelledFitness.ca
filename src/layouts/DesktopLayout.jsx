import { styled } from 'styled-components';
import Footer from '../components/Footer';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE_LIMIT;

export const DesktopLayout = (props) => {
	const content = props.content;

	return (
		<DesktopContainer>
			<div className='desktop-row'>
				<DesktopLeftSide />
				<DesktopContent>{content}</DesktopContent>
				<DesktopRightSide />
			</div>
			<Footer />
		</DesktopContainer>
	);
};

export default DesktopLayout;

export const DesktopContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	position: relative;

	& > .desktop-row {
		display: flex;
		flex-direction: row;
		height: 95%;
		align-items: center;
	}
	@media screen and (max-width: ${MOBILE_MODE_LIMIT}) {
		display: none;
	}
`;

export const DesktopLeftSide = styled.div`
	background-image: linear-gradient(to right, gray, #f0e9df);
	height: 100%;
	width: 10%;
`;
export const DesktopRightSide = styled.div`
	background-image: linear-gradient(to left, gray, #f0e9df);
	height: 100%;
	width: 10%;
`;

export const DesktopContent = styled.div`
	background-color: #f0e9df;
	height: 100%;
	width: 80%;
	text-align: center;
`;
