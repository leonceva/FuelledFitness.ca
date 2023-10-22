import styled from "styled-components";
import google_logo from "../images/g-logo.png";
import { useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import { useContext } from "react";

const LoginForm = () => {
    // Form content
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [formError, setFormError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Invalid email");

    const { auth, setAuth } = useContext(AuthContext);

    // Validate email format
    function validateEmail() {
        // Check valid email
        if (
            formData.email.match(
                // eslint-disable-next-line no-useless-escape
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
            setFormError(false);
            return true;
        } else {
            setErrorMessage("Invalid email");
            setFormError(true);
            return false;
        }
    }

    function handleChange(e) {
        // Update data from form
        const { name, value } = e.target;
        if (name === "email") {
            setFormError(false);
        }
        // Update from data content
        setFormData((prevFormData) => {
            return { ...prevFormData, [name]: value };
        });
    }

    // Handle form submission
    function handleSubmit(e) {
        e.preventDefault();
        // console.log("Form submitted");
        if (validateEmail()) {
            // console.log(`User: ${formData.email}\nPassword: ${formData.password}`);
            //TODO -- Send User info to validate with a server
            const sendLoginInfo = async () => {
                axios
                    .post("http://localhost:8080/checkLogin", {
                        email: formData.email.toLowerCase(),
                        password: formData.password,
                    })
                    .then((res) => {
                        const userEmail = res.data.email;
                        const userType = res.data.userType;
                        const userAccessToken = res.data.accessToken;
                        //console.log(`Login Succesful\nEmail: ${userEmail}\nUser Type: ${userType}\nAccess Token: ${userAccessToken}`);
                        setFormError(false);
                        setAuth({ userEmail, userType, userAccessToken });
                        console.log(auth);

                        // TODO -- On succesful Login
                        // setFormData({ email: "", password: "" });
                    })
                    .catch((res) => {
                        console.log("Error: " + res.response.status);
                        setErrorMessage("Invalid Password");
                        setFormError(true);
                    });
            };
            sendLoginInfo();
        } else {
            console.log("Invalid Email format");
        }
    }

    return (
        <LoginContainer>
            <h2>Login</h2>
            <div className="google-login">
                <img src={google_logo} alt="google logo" />
                <span>Sign in with Google</span>
            </div>

            <div className="or-container">
                <h4 className="left">left</h4>
                <h4 className="or">or</h4>
                <h4 className="right">right</h4>
            </div>

            <form
                className="login-form"
                action=""
                method="post"
                onSubmit={handleSubmit}
            >
                <label className="label" htmlFor="email">
                    Email:{" "}
                    {formError && <span className="error">{errorMessage}</span>}
                </label>
                <input
                    id="email"
                    name="email"
                    autoComplete="email"
                    className="input"
                    type="email"
                    placeholder="Type your email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                />
                <label htmlFor="password" className="label">
                    Password:
                </label>
                <input
                    id="password"
                    name="password"
                    autoComplete="password"
                    type="password"
                    className="input"
                    placeholder="Type your password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                />
                <div className="forgot">
                    <a className="forgot-link" href="/forgotLogin">
                        forgot password?
                    </a>
                </div>
                <button className="login-btn">Login</button>
            </form>
        </LoginContainer>
    );
};

export const LoginContainer = styled.div`
    border: 2px solid #333;
    width: calc(min(50%, 50vh));
    border-radius: 20px;
    background-color: #d0dce7;
    display: flex;
    flex-direction: column;
    align-items: start;
    overflow-y: auto;

    & > h2 {
        padding: 2vh 0;
        font-weight: 800;
        align-self: center;
    }

    & > .google-login {
        background-color: white;
        border: 2px #333 solid;
        border-radius: 10px;
        width: 80%;
        align-self: center;
        padding: 1vh 0;
        box-shadow: 2px 2px 2px #333;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        &:hover {
            background-color: #6e88a1;
            cursor: pointer;
        }
        &:active {
            translate: 2px 2px;
            box-shadow: 0 0 0;
        }

        & > img {
            object-fit: contain;
            max-height: 3vh;
            justify-items: center;
            padding: 0 1vw;
        }

        & > span {
            flex: 1;
            text-align: center;
        }
    }

    & > .or-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: center;
        padding-top: 2vh;

        & > h4 {
            font-size: large;
            align-self: center;
        }

        & > .left,
        .right {
            color: transparent;
            flex: 1;
            background-color: #333;
            height: 0.2vh;
            margin: 0 2vw;
        }
    }

    & > .login-form {
        padding: 2vh 2vw;
        margin-top: -2vh;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        & > .label {
            display: block;
            padding: 0.5vh 0;
            align-self: start;
            display: flex;
            width: 100%;

            & > .error {
                color: red;
                text-align: end;
                flex: 1;
                padding-right: 1vw;
            }
        }
        & > input {
            display: block;
            width: 100%;
            padding: 0.5vh 1vw;
        }

        & > .forgot {
            align-self: end;
            font-size: small;
            padding-bottom: 2vh;
            padding-right: 0.5vw;

            & > .forgot-link {
                color: inherit;
                text-decoration: none;

                &:hover {
                    color: blue;
                    text-decoration: underline;
                }
            }
        }

        & > .login-btn {
            background-color: #879db3;
            border: 2px #333 solid;
            border-radius: 10px;
            width: 80%;
            align-self: center;
            padding: 0.5vh 0;
            box-shadow: 2px 2px 2px #333;

            &:hover {
                background-color: #6e88a1;
                cursor: pointer;
            }
            &:active {
                translate: 2px 2px;
                box-shadow: 0 0 0;
            }
        }
    }
`;

export default LoginForm;
