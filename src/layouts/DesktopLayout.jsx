import styled from 'styled-components';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE;

const DesktopLayout = (props) => {
	const content = props.content;
	return (
		<DesktopDiv>
			<div className='background' />
			<div className='content'>{content}</div>
		</DesktopDiv>
	);
};

export const DesktopDiv = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;

	// For tablet size
	@media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
		font-size: calc(min(2vw, 2vh));
		& h2 {
			font-size: calc(min(3.5vw, 3.5vh));
		}
		& h3 {
			font-size: calc(min(3vw, 3vh));
		}
	}

	// For monitor size
	@media screen and (min-width: ${'900px'}) {
		font-size: calc(min(2.5vw, 2.5vh));
		& h2 {
			font-size: calc(min(4vw, 4vh));
		}
		& h3 {
			font-size: calc(min(3vw, 3vh));
		}
	}

	// Hide for mobile size
	@media screen and (max-width: ${MOBILE_MODE_LIMIT}) {
		display: none;
	}

	& > .background {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		background-color: #d2d2d2;
	}

	& > .content {
		width: 85vw;
		max-width: 2000px;
		z-index: 1;
		position: relative;
		top: 0;
	}
`;

export default DesktopLayout;
