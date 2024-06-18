import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const PersistLoginInfo = () => {
	const [display, setDisplay] = useState(false);
	return (
		<PersistLoginInfoDiv className='persist-info'>
			<i
				onMouseEnter={() => setDisplay(true)}
				onMouseLeave={() => setDisplay(false)}
				className='bi bi-info-circle'></i>
			<div className={`${display ? 'show' : 'hidden'}`}></div>
		</PersistLoginInfoDiv>
	);
};
export const PersistLoginInfoDiv = styled.div`
	margin-left: 0.5vw;
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: start;
	align-items: center;

	& > .show {
		position: absolute;
		border: 2px solid black;
		left: 100%;
		margin-left: 1ch;
		height: fit-content;
		background-color: white;
		color: black;
		z-index: 2;
		animation-name: show-info;
		animation-duration: 1s;
		animation-fill-mode: forwards;
		padding: 1ch;
		min-width: 150px;
		width: auto;

		&::after {
			content: 'Only recommended for trusted devices';
		}

		@keyframes show-info {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}
	}

	& > .hidden {
		content-visibility: hidden;
	}
`;

export default PersistLoginInfo;
