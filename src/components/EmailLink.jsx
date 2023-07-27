import React from "react";
import email_logo from "../images/email-logo.png";

const EmailLink = (props) => {
    const width = props.width;
    const height = props.height;
    return (
        <>
            <div className="image pt-1 pb-1">
                <a href="mailto:krystin1@ualberta.ca">
                    <img
                        src={email_logo}
                        alt="Email Logo"
                        className="link-logo"
                        style={{ width: width, height: height }}
                    />
                </a>
            </div>
        </>
    );
};

export default EmailLink;
