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
    const [units, setUnits] = useState("kg");
    const [mobilityData, setMobilityData] = useState([]);
    const [strengthData, setStrengthData] = useState([]);
    const [conditioningData, setConditioningData] = useState([]);
    const [releaseDate, setReleaseDate] = useState(null);

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

    // To toggle between kg and lbs
    const handleUnitChange = () => {
        if (units === "kg") {
            setUnits("lbs");
        }
        if (units === "lbs") {
            setUnits("kg");
        }
    };

    // To add a mobility item
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

    // To add a strength item
    const addStrengthItem = () => {
        setStrengthData((prevData) => {
            return [
                ...prevData,
                { name: "", sets: "", reps: "", load: "", comment: "" },
            ];
        });
    };

    // To remove a strength item
    const removeStrengthItem = (index) => {
        const items = [...strengthData];
        items.splice(index, 1);
        setStrengthData(items);
    };

    // Handle strength item data change
    const handleStrengthChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...strengthData];
        list[index][name] = value;
        setStrengthData(list);
    };

    // To add a condtioning item
    const addConditioningItem = () => {
        setConditioningData((prevData) => {
            return [...prevData, { name: "", duration: "", comments: "" }];
        });
    };

    // To remove a conditioning item
    const removeConditioningItem = (index) => {
        const items = [...conditioningData];
        items.splice(index, 1);
        setConditioningData(items);
    };

    // Handle conditioning item data change
    const handleConditioningChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...conditioningData];
        list[index][name] = value;
        setConditioningData(list);
    };

    // Handle submit new program
    const handleSubmit = () => {
        console.log("submit");
        const programObject = {
            mobility: mobilityData,
            strength: strengthData,
            conditioning: conditioningData,
        };
        console.log(JSON.stringify(programObject));
    };

    // Handle release date change
    const handleReleaseChange = (e) => {
        const { value } = e.target;
        setReleaseDate(value);
    };

    // On render
    useEffect(() => {
        resetAll();
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // On selected user change
    useEffect(() => {
        setSearchValue("");
        setSearchIndex(null);
        setMobilityData([]);
        setStrengthData([]);
        setConditioningData([]);
    }, [selectedUser]);

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
                                <strong>{`${selectedUser[0]}`}</strong>
                            </span>
                            <div className="btn-container">
                                Add Item:
                                <button onClick={addMobilityItem}>
                                    Mobility
                                </button>
                                <button onClick={addStrengthItem}>
                                    Exercise
                                </button>
                                <button onClick={addConditioningItem}>
                                    Cardio
                                </button>
                                <div className="units">
                                    kg
                                    <div
                                        className="slider"
                                        onClick={handleUnitChange}
                                    >
                                        <div
                                            className={`circle ${
                                                units === "kg"
                                                    ? "left"
                                                    : "right"
                                            }`}
                                        />
                                    </div>
                                    lbs
                                </div>
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
                                                placeholder="Comments"
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
                                                <i className="bi bi-x-lg" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="category" id="strength">
                                <span className="title">
                                    <strong>Strength Training</strong>
                                </span>
                                {strengthData?.map((item, index) => {
                                    return (
                                        <div
                                            className="item-strength"
                                            id={`strength-${index}`}
                                        >
                                            <input
                                                type="text"
                                                name="name"
                                                id={`name-${index}-strength`}
                                                placeholder="Name"
                                                autoComplete="off"
                                                value={strengthData[index].name}
                                                onChange={(e) => {
                                                    handleStrengthChange(
                                                        e,
                                                        index
                                                    );
                                                }}
                                            />
                                            <input
                                                type="number"
                                                name="sets"
                                                id={`sets-${index}-strength`}
                                                placeholder="Sets"
                                                autoComplete="off"
                                                value={strengthData[index].sets}
                                                onChange={(e) => {
                                                    handleStrengthChange(
                                                        e,
                                                        index
                                                    );
                                                }}
                                            />
                                            <input
                                                type="number"
                                                name="reps"
                                                id={`reps-${index}-strength`}
                                                placeholder="Reps"
                                                autoComplete="off"
                                                value={strengthData[index].reps}
                                                onChange={(e) => {
                                                    handleStrengthChange(
                                                        e,
                                                        index
                                                    );
                                                }}
                                            />
                                            <input
                                                type="number"
                                                name="load"
                                                id={`load-${index}-strength`}
                                                placeholder="Load"
                                                autoComplete="off"
                                                value={strengthData[index].load}
                                                onChange={(e) => {
                                                    handleStrengthChange(
                                                        e,
                                                        index
                                                    );
                                                }}
                                            />
                                            <input
                                                type="text"
                                                name="comment"
                                                id={`comment-${index}-strength`}
                                                placeholder="Comments"
                                                autoComplete="off"
                                                value={
                                                    strengthData[index].comment
                                                }
                                                onChange={(e) => {
                                                    handleStrengthChange(
                                                        e,
                                                        index
                                                    );
                                                }}
                                            />
                                            <button
                                                onClick={() => {
                                                    removeStrengthItem(index);
                                                }}
                                            >
                                                <i className="bi bi-x-lg" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="category" id="conditioning">
                                <span className="title">
                                    <strong>Conditioning</strong>
                                </span>
                                {conditioningData?.map((item, index) => {
                                    return (
                                        <div
                                            className="item-conditioning"
                                            id={`conditioning-${index}`}
                                        >
                                            <input
                                                type="text"
                                                name="name"
                                                id={`name-${index}-conditioning`}
                                                placeholder="Name"
                                                autoComplete="off"
                                                value={
                                                    conditioningData[index].name
                                                }
                                                onChange={(e) =>
                                                    handleConditioningChange(
                                                        e,
                                                        index
                                                    )
                                                }
                                            />
                                            <input
                                                type="number"
                                                name="duration"
                                                id={`duration-${index}-conditioning`}
                                                placeholder="Time (min)"
                                                autoComplete="off"
                                                value={
                                                    conditioningData[index]
                                                        .duration
                                                }
                                                onChange={(e) =>
                                                    handleConditioningChange(
                                                        e,
                                                        index
                                                    )
                                                }
                                            />
                                            <input
                                                type="text"
                                                name="comment"
                                                id={`comment-${index}-conditioning`}
                                                placeholder="Comments"
                                                autoComplete="off"
                                                value={
                                                    conditioningData[index]
                                                        .comment
                                                }
                                                onChange={(e) =>
                                                    handleConditioningChange(
                                                        e,
                                                        index
                                                    )
                                                }
                                            />
                                            <button
                                                onClick={() => {
                                                    removeConditioningItem(
                                                        index
                                                    );
                                                }}
                                            >
                                                <i className="bi bi-x-lg" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="btn-container">
                        <div className="date">
                            Release On:
                            <input
                                type="date"
                                name="release-date"
                                value={releaseDate}
                                onChange={handleReleaseChange}
                                style={{ marginLeft: "1em" }}
                                pattern="\d{4}-\d{2}-\d{2}"
                            />
                        </div>
                        <button onClick={handleSubmit}>Submit</button>
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
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;

            & > .name {
                width: fit-content;
                text-align: left;
                padding-left: 5%;
            }

            & > .btn-container {
                flex: 1;
                display: flex;
                flex-direction: row;
                justify-content: end;
                align-items: center;
                margin-left: 5%;
                flex-wrap: wrap;

                & > .units {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding-right: 3em;
                    margin-top: 1em;

                    & > .slider {
                        width: 50px;
                        position: relative;
                        height: 1em;
                        border: 2px solid #333;
                        border-radius: 5px;
                        margin: 0 0.6em;
                        box-shadow: 2px 2px 2px #333;

                        &:hover {
                            cursor: pointer;
                        }
                        &:active {
                            box-shadow: 0px 0px 0px;
                            transform: translate(2px, 2px);
                        }

                        & > .circle {
                            height: 0.8em;
                            width: 0.8em;
                            background-color: #333;
                            border-radius: 0.8em;
                            position: absolute;
                        }
                        & > .left {
                            left: 0.1em;
                            transition: all 300ms;
                        }
                        & > .right {
                            transition: all 300ms;
                            left: calc(100% - 0.9em);
                        }
                    }
                }

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
                        width: calc(40% - 7.5em);
                    }
                    & > input[name="sets"] {
                        width: 5em;
                    }
                    & > input[name="reps"] {
                        width: 5em;
                    }
                    & > input[name="comment"] {
                        width: calc(60% - 7.5em);
                    }
                    & > button {
                        background-color: darkred;
                        border: 2px solid #333;
                        border-radius: 5px;
                        box-shadow: 2px 2px 2px #333;

                        &:hover {
                            background-color: red;
                            cursor: pointer;
                        }
                        &:active {
                            translate: 2px 2px;
                            box-shadow: 0 0 0;
                        }
                    }
                }

                & > .item-strength {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-evenly;
                    margin-bottom: 5px;

                    & > input[name="name"] {
                        width: calc(40% - 10em);
                    }
                    & > input[name="sets"] {
                        width: 5em;
                    }
                    & > input[name="reps"] {
                        width: 5em;
                    }
                    & > input[name="load"] {
                        width: 5em;
                    }
                    & > input[name="comment"] {
                        width: calc(60% - 10em);
                    }
                    & > button {
                        background-color: darkred;
                        border: 2px solid #333;
                        border-radius: 5px;
                        box-shadow: 2px 2px 2px #333;

                        &:hover {
                            background-color: red;
                            cursor: pointer;
                        }
                        &:active {
                            translate: 2px 2px;
                            box-shadow: 0 0 0;
                        }
                    }
                }

                & > .item-conditioning {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-evenly;
                    margin-bottom: 5px;

                    & > input[name="name"] {
                        width: calc(40% - 7.5em);
                    }
                    & > input[name="duration"] {
                        width: 11em;
                    }
                    & > input[name="comment"] {
                        width: calc(60% - 7.5em);
                    }
                    & > button {
                        background-color: darkred;
                        border: 2px solid #333;
                        border-radius: 5px;
                        box-shadow: 2px 2px 2px #333;

                        &:hover {
                            background-color: red;
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
