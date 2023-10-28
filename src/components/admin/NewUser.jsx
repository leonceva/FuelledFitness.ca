import { useState } from "react";
import styled from "styled-components";

const NewUser = () => {
    // Form data content
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
    });

    const handlesubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
    };

    const handleChange = (e) => {
        console.log("Change");
    };
    return (
        <>
            <NewUserDiv>
                <h3>Create New User</h3>
                <form action="" method="post" onSubmit={handlesubmit}>
                    <div className="input">
                        <label htmlFor="first-name">First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            id="first-name"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="last-name">Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            id="last-name"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="role">Role:</label>
                        <select name="role" id="role" required>
                            <option value="">Select the user type</option>
                            <option value="active">Active Client</option>
                            <option value="admin">Admin Account</option>
                            <option value="inactive">Inactive Client</option>
                        </select>
                    </div>
                    <button>Create User Account</button>
                </form>
            </NewUserDiv>
        </>
    );
};

export default NewUser;

export const NewUserDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    & > h3 {
        font-size: calc(min(3vw, 3vh));
        width: 100%;
        padding-top: 1vh;
        height: 20%;
    }

    & form {
        width: 100%;
        font-size: calc(min(2vw, 2vh));
        height: 60%;
        position: relative;

        & > .input {
            width: 100%;
            padding: 1vh 0;

            & > label {
                width: 20%;
                text-align: right;
                padding-right: 2vw;
            }

            & > input,
            select {
                width: 40%;
                height: 100%;
                padding: calc(min(0.5vh, 0.5vh)) 0;
            }
        }

        & button {
            margin-top: 3vh;
            position: absolute;
            left: 40%;
            background-color: #d0dceb;
            border: 2px solid #333;
            border-radius: 10px;
            padding: 1vh 2vw;
            color: #333;
            box-shadow: 3px 3px 2px #333;

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
