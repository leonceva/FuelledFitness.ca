import styled from 'styled-components';
import instagram_logo from '../images/instagram-logo.png';
import linkedin_logo from '../images/linkedin-logo.png';
import { useState } from 'react';

const SocialMediaLink = (props) => {
	let size = props.size;
	const type = props.type;
	const hoverColor = props.hover;

	let type_logo;
	let type_url;
	let type_alt;

	switch (type) {
		case 'instagram':
			type_logo = instagram_logo;
			type_url = 'https://www.instagram.com/coach.krystin/';
			type_alt = 'Instagram Link';
			break;

		case 'linkedin':
			type_logo = linkedin_logo;
			type_url = 'https://www.linkedin.com/company/fuelled-fitness';
			type_alt = 'LinkedIn Link';
			break;

		default:
			size = '0px';
			break;
	}

	const [hoverStyle, setHoverStyle] = useState({});

	return (
		<a
			href={type_url}
			target='_blank'
			rel='noreferrer'
			onMouseEnter={() =>
				setHoverStyle({
					boxShadow: `0px 0px 10px 3px ${hoverColor}`,
					transition: '0.25s all',
				})
			}
			onMouseLeave={() => {
				setHoverStyle({});
			}}>
			<Img
				src={type_logo}
				alt={type_alt}
				style={{
					...{
						height: `${size}`,
						width: `${size}`,
						borderRadius: `${size}`,
						backgroundColor: '#f2f2f2',
					},
					...hoverStyle,
				}}
			/>
		</a>
	);
};

export const Img = styled.img`
	&:hover {
		transition: 0.25s all;
		box-shadow: 0px 0px 10px 3px #f2f2f2;
	}
`;

export default SocialMediaLink;
