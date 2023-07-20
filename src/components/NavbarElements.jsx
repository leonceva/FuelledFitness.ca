import React from "react";
import { styled } from "styled-components";
import { NavLink as Link } from "react-router-dom";
import InstagramLink from "./InstagramLink";
import LinkedInLink from "./LinkedInLink";
import EmailLink from "./EmailLink";
import logo from "../images/logo.png";
import brand_logo from "../images/brand-logo.png";

const MOBILE_MODE_LIMIT = `892px`;

export const Nav = styled.nav`
    background-image: linear-gradient(to right, white, rgb(241, 124, 143));

    border: solid;
    border-color: darkgrey;
    display: flex;
    justify-content: start;
    padding: 10px;
    align-items: center;
    height: 100%;
`;

export const NavBrand = () => {
    return (
        <>
            <div className="row">
                <div className="col">
                    <Link to={`/home`}>
                        <img
                            className="navbar-brand-logo"
                            src={logo}
                            alt="Krystin's Logo"
                        />
                    </Link>
                </div>
                <div className="col" style={{ marginLeft: "-10px" }}>
                    <div className="row">
                        <InstagramLink />
                    </div>
                    <div className="row">
                        <LinkedInLink />
                    </div>
                    <div className="row">
                        <EmailLink />
                    </div>
                </div>
                <div className="col">
                    <BrandImgDiv>
                        <BrandImg
                            className="border  border-danger"
                            src={brand_logo}
                        />
                    </BrandImgDiv>
                </div>
            </div>
        </>
    );
};

export const BrandImgDiv = styled.div`
    display: flex;
    position: absolute;
    justify-content: start;
    align-items: center;
`;

export const BrandImg = styled.img`
    @media screen and (min-width: 513px) {
        translate: 0 40px;
        width: 250px;
    }
    @media screen and (max-width: 513px) {
        translate: 0 42px;
        width: 200px;
    }
    @media screen and (max-width: 464px) {
        translate: 0 46px;
        width: 150px;
    }
    @media screen and (max-width: 413px) {
        display: none;
    }
`;

export const NavMenu = (props) => {
    const dropdownHover = props.dropdownHover;
    const setDropdownHover = props.setDropdownHover;
    return (
        <NavMenuUL>
            <li>
                <NavLink to="/aboutMe"> About Me </NavLink>
            </li>
            <li className="dropdown">
                <button
                    onMouseOver={() => setDropdownHover(true)}
                    onMouseLeave={() => setDropdownHover(false)}
                >
                    Services{" "}
                    {dropdownHover ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-caret-down"
                            viewBox="0 0 16 16"
                        >
                            <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-caret-down-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                    )}
                </button>
                <div
                    onMouseOver={() => setDropdownHover(true)}
                    onMouseLeave={() => setDropdownHover(false)}
                    className="dropdown-content"
                >
                    <NavLink className="dropdown-link" to="/services#in-person">
                        In-Person
                    </NavLink>
                    <NavLink className="dropdown-link" to="/services#online">
                        Online
                    </NavLink>
                </div>
            </li>
            <li>
                <NavLink to="contactMe"> Contact Me </NavLink>
            </li>
        </NavMenuUL>
    );
};

export const NavMenuUL = styled.ul`
    list-style-type: none;
    display: flex;
    flex: auto;
    justify-content: end;
    position: relative;
    top: 9px;
    @media screen and (max-width: ${MOBILE_MODE_LIMIT}) {
        display: none;
    }

    & li {
        min-width: 150px;
        position: relative;
        text-align: center;

        & > button {
            display: inline-block;
            color: black;
            text-decoration: none;
            font-weight: 500;
            font-size: 20px;
            width: 150px;
            background-color: transparent;
            border: none;
        }
    }

    & > .dropdown {
        display: inline-block;

        & > .dropdown-content {
            display: none;
            padding: 12px 10px;
            background-color: white;
            border-color: lightgray;
            border-style: solid;
            border-width: 2px;
            width: 150px;
            box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.2);
            z-index: 1;
            position: fixed;

            & > .dropdown-link {
                text-align: center;
                margin: 0 -10px;
            }
            & > .dropdown-link:hover {
                background-color: lightgray;
                flex: auto;
                box-shadow: none;
            }
        }
        &:hover .dropdown-content {
            display: flex;
            flex-direction: column;
        }
    }
`;

export const NavLink = styled(Link)`
    color: black;
    text-decoration: none;
    font-weight: 500;
    font-size: 20px;
    &:hover {
        color: inherit;
        transition: 0.3s;
        box-shadow: 0 0px 0 0 black, 0 2px 0 0 black;
    }
`;

export const NavButtonDiv = styled.div`
    display: none;
    padding-left: 10px;
    margin-left: 10px;

    @media screen and (max-width: ${MOBILE_MODE_LIMIT}) {
        display: flex;
        flex: auto;
        justify-content: end;
        align-items: center;
        height: 45px;
    }

    & > .button-container {
        width: 58px;
        cursor: pointer;
        border-width: 2.5px;
        border-style: solid;
        border-color: #333;
        border-radius: 15%;
        padding-left: 10px;
        padding-right: 10px;
        position: absolute;
        background-color: lightgray;
        & > .bar-1,
        .bar-2,
        .bar-3 {
            width: 35px;
            height: 5px;
            background-color: #333;
            margin: 6px 0;
            transition: 0.4s;
        }
    }

    & > .change-button-container {
        width: 58px;
        cursor: pointer;
        border-width: 2.5px;
        border-style: solid;
        border-color: lightgray;
        border-radius: 15%;
        padding-left: 10px;
        padding-right: 10px;
        position: absolute;
        background-color: #333;

        & > .change-bar-1 {
            width: 35px;
            height: 5px;
            background-color: lightgray;
            margin: 6px 0;
            transform: translate(0, 11px) rotate(-45deg);
            transition: 0.4s;
        }

        & > .change-bar-2 {
            width: 35px;
            height: 5px;
            background-color: lightgray;
            margin: 6px 0;
            margin: 6px 0;
            opacity: 0;
        }

        & > .change-bar-3 {
            width: 35px;
            height: 5px;
            background-color: lightgray;
            margin: 6px 0;
            transform: translate(0, -11px) rotate(45deg);
            transition: 0.4s;
        }
    }

    & > .expanded-menu {
        display: flex;
        flex-direction: column;
        background-color: white;
        border-width: 2px;
        border-color: lightgray;
        border-style: solid;
        font-size: 20px;
        z-index: 1;
        height: auto;
        width: 200px;
        position: relative;
        text-align: center;
        align-self: start;
        translate: 0 45px;
        padding: 12px 10px;

        & > .expanded-link {
            text-align: center;
            margin: 0 -10px;
        }

        & > .expanded-link:hover {
            background-color: lightgray;
            flex: auto;
            box-shadow: none;
        }
    }
`;

export const NavButton = (props) => {
    const isExpanded = props.isExpanded;
    const setIsExpanded = props.setIsExpanded;
    return (
        <NavButtonDiv>
            <div
                className={
                    isExpanded ? "change-button-container" : "button-container"
                }
                onClick={() => {
                    setIsExpanded(isExpanded ? false : true);
                }}
            >
                <div className={isExpanded ? "change-bar-1" : "bar-1"} />
                <div className={isExpanded ? "change-bar-2" : "bar-2"} />
                <div className={isExpanded ? "change-bar-3" : "bar-3"} />
            </div>
            {isExpanded && (
                <div className="expanded-menu">
                    <NavLink className="expanded-link" to="/aboutMe">
                        About Me
                    </NavLink>
                    <NavLink className="expanded-link" to="/services">
                        Services
                    </NavLink>
                    <NavLink className="expanded-link" to="/contactMe">
                        Contact Me
                    </NavLink>
                </div>
            )}
        </NavButtonDiv>
    );
};
