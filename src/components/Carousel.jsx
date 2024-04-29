import { useState, useRef, useEffect } from 'react';
import Image from './Image';

const Carousel = (props) => {
	let lowRes = props.lowRes;
	let highRes = props.highRes;
	const [imgNumber, setImgNumber] = useState(1);
	let current_num = useRef(imgNumber);
	let timerID = useRef(null);

	const NUMBER_IMAGES = props.length;

	let img_src_highRes, img_src_lowRes, img_alt;

	for (let i = 0; i < NUMBER_IMAGES; i++) {
		if (i + 1 === imgNumber) {
			img_src_highRes = highRes[i];
			img_src_lowRes = lowRes[i];
			img_alt = `Carousel image #${i}`;
		}
	}

	const handleClick = (side) => {
		if (side === 'left') {
			if (imgNumber > 1) {
				setImgNumber(imgNumber - 1);
				current_num.current--;
			} else {
				setImgNumber(NUMBER_IMAGES);
				current_num.current = NUMBER_IMAGES;
			}
			clearInterval(timerID.current);
		}
		if (side === 'right') {
			if (imgNumber < NUMBER_IMAGES) {
				setImgNumber(imgNumber + 1);
				current_num.current++;
			} else {
				setImgNumber(1);
				current_num.current = 1;
			}
		}
		clearInterval(timerID.current);
	};

	useEffect(() => {
		timerID.current = setInterval(() => {
			current_num.current < NUMBER_IMAGES ? current_num.current++ : (current_num.current = 1);
			setImgNumber(current_num.current);
		}, 5000);

		return () => clearInterval(timerID.current);
	}, [imgNumber, NUMBER_IMAGES]);

	const styleWrapperCarousel = {
		position: 'absolute',
		width: '100%',
		height: '100%',
		overflowX: 'hidden',
		overflowY: 'hidden',
	};

	const styleImageCarousel = {
		position: 'absolute',
		width: 'auto',
		height: 'auto',
		maxHeight: '100%',
		maxWidth: '125%',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		zIndex: '2',
		animation: 'fadein 1s',
	};

	return (
		<>
			<div className='img-div'>
				<Image
					className='carousel-img'
					styleWrapper={styleWrapperCarousel}
					styleImage={styleImageCarousel}
					lowResSrc={img_src_lowRes}
					highResSrc={img_src_highRes}
					alt={img_alt}
				/>
				<div
					className='left'
					onClick={() => {
						handleClick('left');
					}}>
					<i
						className='bi bi-chevron-double-left'
						style={{ fontSize: '25px' }}
					/>
				</div>
				<div
					className='right'
					onClick={() => {
						handleClick('right');
					}}>
					<i
						className='bi bi-chevron-double-right'
						style={{ fontSize: '25px' }}
					/>
				</div>
				<img
					className='background'
					src={img_src_lowRes}
					alt='Carousel Background'
				/>
			</div>
		</>
	);
};

export default Carousel;
