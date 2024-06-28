import no_img from '../images/athletes/no-img.jpg';
import Image from '../components/Image';

const AthleteCard = (props) => {
	const athlete = props.athlete;
	const styleWrapper = props.styleWrapper;
	const styleImage = props.styleImage;
	const lowResSrc = props.lowResSrc || no_img;
	const highResSrc = props.highResSrc || no_img;

	return (
		<div
			className='athlete-card'
			id={athlete.id}>
			<h2>{athlete.name}</h2>
			<Image
				styleWrapper={styleWrapper}
				styleImage={styleImage}
				lowResSrc={lowResSrc}
				highResSrc={highResSrc}
			/>
		</div>
	);
};

export default AthleteCard;
