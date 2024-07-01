import styled from 'styled-components';

import loaderImg from '../../images/loader.svg';

const Loader = () => {
	return (
		<Loading>
			<h1>Loading</h1>
			<img
				className='loader'
				alt='loader'
				src={loaderImg}
			/>
		</Loading>
	);
};

export const Loading = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 3;
	background-color: lightgray;
	opacity: 0.7;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	& h1 {
		font-stretch: expanded;
		color: black;
		font-size: 30px;
		padding: 0;
		margin-right: 1ch;
	}

	& > .loader {
		width: 50px;
		height: 50px;
		font-size: x-large;
		animation-name: spin;
		animation-duration: 1.5s;
		animation-delay: 0s;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}
	@keyframes spin {
		0% {
			transform: rotate(0turn);
		}
		25% {
			transform: rotate(0.25turn);
		}
		50% {
			transform: rotate(0.5turn);
		}
		75% {
			transform: rotate(0.75turn);
		}
		100% {
			transform: rotate(1turn);
		}
	}
`;

export default Loader;
