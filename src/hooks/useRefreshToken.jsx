import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const refresh = async () => {
		const res = await axios.get('/refreshToken', {
			withCredentials: true,
		});

		console.log(res);

		setAuth((prev) => {
			return {
				...prev,
				email: res.data.email,
				userType: res.data.userType,
				accessToken: res.data.accessToken,
			};
		});
		return res.data.accessToken;
	};

	return refresh;
};

export default useRefreshToken;
