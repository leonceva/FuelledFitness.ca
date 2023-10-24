import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AuthContext from "../context/AuthProvider";

const AdminDashboard = () => {
    const { auth } = useContext(AuthContext);
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const res = await axiosPrivate.get("/users", {
                    signal: controller.signal,
                });
                console.log(res.data.rows);
                isMounted && setUsers(res.data.rows);
            } catch (err) {
                console.log(
                    `Error:${err?.response?.status} ${err?.response?.data}`
                );
            }
        };

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h1>Admin Dashboard</h1>
            <br />
            <h2>Welcome {auth.userEmail}</h2>
            <br />
            <h4>User List:</h4>
            {users?.length ? (
                <ul>
                    {users.map((userObject, i) => (
                        <li
                            style={{ listStyle: "none" }}
                            key={i}
                        >{`${userObject.first_name} ${userObject.last_name} - ${userObject.email}`}</li>
                    ))}
                </ul>
            ) : (
                <p>No Users Found</p>
            )}
            <br />
        </>
    );
};

export default AdminDashboard;
