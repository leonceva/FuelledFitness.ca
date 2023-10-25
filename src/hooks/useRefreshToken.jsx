import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    // console.log("Refreshing Token..");
    const refresh = async () => {
        const res = await axios.get("/refreshToken", {
            withCredentials: true,
        });

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
        return res.data.accessToken;
    };

    return refresh;
};

export default useRefreshToken;
