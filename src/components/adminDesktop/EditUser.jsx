import styled from "styled-components";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const EditUser = () => {
    const axiosPrivate = useAxiosPrivate();
    const [users, setUsers] = useState(null);
    const [selectedUser, setSelectedUser] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [hasChanged, setHasChanged] = useState(false);
    const [selectedDelete, setSelectedDelete] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [awaiting, setAwaiting] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
    });

    const resetAll = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            role: "",
        });
        setSelectedUser("");
        setSearchValue("");
        setHasChanged(false);
        setSelectedDelete(false);
        const changedElements = document.querySelectorAll("#changed");
        changedElements.forEach((element) => {
            element.remove();
        });
        document.getElementById("firstName").disabled = true;
        document.getElementById("lastName").disabled = true;
        document.getElementById("email").disabled = true;
        document.getElementById("role").disabled = true;
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
                        document.getElementById("firstName").disabled = false;
                        document.getElementById("lastName").disabled = false;
                        document.getElementById("email").disabled = false;
                        document.getElementById("role").disabled = false;
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
            console.log(user);
            if (user[1]?.toString() === e.target.id) {
                setSelectedUser(user);
                setSearchValue("");
                document.getElementById("firstName").disabled = false;
                document.getElementById("lastName").disabled = false;
                document.getElementById("email").disabled = false;
                document.getElementById("role").disabled = false;
                return null;
            }
            return null;
        });
    };

    // When the user data is submitted for changes
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    // Get an array of all the users in the database
    const getUsers = async () => {
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
            });
    };

    // Handle change to the user data form
    const handleChangeForm = (e) => {
        const changeSign = document.createElement("i");
        changeSign.classList.add("bi");
        changeSign.classList.add("bi-exclamation-circle");
        changeSign.classList.add("changed");
        changeSign.setAttribute("id", "changed");

        e.target.previousSibling.insertAdjacentElement(
            "beforebegin",
            changeSign
        );

        const { name, value } = e.target;
        // Update form data
        setFormData((prevFormData) => {
            return { ...prevFormData, [name]: value };
        });
        setHasChanged(true);
    };

    // When an user is selected, get the details from the database
    useEffect(() => {
        setSelectedDelete(false);
        setHasChanged(false);
        //
        if (selectedUser !== "") {
            const firstName = selectedUser[0].slice(
                selectedUser[0].indexOf(",") + 2
            );
            const lastName = selectedUser[0].slice(
                0,
                selectedUser[0].indexOf(",")
            );
            const userEmail = selectedUser[2];
            const userType = selectedUser[3];

            setFormData({
                firstName: firstName,
                lastName: lastName,
                email: userEmail,
                role: userType,
            });

            // console.log(`First Name: ${firstName}\nLast Name: ${lastName}\nUser ID: ${userId}\nEmail: ${userEmail}`);
        }
    }, [selectedUser]);

    // Update user records in database
    const handleApplyChanges = () => {
        console.log("Applied Changes");
        const changedElements = document.querySelectorAll("#changed");
        changedElements.forEach((element) => {
            element.remove();
        });
        // TODO

        setHasChanged(false);
    };

    // Delete user from database
    const handleDelete = () => {
        // TODO
        console.log("Deleted");
        resetAll();
    };

    useEffect(() => {
        resetAll();
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <EditUserDiv>
                {awaiting && <Loader />}
                <h3>Edit Users</h3>
                <div className="search">
                    <label htmlFor="search">User:</label>
                    <div className="search-results">
                        <input
                            type="text"
                            name="user"
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
                                            .includes(
                                                searchValue.toLowerCase()
                                            );
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
                <br />
                <form action="" method="put" onSubmit={handleSubmit}>
                    <div className="input">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            onChange={handleChangeForm}
                            required
                            value={formData.firstName}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            onChange={handleChangeForm}
                            required
                            value={formData.lastName}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleChangeForm}
                            required
                            value={formData.email}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="role">User Type</label>
                        <select
                            name="role"
                            id="role"
                            onChange={handleChangeForm}
                            required
                            value={formData.role}
                        >
                            <option name="role" value="">
                                ---
                            </option>
                            <option name="role" value="active">
                                Active Client
                            </option>
                            <option name="role" value="inactive">
                                Inactive Client
                            </option>
                            <option name="role" value="admin">
                                Admin Account
                            </option>
                        </select>
                    </div>
                </form>
                <div className="btn-container">
                    <button
                        className={`${hasChanged ? "enabled" : "disabled"}`}
                        onClick={handleApplyChanges}
                    >
                        Apply Changes
                    </button>
                    <button
                        onClick={() => {
                            resetAll();
                        }}
                    >
                        Clear Form
                    </button>
                    <button
                        className={`delete ${
                            selectedUser ? "enabled" : "disabled"
                        }`}
                        onClick={() => {
                            setSelectedDelete(true);
                        }}
                    >
                        Delete User
                    </button>
                </div>
                {selectedDelete && (
                    <div className="btn-container">
                        <p>This cannot be undone, continue?</p>
                        <button onClick={handleDelete}>Yes</button>
                        <button
                            onClick={() => {
                                setSelectedDelete(false);
                            }}
                        >
                            No
                        </button>
                    </div>
                )}
            </EditUserDiv>
        </>
    );
};

export const EditUserDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    font-size: calc(min(2vw, 2vh));
    z-index: 1;

    & > h3 {
        font-size: calc(min(3vw, 3vh));
        width: 100%;
        padding: 1vh 0;
    }

    & > .search {
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: center;

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

    & form {
        width: 100%;
        max-height: 60%;

        & > .input {
            width: 100%;
            padding: 0.5vh 0;
            position: relative;

            & > .changed {
                position: absolute;
                height: 100%;
                display: flex;
                align-items: center;
                left: 80%;
                padding-left: 0.5vw;
                justify-content: end;
                font-size: calc(min(2.5vw, 2.5vh));
            }

            & label {
                width: 20%;
                text-align: right;
                padding-right: 2vw;
            }

            & input,
            select {
                width: 40%;
                height: 100%;
                padding: calc(min(0.5vh, 0.5vh)) 0;
            }
        }
    }

    & > .btn-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        justify-self: flex-end;
        align-items: center;
        text-align: center;

        & button {
            margin: 2vh 2vw 0;
            border: 2px solid #333;
            border-radius: 10px;
            padding: 1vh 2vw;
            color: #333;
            box-shadow: 3px 3px 2px #333;
            width: max-content;
            background-color: #d0dceb;

            &:hover {
                cursor: pointer;
                background-color: #87ceeb;
            }
            &:active {
                translate: 3px 3px;
                box-shadow: 0 0 0;
            }
        }

        & > .enabled {
        }

        & > .disabled {
            background-color: grey;
            cursor: not-allowed;
            pointer-events: none;
        }

        & > .delete {
            background-color: #ff6666;
            font-weight: bold;

            &:hover {
                background-color: red;
            }
        }

        & > p {
            margin-top: 2vh;
            padding-top: 1vh;
            height: 100%;
            max-width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: end;
        }
    }
`;

export default EditUser;
