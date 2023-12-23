import styled from "styled-components";
import Loader from "./Loader";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect, useRef } from "react";

const NewProgram = () => {
    const axiosPrivate = useAxiosPrivate();
    const [users, setUsers] = useState(null);
    const [selectedUser, setSelectedUser] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [searchIndex, setSearchIndex] = useState(null);
    const currentSearchIndex = useRef(searchIndex);
    const [awaiting, setAwaiting] = useState(false);
    const [mobilityData, setMobilityData] = useState([]);
    const [strengthData, setStrengthData] = useState([]);
    const [conditioningData, setConditioningData] = useState([]);

    const resetAll = () => {
        setSelectedUser("");
        setSearchValue("");
        setSearchIndex(null);
        setMobilityData([]);
        setStrengthData([]);
        setConditioningData([]);
    };

    // Handle change to the user search field
    const onChangeSearch = (e) => {
        setSearchValue(e.target.value);
        setSearchIndex(null);
    };

    // When pressed Enter in search, select top option as the user
    const onKeyDown = (e) => {
        // Get all the list elements from the search result
        const searchElements = document.querySelectorAll(".dropdown-row");
        const countSearchElements = searchElements.length;

        if (e.code === "Enter") {
            if (currentSearchIndex.current !== null) {
                // console.log(searchElements[currentSearchIndex.current]);
                searchElements[currentSearchIndex.current].click();
            }
        }
        if (e.code === "ArrowDown") {
            // Initial case
            if (searchIndex === null) {
                setSearchIndex(0);
                currentSearchIndex.current = 0;
            }
            // If reached the end at bottom, wrap around to index 0
            else if (searchIndex >= countSearchElements - 1) {
                setSearchIndex(0);
                currentSearchIndex.current = 0;
            }
            // Otherwise, add 1 to index
            else {
                setSearchIndex(currentSearchIndex.current + 1);
                currentSearchIndex.current++;
            }

            // Remove highlight from all list elements
            searchElements.forEach((element) => {
                element.classList.remove("hover");
            });
            // Highlight only current index element
            if (currentSearchIndex.current !== null) {
                // Remove hover class from all search li elements
                searchElements?.forEach((element) => {
                    element?.classList?.remove("hover");
                });
                // Add hover class to current index li element
                searchElements[currentSearchIndex.current]?.classList?.add(
                    "hover"
                );
            }
        }
        if (e.code === "ArrowUp") {
            // Initial case
            if (searchIndex === null) {
                setSearchIndex(countSearchElements - 1);
                currentSearchIndex.current = countSearchElements - 1;
            }
            // If reached the end at top, wrap around to last index
            else if (searchIndex <= 0) {
                setSearchIndex(countSearchElements - 1);
                currentSearchIndex.current = countSearchElements - 1;
            }
            // Otherwise, remove 1 to index
            else {
                setSearchIndex(currentSearchIndex.current - 1);
                currentSearchIndex.current--;
            }

            // Remove highlight from all list elements
            searchElements.forEach((element) => {
                element.classList.remove("hover");
            });
            // Highlight only current index element
            if (currentSearchIndex.current !== null) {
                // Remove hover class from all search li elements
                searchElements?.forEach((element) => {
                    element?.classList?.remove("hover");
                });
                // Add hover class to current index li element
                searchElements[currentSearchIndex.current]?.classList?.add(
                    "hover"
                );
            }
        }
    };

    // When a user is selected from the dropdown search results
    const onClick = (e) => {
        users.map((user) => {
            if (user[0] === e.target.innerHTML) {
                // console.log(`${user} matches`);
                setSelectedUser(user);
                setSearchValue("");
                setSearchIndex(null);
                return null;
            }
            return null;
        });
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

    // To add a Mobility item
    const addMobilityItem = () => {
        setMobilityData((prevData) => {
            return [...prevData, { name: "", sets: "", reps: "", comment: "" }];
        });
    };

    // To remove a mobility item
    const removeMobilityItem = (index) => {
        const items = [...mobilityData];
        items.splice(index, 1);
        setMobilityData(items);
    };

    // Handle mobility item data change
    const handleMobilityChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...mobilityData];
        list[index][name] = value;
        setMobilityData(list);
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
                                            id={`user-${i}`}
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
                            <div className="btn-container">
                                Add Item:
                                <button onClick={addMobilityItem}>
                                    Mobility
                                </button>
                                <button>Exercise</button>
                                <button>Cardio</button>
                            </div>
                        </div>
                        <div className="contents">
                            <div className="category" id="mobility">
                                <span className="title">
                                    <strong>Mobility</strong>
                                </span>
                                {mobilityData?.map((item, index) => {
                                    return (
                                        <div
                                            className="item-mobility"
                                            id={`mobility-${index}`}
                                        >
                                            <input
                                                type="text"
                                                name="name"
                                                id={`name-${index}-mobility`}
                                                placeholder="Name"
                                                autoComplete="off"
                                                value={mobilityData[index].name}
                                                onChange={(e) =>
                                                    handleMobilityChange(
                                                        e,
                                                        index
                                                    )
                                                }
                                            />
                                            <input
                                                type="number"
                                                name="sets"
                                                id={`sets-${index}-mobility`}
                                                placeholder="Sets"
                                                autoComplete="off"
                                                value={mobilityData[index].sets}
                                                onChange={(e) =>
                                                    handleMobilityChange(
                                                        e,
                                                        index
                                                    )
                                                }
                                            />
                                            <input
                                                type="number"
                                                name="reps"
                                                id={`reps-${index}-mobility`}
                                                placeholder="Reps"
                                                autoComplete="off"
                                                value={mobilityData[index].reps}
                                                onChange={(e) =>
                                                    handleMobilityChange(
                                                        e,
                                                        index
                                                    )
                                                }
                                            />
                                            <input
                                                type="text"
                                                name="comment"
                                                id={`comment-${index}-mobility`}
                                                placeholder="Comment"
                                                autoComplete="off"
                                                value={
                                                    mobilityData[index].comment
                                                }
                                                onChange={(e) =>
                                                    handleMobilityChange(
                                                        e,
                                                        index
                                                    )
                                                }
                                            />
                                            <button
                                                onClick={() => {
                                                    removeMobilityItem(index);
                                                }}
                                            >
                                                <i class="bi bi-x-lg"></i>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="category" id="strength">
                                <span className="title">
                                    <strong>Strength Training</strong>
                                </span>
                            </div>
                            <div className="category" id="conditioning">
                                <span className="title">
                                    <strong>Conditioning</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="btn-container">
                        <button>Submit</button>
                        <button
                            onClick={() => {
                                resetAll();
                            }}
                        >
                            Clear All
                        </button>
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
    overflow-y: auto;
    overflow-x: auto;

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
        margin-bottom: 2.5%;

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

                & > .hover {
                    background-color: lightgray;
                }
            }
        }
    }

    & > .new-program {
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;

        & > .header {
            width: 95%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;

            & > .btn-container {
                flex: 1;
                display: flex;
                flex-direction: row;
                justify-content: end;
                align-items: center;

                & > button {
                    margin: 0 2.5%;
                    background-color: #d0dceb;
                    border: 2px solid #333;
                    border-radius: 10px;
                    padding: 3px 8px;
                    color: #333;
                    box-shadow: 3px 3px 2px #333;
                    width: max-content;

                    &:hover {
                        background-color: #87ceeb;
                        cursor: pointer;
                    }
                    &:active {
                        translate: 3px 3px;
                        box-shadow: 0 0 0;
                    }
                }
            }
        }
        & > .contents {
            width: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;

            & > .category {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: start;
                align-items: center;
                margin: 5px 0;
                border: solid #333;
                border-width: 0 0 2px 0;

                & > .title {
                    width: 100%;
                    text-align: start;
                    align-self: start;
                    padding-left: 5%;
                }

                & > .item-mobility {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-evenly;
                    margin-bottom: 5px;

                    & > input[name="name"] {
                        width: calc(40% - 7em);
                    }
                    & > input[name="sets"] {
                        width: 5em;
                    }
                    & > input[name="reps"] {
                        width: 5em;
                    }
                    & > input[name="comment"] {
                        width: calc(60% - 7em);
                    }
                    & > button {
                        background-color: red;
                        border: 2px solid #333;
                        border-radius: 5px;
                        box-shadow: 2px 2px 2px #333;

                        &:hover {
                            background-color: darkred;
                            cursor: pointer;
                        }
                        &:active {
                            translate: 2px 2px;
                            box-shadow: 0 0 0;
                        }
                    }
                }
            }
        }
    }

    & > .btn-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        padding: 5px 0;

        & > button {
            background-color: #d0dceb;
            border: 2px solid #333;
            border-radius: 10px;
            padding: 3px 8px;
            color: #333;
            box-shadow: 3px 3px 2px #333;
            width: max-content;

            &:hover {
                background-color: #87ceeb;
                cursor: pointer;
            }
            &:active {
                translate: 3px 3px;
                box-shadow: 0 0 0;
            }
        }
    }
`;
