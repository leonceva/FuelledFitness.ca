import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AuthContext from "../context/AuthProvider";

const AdminDashboard = () => {
    const { auth } = useContext(AuthContext);
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const [count, setCount] = useState(0);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            console.log("Getting all users..");
            try {
                const res = await axiosPrivate.get("/users", {
                    signal: controller.signal,
                });

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
    }, [count]);

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
                    <br />
                    {count}
                    <br />
                    <button onClick={() => setCount(count + 1)}>Test</button>
                    <br />
                </ul>
            ) : (
                <>
                    <p>No Users Found</p>
                    <button onClick={() => setCount(count + 1)}>Test</button>
                </>
            )}
            <br />
        </>
    );
};

export default AdminDashboard;
