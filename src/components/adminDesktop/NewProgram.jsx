import styled from "styled-components";
import Loader from "./Loader";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";

const NewProgram = () => {
    const axiosPrivate = useAxiosPrivate();
    const [users, setUsers] = useState(null);
    const [selectedUser, setSelectedUser] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [awaiting, setAwaiting] = useState(false);

    const resetAll = () => {
        setSelectedUser("");
        setSearchValue("");
    };

    // Handle change to the user search field
    const onChangeSearch = (e) => {
        setSearchValue(e.target.value);
    };

    // When pressed Enter in search, select top option as the user
    const onKeyDown = (e) => {
        if (e.code === "Enter") {
            const firstUser = e.target.nextSibling?.firstChild || null;
            // console.log(firstUser);
            if (firstUser) {
                users.map((user) => {
                    if (
                        user[1].toString() ===
                        e.target.nextSibling.firstChild.id
                    ) {
                        setSelectedUser(user);
                        setSearchValue("");
                        return null;
                    }
                    return null;
                });
            }
        }
    };

    // When a user is selected from the dropdown search results
    const onClick = (e) => {
        users.map((user) => {
            // console.log(user);
            if (user[1]?.toString() === e.target.id) {
                setSelectedUser(user);
                setSearchValue("");
                return null;
            }
            return null;
        });
    };

    // To prevent submit on Enter
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    // Get an array of all the users in the database
    const getUsers = async () => {
        setAwaiting(true);
        await axiosPrivate
            .get("/users")
            .then((res) => {
                setUsers(
                    res?.data?.rows?.map((user, i) => {
                        //console.log(res.data.rows);
                        return [
                            user.last_name + ", " + user.first_name,
                            user.user_id,
                            user.email,
                            user.user_type,
                        ];
                    })
                );
            })
            .catch((res) => {
                alert(res);
            })
            .finally(() => {
                setAwaiting(false);
            });
    };

    useEffect(() => {
        resetAll();
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <NewProgramDiv>
            {awaiting && <Loader />}
            <h3>Create New Program</h3>
            <div className="search">
                <label htmlFor="search">User:</label>
                <div className="search-results">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        onChange={onChangeSearch}
                        value={searchValue}
                        onKeyDown={onKeyDown}
                        placeholder="Type a name to begin search"
                    />
                    {searchValue && (
                        <div className="dropdown">
                            {users
                                ?.filter((user) => {
                                    return user[0]
                                        .toLowerCase()
                                        .includes(searchValue.toLowerCase());
                                })
                                .slice(0, 10)
                                .sort()
                                .map((user, i) => {
                                    return (
                                        <li
                                            id={user[1]}
                                            key={user[1]}
                                            className="dropdown-row"
                                            onClick={onClick}
                                        >
                                            {user[0]}
                                        </li>
                                    );
                                })}
                        </div>
                    )}
                </div>
            </div>
            {selectedUser !== "" && (
                <>
                    <div className="new-program">
                        <div className="header">
                            <span className="name">
                                <strong>{`Selected User: ${selectedUser[0]}`}</strong>
                            </span>
                        </div>
                        <div className="mobility"></div>
                        <div className="exercise"></div>
                        <div className="conditioning"></div>
                    </div>
                    <div className="btn-container">
                        <button>Submit</button>
                        <button>Clear All</button>
                    </div>
                </>
            )}
        </NewProgramDiv>
    );
};

export default NewProgram;

export const NewProgramDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    font-size: calc(min(2vw, 2vh));
    position: relative;

    & > h3 {
        font-size: calc(min(3vw, 3vh));
        width: 100%;
        padding: 1vh 0;
        margin-top: 5%;
    }

    & > .search {
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 5%;

        & label {
            width: 20%;
            text-align: end;
            padding-right: 2vw;
        }

        & > .search-results {
            width: 50%;
            display: flex;
            flex-direction: column;
            position: relative;

            & > input {
                width: 100%;
            }

            & > .dropdown {
                width: 100%;
                background-color: white;
                border: solid 1px #333;
                position: absolute;
                top: 100%;
                z-index: 2;

                & > .dropdown-row {
                    list-style: none;
                    padding: 0.5vh 0;

                    &:hover {
                        cursor: pointer;
                        background-color: lightgray;
                    }
                }
            }
        }
    }

    & > .new-program {
        width: 100%;
        background-color: red;
        flex: 1;
    }
`;
