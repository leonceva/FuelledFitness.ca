import instagram_logo from '../images/instagram-logo.png';

const InstagramLink = (props) => {
	const width = props.width;
	const height = props.height;
	return (
		<>
			<div className='image pt-1 pb-1'>
				<a href='https://www.instagram.com/fuelledfitness.ca'>
					<img
						src={instagram_logo}
						alt='Instagram Logo'
						className='link-logo'
						style={{ width: width, height: height }}
					/>
				</a>
			</div>
		</>
	);
};

export default InstagramLink;
