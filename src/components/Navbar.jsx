import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import krystin_logo from "../images/logo.png";
import brand_logo from "../images/brand-logo.png";
//import { Link } from "react-router-dom/";
import { useState, useEffect } from "react";
import InstagramLink from "./InstagramLink";
import LinkedInLink from "./LinkedInLink";
import EmailLink from "./EmailLink";

const NavbarKrystin = () => {
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });
    useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
            });
        }

        window.addEventListener("resize", handleResize);
        return (_) => {
            window.removeEventListener("resize", handleResize);
        };
    });

    return (
        <>
            <Navbar expand={dimensions.width < 831 ? false : true}>
                <Container
                    fluid
                    style={{
                        alignItems: "center",
                        justifyContent: "start",
                    }}
                >
                    <Navbar.Brand href="/">
                        <Row
                            style={{
                                alignItems: "center",
                                justifyContent: "end",
                            }}
                        >
                            <Col className="brand">
                                <img
                                    className="navbar-brand-logo"
                                    src={krystin_logo}
                                    alt="Krystin Logo"
                                />
                            </Col>
                            <Col>
                                <Row>
                                    <InstagramLink />
                                </Row>
                                <Row>
                                    <LinkedInLink />
                                </Row>
                                <Row>
                                    <EmailLink />
                                </Row>
                            </Col>
                        </Row>
                    </Navbar.Brand>

                    {dimensions.width > 513 && (
                        <img
                            className="brand-logo"
                            alt="brand logo"
                            src={brand_logo}
                            style={{ width: "250px" }}
                        />
                    )}

                    {dimensions.width > 464 && dimensions.width <= 513 && (
                        <img
                            className="brand-logo"
                            alt="brand logo"
                            src={brand_logo}
                            style={{ width: "200px" }}
                        />
                    )}

                    {dimensions.width > 400 && dimensions.width <= 464 && (
                        <img
                            className="brand-logo"
                            alt="brand logo"
                            src={brand_logo}
                            style={{ width: "150px" }}
                        />
                    )}

                    <Navbar.Toggle className="justify-content-end position-ab"></Navbar.Toggle>

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="flex-fill  justify-content-evenly">
                            <Nav.Link className="link-text">About Me</Nav.Link>
                            <NavDropdown
                                className="link-dropdown"
                                title="Services"
                            >
                                <NavDropdown.Item>In-person</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    Online Coaching
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link className="link-text">
                                Contact Me
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavbarKrystin;
