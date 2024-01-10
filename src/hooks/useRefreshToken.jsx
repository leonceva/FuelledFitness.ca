import axios from '../api/axios';
import useAuth from './useAuth';
import useLogout from './useLogout';

const useRefreshToken = () => {
	const { auth, setAuth } = useAuth();
	const logout = useLogout();

	const refresh = async () => {
		const res = await axios
			.get('/refreshToken', {
				withCredentials: true,
				params: { email: auth?.userEmail },
			})
			.catch(async (err) => {
				console.log('Refresh token error');
				await logout();
				return null;
			});

		setAuth((prev) => {
			return {
				...prev,
				email: res?.data?.email,
				userType: res?.data?.userType,
				accessToken: res?.data?.accessToken,
			};
		});
		return res?.data?.accessToken;
	};

	return refresh;
};

export default useRefreshToken;
