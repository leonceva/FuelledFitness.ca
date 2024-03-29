import { styled } from 'styled-components';

const MOBILE_MODE_LIMIT = `892px`;

const Footer = () => {
	return <FooterDiv />;
};

export const FooterDiv = styled.div`
	background-image: linear-gradient(to left, #d0dceb, #87ceeb);
	display: flex;
	justify-content: start;
	align-items: center;
	justify-content: center;
	width: 100%;
	border: solid #333;
	border-width: 2px 0 0 0;

	// For Mobile
	@media screen and (max-width: ${MOBILE_MODE_LIMIT}) {
		height: 4vh;
	}

	// For Desktop
	@media screen and (min-width: ${MOBILE_MODE_LIMIT}) {
		height: 5%;
	}
`;

export default Footer;
