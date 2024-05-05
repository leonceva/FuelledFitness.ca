import styled from 'styled-components';
import { useRouteError, useNavigate } from 'react-router-dom';
import DesktopLayout from '../layouts/DesktopLayout';

const ErrorPage = () => {
	const error = useRouteError();
	console.log(error);
	return (
		<>
			<DesktopLayout content={<DesktopContent error={error} />} />
		</>
	);
};

export default ErrorPage;

/************************************************************* DESKTOP MODE ****************************************************************************/

export const DesktopContent = (props) => {
	const error = props.error;
	const navigate = useNavigate();

	return (
		<DesktopDiv>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<strong>{error.status !== null ? `Error ${error.status}: ` : ''}</strong>
				<i>{error.statusText || error.message}</i>
			</p>
			<button
				className='btn'
				onClick={() => navigate('/')}>
				Back to Home
			</button>
		</DesktopDiv>
	);
};

export const DesktopDiv = styled.div`
	width: 100%;
	min-height: calc(100vh - 100px);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
