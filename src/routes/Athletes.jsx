import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";
import styled from "styled-components";
import AthleteCard from "../components/AthleteCard";
import Application from "../components/Application";

import data from "../frontend-data.json";
import no_img from "../images/athletes/no-img.jpg";
import { useState } from "react";

const Athletes = () => {
    const athletes = data.athletes;
    return (
        <>
            <DesktopLayout content={<DesktopContent athletes={athletes} />} />
            <MobileLayout content={<MobileContent athletes={athletes} />} />
        </>
    );
};

export const DesktopContent = (props) => {
    const athletes = props.athletes;
    const [showApplication, setShowAppilcation] = useState(false);
    const [showAthlete, setShowAthlete] = useState(null);
    const [athleteImg, setAthleteImg] = useState(null);

    return (
        <>
            <DesktopDiv
                style={
                    showAthlete || showApplication
                        ? { opacity: "0.4" }
                        : { opacity: "1" }
                }
            >
                <h3>Athlete Sponsorship Program</h3>
                <p>
                    Our Athlete Sponsorship Program is a testament to our
                    unwavering commitment to athletes who embody dedication,
                    passion, and an unwavering pursuit of excellence in sports.
                    This program offers a unique opportunity for athletes to
                    take their performance to the next level. Through our
                    sponsorship, you can access personalized training and
                    nutrition plans, premium nutrition products, increased
                    exposure, financial support, a supportive community, and
                    ongoing guidance. Join us in this remarkable journey and let
                    us help you reach your full athletic potential.
                </p>
                <div className="application">
                    <h4>Think you'd be a good fit?</h4>
                    <button
                        onClick={() => {
                            setShowAppilcation(true);
                        }}
                    >
                        Apply Now
                    </button>
                </div>
                <h3>Support Their Dreams</h3>
                <p>
                    Check out the athletes profiles below to read about their
                    journey, and to find out how you can support their continued
                    success.
                </p>
                <div className="athletes">
                    {athletes.map((athlete) => {
                        return (
                            <div
                                className="card-container"
                                key={athlete.name}
                                onClick={() => {
                                    setShowAthlete(athlete);
                                    try {
                                        setAthleteImg(
                                            require(`../images/athletes/${athlete.last_name}.jpg`)
                                        );
                                    } catch (error) {
                                        setAthleteImg(null);
                                    }
                                }}
                            >
                                <AthleteCard athlete={athlete} />
                            </div>
                        );
                    })}
                </div>
            </DesktopDiv>
            {showAthlete && (
                <>
                    <BioBackground
                        className="bio-bg"
                        onClick={() => {
                            setShowAthlete(null);
                        }}
                    />
                    <AthleteBio className="athlete-bio">
                        <img src={athleteImg ? athleteImg : no_img} alt="" />
                        <div className="bio-container">
                            <h3>
                                {showAthlete.name} {showAthlete.last_name}
                            </h3>
                            <h4>Sport: {showAthlete.sport}</h4>
                            <p>{showAthlete.bio}</p>
                        </div>
                        <button
                            className="close-bio"
                            onClick={() => {
                                setShowAthlete(null);
                            }}
                        >
                            X
                        </button>
                    </AthleteBio>
                </>
            )}
            {showApplication && (
                <>
                    <BioBackground
                        className="bio-bg"
                        onClick={() => {
                            setShowAppilcation(false);
                        }}
                    />
                    <ApplicationDiv>
                        <Application />
                    </ApplicationDiv>
                </>
            )}
        </>
    );
};

export const DesktopDiv = styled.div`
    height: 100%;
    width: 100%;
    padding-right: 2vw;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    z-index: 1;

    & > h3 {
        font-weight: normal;
        align-self: start;
        margin: 1vh 0;
    }
    & > p {
        text-align: justify;
        align-self: start;
    }
    & > .application {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        & > h4 {
            text-align: left;
            margin-right: 2vw;
        }

        & > button {
            border: solid 2px #333;
            color: #333;
            border-radius: 3vw;
            font-size: calc(min(1.6vw, 2.5vh));
            padding: 1vh 2vw;
            box-shadow: 2px 2px 2px #333;
            background-color: #d0dceb;
            margin-left: 2vw;

            &:hover {
                background-color: #87ceeb;
                cursor: pointer;
            }
            &:active {
                translate: 3px 3px;
                box-shadow: 0 0 0;
            }
        }
    }
    & > .athletes {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-evenly;
        flex-wrap: wrap;
        margin-bottom: 2vh;

        & > .card-container {
            width: 30%;
            height: 45vh;
            margin: 1vh 1vw;
        }
    }
`;

export const AthleteBio = styled.div`
    position: absolute;
    width: 60%;
    height: 60%;
    top: 20%;
    left: 20%;
    z-index: 3;
    background-color: #d0dceb;
    border: solid #333 calc(min(0.5vw, 0.5vh));
    border-radius: 1vw;
    display: flex;
    flex-direction: row;
    align-items: center;

    & > img {
        max-height: 95%;
        max-width: 35%;
        margin-left: 1%;
        border-radius: 1vw;
    }

    & > .bio-container {
        display: flex;
        flex-direction: column;
        justify-content: start;
        height: calc(100% - 2vh);
        flex: 1;
        margin: 1vh 0 1vh 1vw;
        overflow-y: auto;

        & > p {
            text-align: justify;
            padding-right: 1vw;
        }
    }

    & > .close-bio {
        position: absolute;
        width: calc(min(5vw, 5vh));
        height: calc(min(5vw, 5vh));
        background-color: red;
        border: solid #333 calc(min(0.5vw, 0.5vh));
        border-radius: calc(min(1vw, 1vh));
        right: calc(max(-2.5vw, -2.5vh));
        top: calc(max(-2.5vw, -2.5vh));
        font-weight: bolder;
        font-size: calc(min(2.5vw, 2.5vh));
    }
`;

export const BioBackground = styled.div`
    position: absolute;
    width: 100%;
    height: 95%;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: transparent;
    border-radius: 1vw;
`;

export const ApplicationDiv = styled.div`
    z-index: 3;
    position: absolute;
    width: 60%;
    max-height: 80%;
    min-height: max-content;
    overflow-y: auto;
    top: 10%;
    left: 20%;
    background-color: #d0dceb;
    border: solid #333 calc(min(0.5vw, 0.5vh));
    border-radius: 1vw;

    & > form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        padding-top: 1vh;
        padding-bottom: 1vh;

        & > h3 {
            margin-bottom: 0.5vh;
        }

        & > .input-text {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-bottom: 0.5vh;

            & label {
                width: 20%;
                text-align: end;
                padding-left: 2vw;
            }

            & input {
                width: 75%;
                margin-left: 2%;
                margin-right: 3%;
            }
        }

        & > .about {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            max-height: 10%;

            & label {
                width: 35%;
                text-align: end;
                padding-left: 2vw;
            }

            & textarea {
                width: 60%;
                margin-left: 2%;
                margin-right: 3%;
                resize: none;
            }
        }

        & > .error-msg {
            width: 100%;
            margin-top: -0.5vh;
            margin-bottom: 1vh;
        }

        > .submit-btn {
            width: max-content;
            background-color: #d0dceb;
            border: 2px solid #333;
            border-radius: 10px;
            padding: 1vh 2vw;
            color: #333;
            box-shadow: 3px 3px 2px #333;
            margin-bottom: 1.5vh;

            &::after {
                content: "Submit Application";
            }

            &:hover {
                background-color: #87ceeb;
                cursor: pointer;
            }
            &:active {
                translate: 3px 3px;
                box-shadow: 0 0 0;
            }
        }

        > .submitted::after {
            content: "Message Sent!";
        }
    }
`;

export const MobileContent = (props) => {
    const athletes = props.athletes;

    return (
        <>
            <MobileDiv>
                <h3>Athlete Sponsorship Program</h3>
                <p>
                    Our Athlete Sponsorship Program is a testament to our
                    unwavering commitment to athletes who embody dedication,
                    passion, and an unwavering pursuit of excellence in sports.
                    This program offers a unique opportunity for athletes to
                    take their performance to the next level. Through our
                    sponsorship, you can access personalized training and
                    nutrition plans, premium nutrition products, increased
                    exposure, financial support, a supportive community, and
                    ongoing guidance. Join us in this remarkable journey and let
                    us help you reach your full athletic potential.
                </p>
                <div className="application">
                    <h4>Think you'd be a good fit?</h4>
                    <button>Apply Now</button>
                </div>
                <h3>Support Their Dreams</h3>
                <p>
                    Check out the athletes profiles below to read about their
                    journey, and to find out how you can support their continued
                    success.
                </p>
                <div className="athletes">
                    {athletes.map((athlete) => {
                        return (
                            <div className="card-container" key={athlete.name}>
                                <AthleteCard athlete={athlete} />
                            </div>
                        );
                    })}
                </div>
            </MobileDiv>
        </>
    );
};

export const MobileDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2vh;

    & > p {
        text-align: justify;
        margin: 1vh 2vw;
    }

    & > .application {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
        margin-bottom: 2vh;

        & > button {
            border: solid 2px #333;
            color: #333;
            border-radius: 3vw;
            padding: 0.5vh 1vw;
            box-shadow: 2px 2px 2px #333;
            background-color: #d0dceb;
            margin-left: 2vw;
            width: fit-content;
            height: fit-content;
        }
    }

    & > .athletes {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;

        & > .card-container {
            height: 40vh;
            width: 45%;
            margin-bottom: 2vh;
        }
    }
`;

export default Athletes;
