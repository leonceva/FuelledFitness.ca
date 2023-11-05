import { useState } from "react";
import styled from "styled-components";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const NewUser = () => {
    const axiosPrivate = useAxiosPrivate();

    // Form data content
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
    });

    const [formError, setFormError] = useState(null);

    const handlesubmit = (e) => {
        // Prevent default form behavior
        e.preventDefault();
        // Check valid inputs
        if (validateInputs()) {
            // Send Form data
            sendFormData();
        }
    };

    // Form input field change
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update form data
        setFormData((prevFormData) => {
            return { ...prevFormData, [name]: value };
        });
    };

    // Input validation
    const validateInputs = () => {
        // First name
        if (formData.firstName.length < 1 || formData.firstName.length > 50) {
            setFormError("Name must be between 1 and 50 characters");
            return false;
        }
        // Last name
        if (formData.lastName.length < 1 || formData.lastName.length > 50) {
            setFormError("Name must be between 1 and 50 characters");
            return false;
        }
        // Email
        if (
            !formData.email.match(
                // eslint-disable-next-line no-useless-escape
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
            setFormError("Invalid email");
            return false;
        }
        setFormError("");
        return true;
    };

    const sendFormData = async () => {
        await axiosPrivate
            .post("/users", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                role: formData.role,
            })
            .then((res) => {
                // Clear form data
                console.log("Success");
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    role: "",
                });
            })
            .catch(async (res) => {
                console.log(res.code);
                // If code is 403 -- JWT expired
            });
    };

    return (
        <>
            <NewUserDiv>
                <h3>Create New User</h3>
                <form action="" method="post" onSubmit={handlesubmit}>
                    <div
                        className={
                            formError === null ? "hide-error" : "show-error"
                        }
                    >
                        {formError}
                    </div>
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
                        <select
                            name="role"
                            id="role"
                            onChange={handleChange}
                            required
                        >
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
    justify-content: center;
    font-size: calc(min(2vw, 2vh));
    position: relative;

    & > h3 {
        font-size: calc(min(3vw, 3vh));
        width: 100%;
        padding-top: 1vh;
    }

    & form {
        width: 100%;
        max-height: 60%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;

        & > .show-error {
            width: 60%;
            text-align: end;
            color: red;
        }

        & > .hide-error {
            width: 60%;
            text-align: end;
            color: transparent;

            &::after {
                content: "test";
            }
        }

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
            background-color: #d0dceb;
            border: 2px solid #333;
            border-radius: 10px;
            padding: 1vh 2vw;
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
