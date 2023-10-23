import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        await axios
            .get("http://localhost:8080/refreshToken", {
                withCredentials: true,
            })
            .then((res) => {
                setAuth((prev) => {
                    // console.log(`Previous state"\n${JSON.stringify(prev)}`);
                    // console.log(`New Access Token:\n${res.data.accessToken}`);
                    return {
                        ...prev,
                        email: res.data.email,
                        userType: res.data.userType,
                        accessToken: res.data.accessToken,
                    };
                });
                return res.data.userAccessToken;
            })
            .catch((res) => {
                console.log("Error: " + res);
            });
    };

    return refresh;
};

export default useRefreshToken;
