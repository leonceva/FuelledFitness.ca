import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import krystin_logo from "../images/logo.png";
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
            <Navbar expand={dimensions.width < 467 ? false : true}>
                <Container
                    fluid
                    style={{
                        alignItems: "center",
                        justifyContent: "space-evenly",
                    }}
                >
                    <Navbar.Brand href="/" className="flex-fill">
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
                                ></img>
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

                    <Navbar.Toggle className="justify-content-end"></Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="flex-fill  justify-content-evenly">
                            <Nav.Link>About Me</Nav.Link>
                            <NavDropdown title="Services">
                                <NavDropdown.Item>In-person</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    Online Coaching
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link>Contact Me</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavbarKrystin;
