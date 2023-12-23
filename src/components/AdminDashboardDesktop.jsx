import { useState } from "react";
import styled from "styled-components";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import NewUser from "./adminDesktop/NewUser";
import EditUser from "./adminDesktop/EditUser";
import NewProgram from "./adminDesktop/NewProgram";
import EditProgram from "./adminDesktop/EditProgram";

const AdminDashboardDesktop = (props) => {
    const { auth } = useAuth();
    const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;

    const logout = useLogout();
    const initialOptionState =
        JSON.parse(sessionStorage.getItem("optionSelected")) || "New Program";

    const [optionSelected, setOptionSelected] = useState(initialOptionState);

    const handleOption = (option) => {
        setOptionSelected(option);
        sessionStorage.setItem("optionSelected", JSON.stringify(option));
    };

    const firstName = decoded?.User?.firstName || null;
    const lastName = decoded?.User?.lastName || null;

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
                    {`${firstName} ${lastName}`}
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
                {optionSelected === "New Program" && <NewProgram />}
                {optionSelected === "Edit Program" && <EditProgram />}
                {optionSelected === "New User" && <NewUser />}
                {optionSelected === "Edit User" && <EditUser />}
            </div>
            <div className="version">v.Alpha 1</div>
        </DashboardDiv>
    );
};

const DashboardDiv = styled.div`
    width: 100%;
    height: 90%;
    border-radius: calc(min(3vw, 3vh));
    display: flex;
    flex-direction: row;
    position: relative;
    z-index: 1;

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

    & > .version {
        position: absolute;
        z-index: 3;
        background-color: inherit;
        left: calc(20% + 2px);
        top: calc(10 0% + 2px);
        font-size: calc(min(2vw, 2vh));
        padding-left: 1%;
    }
`;

export default AdminDashboardDesktop;
