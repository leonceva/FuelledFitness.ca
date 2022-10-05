import React from "react";
import { Navbar } from "react-bootstrap";
import logo from "../images/logo.png";
import { FaBars } from "react-icons/all";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const getWindowSize = () => {
    const [windowSize, setWindowSize] = useState({ width: 1000 });

    useEffect(() => {
        const resizeHandler = () => {
            setWindowSize({
                width: window.innerWidth,
            });
        };

        window.addEventListener("resize", resizeHandler);
        resizeHandler();
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    return windowSize;
};

const NavbarKrystin = () => {
    let window_size = getWindowSize();
    if (window_size.width > 500) {
        return (
            <Navbar expand="md">
                <Navbar.Brand>
                    <div className="navbar-brand p-2 ps-3 row">
                        <div className="image col">
                            <a href="/">
                                <img className="navbar-brand-logo" src={logo} />
                            </a>
                        </div>

                        <div className="col-sm fs-5 navbar-media align-self-center">
                            <div className="row navbar-media-link">IG link</div>
                            <div className="row navbar-media-link">
                                LinkedIn
                            </div>
                            <div className="row navbar-media-link">
                                Other link
                            </div>
                        </div>
                    </div>
                </Navbar.Brand>
                <ul className="navbar-nav d-flex">
                    <li className="nav-item text-center ms-auto me-auto">
                        <Link to="/aboutMe" style={{ textDecoration: "none" }}>
                            <div className="link-text">Meet Krystin</div>
                        </Link>
                    </li>
                    <li className="nav-item text-center ms-auto me-auto">
                        <Link to="/services" style={{ textDecoration: "none" }}>
                            <div className="link-text">
                                Training and Nutrition
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item text-center ms-auto me-auto">
                        <Link to="/contact" style={{ textDecoration: "none" }}>
                            <div className="link-text">Contact Me</div>
                        </Link>
                    </li>
                </ul>
            </Navbar>
        );
    } else {
        return (
            <div>
                Mobile Mode not implemented, size: {`${window_size.width}`}
            </div>
        );
    }
};

export default NavbarKrystin;
