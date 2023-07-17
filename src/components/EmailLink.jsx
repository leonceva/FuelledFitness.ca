import React from "react";
import email_logo from "../images/email-logo.png";

const EmailLink = () => {
    return (
        <>
            <div className="image pt-1 pb-1">
                <a href="mailto:krystin1@ualberta.ca">
                    <img
                        src={email_logo}
                        alt="Email Logo"
                        className="link-logo"
                    />
                </a>
            </div>
        </>
    );
};

export default EmailLink;
