import styled from "styled-components";
import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";
import Reaptcha from "reaptcha";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const reaptchaKey = process.env.REACT_APP_REAPTCHA_KEY;

const ForgotLogin = () => {
    return (
        <>
            <DesktopLayout content={<DesktopContent />} />
            <MobileLayout content={<MobileContent />} />
        </>
    );
};

export const DesktopContent = () => {
    const captchaRef = useRef(null);
    const [verified, setVerified] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateEmail()) {
            if (verified) {
                // Send email to server endpoint that will generate the reset token
            } else {
                setErrorMessage("Pleace complete the CAPTCHA");
            }
        }
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setEmail(value);
        setErrorMessage(false);
    };

    // Validate email format
    const validateEmail = () => {
        // Check valid email
        if (
            email.match(
                // eslint-disable-next-line no-useless-escape
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
            setErrorMessage(false);
            return true;
        } else {
            setErrorMessage("Invalid e-mail entered");
            return false;
        }
    };

    return (
        <DesktopDiv>
            <div className="container">
                <h2>Forgot Password</h2>
                <p>
                    Please enter the email address you'd like your password
                    reset information sent to:
                </p>
                <form action="" method="post" onSubmit={handleSubmit}>
                    <span
                        className={`error-message ${
                            errorMessage ? "show" : "hide"
                        }`}
                        placeholder=""
                    >
                        {errorMessage || "placeholder"}
                    </span>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        required
                        placeholder="Enter your e-mail"
                        onChange={handleChange}
                        value={email}
                    />
                    <Reaptcha
                        className="captcha"
                        sitekey={reaptchaKey}
                        onVerify={() => {
                            setVerified(true);
                            setErrorMessage(false);
                        }}
                        ref={captchaRef}
                        onExpire={() => {
                            setVerified(false);
                            setErrorMessage("CAPTCHA has expired");
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                    />
                    <button>Request Reset Link</button>
                </form>
                <span
                    className="go-back"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Back To Login
                </span>
            </div>
        </DesktopDiv>
    );
};

export const DesktopDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: calc(min(2vw, 2vh));

    & > .container {
        max-width: 60%;
        width: fit-content;
        margin-top: 10%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 2px solid #333;
        border-radius: 20px;
        background-color: #d0dce7;

        & > h2 {
            padding-top: 1vh;
        }

        & > p {
            text-align: start;
            padding: 1vh 1vw 0;
        }

        & > form {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 80%;

            & > .error-message {
                width: 100%;
                text-align: end;
                padding-right: 5%;
                color: red;
            }

            & > .show {
                opacity: 1;
            }

            & > .hide {
                opacity: 0;
            }

            & > input {
                width: 100%;
            }

            & > .captcha {
                margin-top: 1vh;
            }

            & button {
                max-width: 50%;
                margin-top: 1vh;
                margin-bottom: 2vh;
                background-color: #879db3;
                border: 2px #333 solid;
                border-radius: 10px;
                padding: 0.5vh 1vw;
                font-size: calc(min(2vh, 2vw));
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

        & > .go-back {
            padding-bottom: 1vh;
            font-weight: bold;

            &:hover {
                cursor: pointer;
                text-decoration: underline;
                color: blue;
            }
        }
    }
`;

export const MobileContent = () => {
    return <MobileDiv>In development ...</MobileDiv>;
};

export const MobileDiv = styled.div``;

export default ForgotLogin;
