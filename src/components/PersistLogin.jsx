import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const refresh = useRefreshToken();
	const { auth, persist } = useAuth();

	// On initial render
	useEffect(() => {
		let isMounted = true;

		const verifyRefreshToken = async () => {
			try {
				// Request /refreshToken and set a new access token to { auth }
				await refresh();
			} catch (err) {
				// If /refreshToken request failed
				// console.error(err);
			} finally {
				isMounted && setIsLoading(false);
			}
		};
		// Only if accessToken is empty then verify refresh token
		if (!auth?.accessToken && persist) {
			verifyRefreshToken();
		} else {
			setIsLoading(false);
		}

		return () => (isMounted = false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>{!persist ? children : isLoading ? <p>Loading...</p> : children}</>;
};

export default PersistLogin;
