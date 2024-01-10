import styled from 'styled-components';

import loaderImg from '../../images/loader.svg';

const LoaderMobile = () => {
	return (
		<Loading>
			<h1>Loading..</h1>
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
	flex: 1;
	position: relative;
	height: auto;
	z-index: 3;
	background-color: lightgray;
	opacity: 0.5;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;

	& h1 {
		margin-top: 30%;
		font-stretch: expanded;
	}

	& > .loader {
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

export default LoaderMobile;
