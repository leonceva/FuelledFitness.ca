import styled from "styled-components";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

const EditUser = () => {
    const axiosPrivate = useAxiosPrivate();
    const [users, setUsers] = useState(null);

    const getUsers = async () => {
        await axiosPrivate
            .get("/users")
            .then((res) => {
                console.log(res.data.rows);
                setUsers(res.data.rows);
            })
            .catch((res) => {
                alert(res);
            });
    };

    useEffect(() => {
        let isMounted = true;
        getUsers();
    }, []);

    return (
        <>
            <EditUserDiv>
                <h2>Edit Users</h2>
                <br />
                {users?.map((user, i) => (
                    <li key={i}>{user?.first_name}</li>
                ))}
            </EditUserDiv>
        </>
    );
};

export const EditUserDiv = styled.div`
    width: 100%;
    height: 100%;
`;

export default EditUser;
