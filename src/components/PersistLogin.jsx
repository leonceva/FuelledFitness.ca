import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";

const PersistLogin = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth;

    // On initial render
    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                // Request /refreshToken and set a new access token to { auth }
                await refresh();
            } catch (err) {
                // If /refreshToken request failed
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        // Only if accessToken is empty then verify refresh token
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // console.log(`isLoading: ${isLoading}`);
        // console.log(`Access Token: ${JSON.stringify(auth?.accessToken)}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    return (
        <>{!persist ? children : isLoading ? <p>Loading...</p> : children}</>
    );
};

export default PersistLogin;
