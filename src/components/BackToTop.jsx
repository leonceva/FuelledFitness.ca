import { useState } from 'react';
import { useEffect } from 'react';
import { styled } from 'styled-components';

function BackToTop() {
	const [showButton, setShowButton] = useState(false);

	const scrollUp = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};
	useEffect(() => {
		function handleScroll() {
			if (window.scrollY > 200) {
				setShowButton(true);
			} else {
				setShowButton(false);
			}
		}

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	return (
		<>
			{showButton && (
				<BackToTopBtn
					onTouchStart={() => {
						scrollUp();
					}}
					onClick={() => {
						scrollUp();
					}}>
					<i className='bi bi-chevron-double-up'></i>
				</BackToTopBtn>
			)}
		</>
	);
}

export const BackToTopBtn = styled.button`
	position: fixed;
	bottom: 2vh;
	right: 2vh;
	text-align: center;
	width: 58px;
	height: 58px;
	border: solid 2.5px #333;
	border-radius: 15%;
	font-size: 4vh;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	background-color: lightgray;
	box-shadow: 3px 3px 2px #333;

	&:active {
		translate: 3px 3px;
		box-shadow: 0 0;
		background-color: gray;
	}
`;

export default BackToTop;
