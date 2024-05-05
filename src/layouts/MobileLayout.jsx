import styled from 'styled-components';
import BackToTop from '../components/BackToTop';

const MOBILE_MODE_LIMIT = process.env.REACT_APP_MOBILE_MODE_LIMIT;

const MobileLayout = (props) => {
	const content = props.content;
	return (
		<MobileDiv>
			<div className='mobile-content'>{content}</div>
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

	@media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
		display: none;
	}
`;
