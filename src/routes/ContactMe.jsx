import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";
import { styled } from "styled-components";
import placeholder from "../images/ARC00892.jpg";
import {
    Map,
    MapContainerDesktop,
    MapContainerMobile,
} from "../components/Map";
import InstagramLink from "../components/InstagramLink";
import LinkedInLink from "../components/LinkedInLink";

// AIzaSyAx-xY_vBSy4fv8cp8ixJz6kBUMng1q5m8

const ContactMe = () => {
    return (
        <>
            <DesktopLayout content={<DesktopContent />} />
            <MobileLayout content={<MobileContent />} />
        </>
    );
};

export default ContactMe;

export const DesktopContent = () => {
    return (
        <DesktopDiv>
            <div className="container">
                <div className="img-container">
                    <img src={placeholder} alt="placeholder" />
                </div>

                <div className="info">
                    <ul className="info-list">
                        <li>
                            <h2>Get In Touch</h2>
                        </li>
                        <li>
                            <span
                                onClick={() => {
                                    window.open("mailto:krystin1@ualberta.ca");
                                }}
                                className="email"
                            >
                                Email: Krystin1@ualberta.ca
                            </span>
                        </li>
                        <li className="socials">
                            <InstagramLink width="3vw" />
                            <LinkedInLink width="3vw" />
                        </li>
                        <li style={{ padding: "0vh 2vw" }}>
                            In-Person Nutrition Consults and Personal Training
                            offered at 613 Lift:
                        </li>
                        <li className="map">
                            <MapContainerDesktop>
                                <Map />
                            </MapContainerDesktop>
                        </li>
                    </ul>
                </div>
            </div>
        </DesktopDiv>
    );
};

export const DesktopDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;

    & > .container {
        width: 100%;
        height: 80%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;

        & > .img-container {
            width: 30%;
            height: 100%;
            display: flex;
            justify-content: start;
            align-items: center;
            padding-right: 1%;

            & > img {
                max-width: 100%;
                max-height: 100%;
            }
        }

        & > .info {
            padding-left: 1%;
            width: 70%;

            & > .info-list {
                list-style: none;
                text-align: start;
                font-size: calc(min(2vw, 2vh));
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 0;

                & > li {
                    padding: 1vh 0;
                    text-align: center;

                    & > .email {
                        text-decoration: underline;
                    }

                    & > .email:hover {
                        cursor: pointer;
                        color: blue;
                    }

                    & > h2 {
                        width: 100%;
                        padding-top: 5%;
                        font-size: 3.5vh;
                        font-weight: 700;
                        height: 10%;
                    }
                }

                & > .socials {
                    display: flex;
                    flex-direction: row;
                    width: 25%;
                    justify-content: space-evenly;
                }

                & > .map {
                    width: calc(max(40vw, 50vh));
                    height: calc(min(40vw, 50vh));
                    padding-top: 2vh;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                }
            }
        }
    }
`;

export const MobileContent = () => {
    return (
        <MobileDiv>
            <h2>Get In Touch</h2>
            <div className="info">
                <ul className="info-list">
                    <li>
                        <span
                            onClick={() => {
                                window.open("mailto:krystin1@ualberta.ca");
                            }}
                            className="email"
                        >
                            Email: Krystin1@ualberta.ca
                        </span>
                    </li>
                    <li className="socials">
                        <InstagramLink
                            width="min(10vw, 13vh)"
                            height="min(10vw, 13vh)"
                        />
                        <LinkedInLink
                            width="min(10vw, 13vh)"
                            height="min(10vw, 13vh)"
                        />
                    </li>
                    <li>
                        In-Person Nutrition Consults and Personal Training
                        offered at 613 Lift:
                    </li>
                    <li className="map">
                        <MapContainerMobile>
                            <Map />
                        </MapContainerMobile>
                    </li>
                </ul>
            </div>
        </MobileDiv>
    );
};

export const MobileDiv = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100vw;
    padding-top: 2vh;
    padding-bottom: 2vh;
    min-height: calc(100vh - 100px - 4vh);
    align-items: center;

    & > h2 {
        text-align: center;
        font-size: 3vh;
        font-weight: 700;
        padding-top: 1vh;
    }

    & > .info {
        padding-top: 2vh;
        width: 100%;
        height: 100%;
        margin-bottom: 2vh;

        & > .info-list {
            list-style: none;
            text-align: center;
            font-size: calc(max(3vw, 2vh));
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            padding: 0;
            align-items: center;

            & > li {
                padding: 1vh 5vw;
            }

            & > li > .email {
                color: blue;
                text-decoration: underline;
            }

            & > .socials {
                display: flex;
                flex-direction: row;
                width: 60%;
                justify-content: space-evenly;
            }

            & > .map {
                margin-top: 5vh;
                width: calc(max(80vw, 60vh));
                max-width: 100vw;
                height: calc(min(80vw, 60vh));
                display: flex;
                flex-direction: row;
                justify-content: center;
            }
        }
    }
`;
