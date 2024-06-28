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
	bottom: 5px;
	right: 5px;
	text-align: center;
	width: 55px;
	height: 55px;
	border: solid 3px black;
	border-radius: 15%;
	font-size: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	background-color: #d2d2d2;
	z-index: 9;

	&:active {
		translate: 3px 3px;
		background-color: #a0a0a0;
	}
`;

export default BackToTop;
