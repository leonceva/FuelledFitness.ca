import { useState } from "react";
import styled from "styled-components";
import NewUser from "./admin/NewUser";
import useLogout from "../hooks/useLogout";

const AdminDashboardDesktop = (props) => {
    const user = props.user;
    const logout = useLogout();
    const initialOptionState =
        JSON.parse(sessionStorage.getItem("optionSelected")) || null;

    const [optionSelected, setOptionSelected] = useState(initialOptionState);

    const handleOption = (option) => {
        setOptionSelected(option);
        sessionStorage.setItem("optionSelected", JSON.stringify(option));
    };

    return (
        <DashboardDiv>
            <div className="sidebar">
                <div
                    className="login-info"
                    onClick={() => {
                        handleOption(null);
                    }}
                >
                    Logged in as:
                    <br />
                    {`${user.firstName} ${user.lastName}`}
                </div>
                <div className="options">
                    <span
                        onClick={() => {
                            handleOption("New Program");
                        }}
                    >
                        New Program
                    </span>
                    <span
                        onClick={() => {
                            handleOption("Edit Program");
                        }}
                    >
                        Edit Programs
                    </span>
                    <span
                        onClick={() => {
                            handleOption("New User");
                        }}
                    >
                        New User
                    </span>
                    <span
                        onClick={() => {
                            handleOption("Edit User");
                        }}
                    >
                        Edit Users
                    </span>
                </div>
                <div className="logout" onClick={async () => await logout()}>
                    <span>Logout</span>
                    <i className="bi bi-box-arrow-right"></i>
                </div>
            </div>
            <div className="content">
                {optionSelected === "New User" && <NewUser />}
            </div>
        </DashboardDiv>
    );
};

const DashboardDiv = styled.div`
    width: 100%;
    height: 90%;
    border-radius: calc(min(3vw, 3vh));
    display: flex;
    flex-direction: row;

    & > .sidebar {
        width: 20%;
        height: 100%;
        background-color: #333;
        border: 2px solid #333;
        border-top-left-radius: calc(min(3vw, 3vh));
        border-bottom-left-radius: calc(min(3vw, 3vh));
        display: flex;
        flex-direction: column;
        color: #d0dceb;

        & > .login-info {
            height: 15%;
            width: 100%;
            margin-top: calc(min(3vw, 3vh));
            font-size: calc(min(2.5vw, 2.5vh));
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;

            &:hover {
                cursor: pointer;
                box-shadow: 0px 2px #d0dceb, 0px -2px #d0dceb;
            }
        }

        & > .options {
            height: 80%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;
            font-size: calc(min(2.5vw, 2.5vh));

            & :hover {
                cursor: pointer;
                box-shadow: 0px 2px #d0dceb, 0px -2px #d0dceb;
            }

            & span {
                padding: 10% 0;
                width: 100%;

                &:hover {
                    cursor: pointer;
                }
            }
        }

        & > .logout {
            justify-self: end;
            padding: 0.5vh 0 1vh;
            width: 100%;
            display: flex;
            flex-direction: row;
            margin-bottom: calc(min(3vw, 3vh));
            font-size: calc(min(2.5vw, 2.5vh));

            & span {
                width: 70%;
                text-align: center;
            }
            & i {
                width: 30%;
                text-align: center;
            }

            &:hover {
                cursor: pointer;
                box-shadow: 0px 2px #d0dceb, 0px -2px #d0dceb;
            }
        }
    }

    & > .content {
        width: 80%;
        height: 100%;
        background-color: #d0dceb;
        border: 2px solid #333;
        border-top-right-radius: calc(min(3vw, 3vh));
        border-bottom-right-radius: calc(min(3vw, 3vh));
    }
`;

export default AdminDashboardDesktop;
