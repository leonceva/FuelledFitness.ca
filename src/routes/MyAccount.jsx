import styled from 'styled-components';
import DesktopLayout from '../layouts/DesktopLayout';

const MyAccount = () => {
	return (
		<>
			<DesktopLayout content={<DesktopContent />} />
		</>
	);
};

export default MyAccount;

/************************************************************* DESKTOP MODE ****************************************************************************/
export const DesktopContent = () => {
	return <DesktopDiv></DesktopDiv>;
};

export const DesktopDiv = styled.div``;
