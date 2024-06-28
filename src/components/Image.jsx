import useImageOnLoad from '../hooks/useImageOnLoad';

const Image = ({ styleWrapper, styleImage, lowResSrc, highResSrc }) => {
	const { handleImageLoad, transitionStyles } = useImageOnLoad();

	const lowResStyle = { ...styleImage, ...transitionStyles.lowRes };
	const highResStyle = { ...styleImage, ...transitionStyles.highRes };

	return (
		<div style={styleWrapper}>
			<img
				src={lowResSrc}
				style={lowResStyle}
				alt='Low Res'
			/>
			<img
				src={highResSrc}
				style={highResStyle}
				alt='High Res'
				onLoad={handleImageLoad}
			/>
		</div>
	);
};

export default Image;
