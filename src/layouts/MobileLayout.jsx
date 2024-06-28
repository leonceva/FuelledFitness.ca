import styled from 'styled-components';
import BackToTop from '../components/BackToTop';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE_LIMIT;

const MobileLayout = (props) => {
	const content = props.content;
	return (
		<MobileDiv>
			<div className='background' />
			<div className='content'>{content}</div>
			<BackToTop />
		</MobileDiv>
	);
};

export default MobileLayout;

export const MobileDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	width: 100vw;

	& > .background {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		background-color: #d2d2d2;
	}

	& > .content {
		width: 100vw;
		z-index: 1;
		position: relative;
		top: 0;
	}

	// Hide for desktop size
	@media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
		display: none;
	}
`;
