import React from "react";
import instagram_logo from "../images/instagram-logo.png";

const InstagramLink = () => {
    return (
        <>
            <div className="image pt-1 pb-1">
                <a href="https://www.instagram.com/coach.krystin">
                    <img
                        src={instagram_logo}
                        alt="Instagram Logo"
                        className="link-logo"
                    />
                </a>
            </div>
        </>
    );
};

export default InstagramLink;
