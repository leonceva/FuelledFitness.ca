import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";
import placeholder from "../images/krystin-gym-01.jpg";
import nutritionImg from "../images/krystin-business-01.jpg";
import trainingImg from "../images/krystin-wrestling-02.jpg";

const Services = () => {
    const [serviceSelected, setServiceSelected] = useState("none");
    const [optionSelected, setOptionSelected] = useState(null);
    const location = useLocation();

    useEffect(() => {
        if (location.hash.slice(1) === "") {
            setServiceSelected("none");
        } else {
            let separator = location.hash.indexOf("-");
            console.log(`Index of separator: ${separator}`);
            if (separator === -1) {
                setServiceSelected(location.hash.slice(1));
            } else {
                setServiceSelected(location.hash.slice(1, separator));
                setOptionSelected(location.hash.slice(separator + 1));
            }
        }
    }, [location]);

    return (
        <>
            <DesktopLayout
                content={
                    <DesktopContent
                        serviceSelected={serviceSelected}
                        optionSelected={optionSelected}
                    />
                }
            ></DesktopLayout>
            <MobileLayout
                content={<MobileContent serviceSelected={serviceSelected} />}
            />
        </>
    );
};

export default Services;

export const DesktopContent = (props) => {
    const serviceSelected = props.serviceSelected;
    const option = props.optionSelected;
    const navigate = useNavigate();

    const handleClickService = (service) => {
        if (service === "none") {
            navigate(``);
        } else {
            navigate(`#${service}`);
        }
    };

    const handleClickOption = (option) => {
        navigate(`#${serviceSelected}-${option}`);
    };

    return (
        <DesktopDiv>
            <div
                className={`button-container ${
                    serviceSelected === "none" ? "long" : "short"
                }`}
            >
                {
                    // When neither service is selected
                    serviceSelected === "none" && (
                        <>
                            <h2>Select a service type for more info</h2>
                            <ServiceButton
                                onClick={() => {
                                    handleClickService("nutrition-individuals");
                                }}
                            >
                                Nutrition
                            </ServiceButton>
                            <ServiceButton
                                onClick={() => {
                                    handleClickService("training-online");
                                }}
                            >
                                Training
                            </ServiceButton>
                            <img src={placeholder} alt="placeholder" />
                        </>
                    )
                }

                {
                    // Nutrition service
                    serviceSelected === "nutrition" && (
                        <>
                            <span className="go-back">
                                <i
                                    onClick={() => {
                                        handleClickService("none");
                                    }}
                                    className="bi bi-arrow-left go-back-btn"
                                />
                            </span>
                            <h3>Nutrition Services</h3>
                            <InfoButton
                                style={{ animationDelay: "0.5s" }}
                                onClick={() => handleClickOption("individuals")}
                            >
                                Individuals
                            </InfoButton>
                            <InfoButton
                                style={{ animationDelay: "0.5s" }}
                                onClick={() => handleClickOption("team")}
                            >
                                Team Programs
                            </InfoButton>
                            <InfoButton
                                style={{ animationDelay: "0.5s" }}
                                onClick={() => handleClickOption("corporate")}
                            >
                                Corporate
                            </InfoButton>
                            <InfoButton
                                style={{ animationDelay: "0.5s" }}
                                onClick={() => handleClickOption("menu")}
                            >
                                Menu Review
                            </InfoButton>
                            <InfoButton
                                style={{ animationDelay: "0.5s" }}
                                className="other-service"
                                onClick={() => {
                                    window.open(
                                        "https://my.practicebetter.io/#/649ca3c56d0b43d466e3b1f8/bookings?step=services",
                                        "_blank"
                                    );
                                }}
                            >
                                Book Appointment
                            </InfoButton>
                        </>
                    )
                }

                {
                    // Training service
                    serviceSelected === "training" && (
                        <>
                            <span className="go-back">
                                <i
                                    onClick={() => {
                                        handleClickService("none");
                                    }}
                                    className="bi bi-arrow-left go-back-btn"
                                />
                            </span>
                            <h3>Training Services</h3>
                            <InfoButton
                                onClick={() => handleClickOption("online")}
                            >
                                Online Coaching
                            </InfoButton>
                            <InfoButton
                                onClick={() => handleClickOption("personal")}
                            >
                                Personal Training
                            </InfoButton>
                            <InfoButton
                                onClick={() => handleClickOption("team")}
                            >
                                Team Strength and Conditioning
                            </InfoButton>
                            <InfoButton
                                className="other-service"
                                onClick={() => {
                                    window.open(
                                        "https://my.practicebetter.io/#/649ca3c56d0b43d466e3b1f8/bookings?step=services",
                                        "_blank"
                                    );
                                }}
                            >
                                Book Appointment
                            </InfoButton>
                        </>
                    )
                }
            </div>
            <div
                className={`info-container  ${
                    serviceSelected === "nutrition" ||
                    serviceSelected === "training"
                        ? "show"
                        : "hide"
                }`}
            >
                <InfoDesktop
                    className="info"
                    option={option}
                    service={serviceSelected}
                />
            </div>
        </DesktopDiv>
    );
};

export const DesktopDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;

    & > .button-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 1vh 1vw;
        justify-content: start;
        align-items: center;
        position: relative;
        padding-top: 10vh;

        & > img {
            max-width: 25%;
            max-height: 50%;
        }

        & > h2 {
            font-size: 3.5vh;
        }
        & > h3 {
            font-size: 3vh;
            font-weight: 900;
            width: 100%;
        }

        // For the buttons
        & > div {
            transition: background-color 0.2s;
            background-color: #d0dceb;
            box-shadow: 3px 3px 2px #333;
            margin: 2vh 0;
            width: 100%;
        }
        & > div:hover {
            background-color: #87ceeb;
            cursor: pointer;
        }
        & > div:active {
            box-shadow: 0 0;
            translate: 3px 3px;
        }
        & > .other-service {
            background-color: #d0dceb;
        }
        & > .other-service:hover {
            background-color: #87ceeb;
        }

        & > .go-back {
            transition: background-color 0.2s;
            height: calc(min(5vw, 5vh));
            width: calc(min(5vw, 5vh));
            margin-bottom: 5vh;
            font-size: calc(min(3.5vw, 3.5vh));
            border: solid #333 2px;
            text-align: center;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            box-shadow: 3px 3px 3px #333;
        }
        & > .go-back:hover {
            cursor: pointer;
            background-color: gray;
        }
        & > .go-back:active {
            box-shadow: 0 0;
            translate: 3px 3px;
        }
    }
    & > .long {
        width: 100%;
    }
    & > .short {
        width: 30%;
    }

    // For the info
    & > .info-container {
        border: solid #333 2px;
        height: calc(100% - 4vh);
        margin: 2vh 1vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 2.5vh;
        padding: 0 2vw;
        text-align: justify;

        & > h2 {
            text-align: center;
            font-size: 3.5vh;
        }
    }
    & > .show {
        width: 100%;
        overflow-y: auto;
        border-radius: 10% 0% 0% 10%;
        content-visibility: visible;
    }
    & > .hide {
        transition: width 0.25s;
        width: 0%;
        border-width: 0px;
        color: transparent;
        content-visibility: hidden;
    }
`;

export const InfoDesktop = (props) => {
    const service = props.service;
    const option = props.option;

    // Text to display based on option chose
    return (
        <>
            {option === "individuals" && service === "nutrition" && (
                <>
                    <h2>Nutrition Counselling</h2>
                    <p>
                        Say goodbye to guesswork, and hello to a personalized
                        nutrition plan! Work 1:1 with a Registered Dietitian to
                        achieve your goals. Whether you're striving for peak
                        performance, weight loss, improved energy levels, or
                        optimal health and wellbeing for yourself and your
                        family, we offer personalized strategies to support you
                        in achieving your goals. <br /> <br />
                        Initial Consult (60 minutes) - $140 <br />
                        Follow-up (45 minutes) - $105
                    </p>
                    <h2>Personalized Strategies</h2>
                    <p>
                        In some cases your Registered Dietitian may recommend a
                        meal plan to support you in achieving your goals. A meal
                        plan is not the answer for everyone. Your Registered
                        Dietitian will work with you to address the challenges
                        you face to optimally achieve your nutrition goals. Some
                        examples may include food diary review, recipe curation,
                        grocery store tours, pantry review, and cooking lessons.
                    </p>
                </>
            )}
            {option === "team" && service === "nutrition" && (
                <>
                    <h2>Team Nutrition Programs</h2>
                    <p>
                        Complement the hard work your athletes are putting in
                        during training with nutrition support. Some services
                        offered include nutrition presentations, interactive
                        activities, or 1:1 counselling sessions.
                        <br />
                        <br />
                        Contact us today to design a program that fits the needs
                        of your team.
                    </p>
                </>
            )}
            {option === "corporate" && service === "nutrition" && (
                <>
                    <h2>Employee Nutrition Program</h2>
                    <p>
                        Support the wellbeing of your employees through
                        nutrition support. Healthier and happier employees
                        promote improved productivity, longevity, and a better
                        workplace culture. Some services offered include
                        nutrition presentations, interactive activities, or 1:1
                        counselling sessions.
                        <br />
                        <br />
                        Contact us today to discuss the unique needs of your
                        organization.
                    </p>
                </>
            )}
            {option === "menu" && service === "nutrition" && (
                <>
                    <h2>Menu Review</h2>
                    <p>
                        Do you provide meals as part of your business? Provide
                        assurance of nutritional balance, and credibility to
                        clients by having your menu reviewed and critiqued by a
                        Registered Dietitian.
                        <br />
                        <br />
                        Contact us today to discuss the unique needs of your
                        organization.
                    </p>
                </>
            )}
            {option === "online" && service === "training" && (
                <>
                    <h2>Online Coaching</h2>
                    <p>
                        Discover the ultimate online coaching experience with a
                        personalized program and consistent support. Our online
                        coaching program is delivered in 4-week intervals with a
                        tailored workout plan, weekly video review and feedback,
                        and on-demand expert guidance through virtual support
                        with your coach. <br />
                        <br />
                        $150 / 4-weeks
                    </p>
                </>
            )}
            {option === "personal" && service === "training" && (
                <>
                    <h2>Personal Training</h2>
                    <p>
                        Experience personalized 1:1 coaching with hands on
                        guidance, immediate feedback, and continuous support
                        throughout your session. Our personal training sessions
                        include a customized weekly program to follow, ensuring
                        continuous progress in between sessions with your coach.
                        <br />
                        <br />1 x per week - $100 per session <br />2 x per week
                        - $90 per session <br />
                        3+ x per week - $75 per session <br />
                        <br />
                        Already a client of online coaching? Add an in-person
                        coaching session for $75 <br />
                        <br />
                        Looking for a personal training session without a
                        program to follow? $90 per session.
                    </p>
                </>
            )}
            {option === "team" && service === "training" && (
                <>
                    <h2>Team Strength and Conditioning</h2>
                    <p>
                        Enhance performance, prevent injuries, and foster
                        resilience within your team through expertly crafted
                        strength and conditioning programs. Bring your athlete
                        preparation to the next level with a periodized program
                        tailored to the needs of your athletes. We offer
                        flexible options which can accommodate a wide range of
                        team sizes and budgets. <br />
                        <br />
                        Contact us today to learn more.
                    </p>
                </>
            )}
        </>
    );
};

export const InfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > h3 {
        font-size: 3vh;
        font-weight: 700;
        margin-bottom: 2vh;
    }

    & > .img-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 95%;

        & > img {
            max-width: 40vw;
            max-height: 45vh;
        }
    }
`;

export const InfoButton = styled.div`
    border: solid #333 2px;
    border-radius: 10px;
    width: 80%;
    align-self: center;
    font-size: 2.5vh;
    padding: 0 1vw;
`;

export const ServiceButton = styled.div`
    border: solid #333 2px;
    border-radius: 10px;
    min-width: 30%;
    max-width: max-content;
    align-self: center;
    font-size: 2.5vh;
    padding: 0 1vw;
`;

export const MobileContent = (props) => {
    const serviceSelected = props.serviceSelected;
    const navigate = useNavigate();

    const handleClick = (service) => {
        navigate(`#${service}`);
    };
    return (
        <MobileDiv>
            <div className="service-select">
                <div
                    className={`button ${
                        serviceSelected === "nutrition" ? "active" : ""
                    }`}
                    onTouchStart={() => {
                        handleClick("nutrition");
                    }}
                >
                    Nutrition
                </div>
                <div
                    className={`button ${
                        serviceSelected === "training" ? "active" : ""
                    }`}
                    onTouchStart={() => {
                        handleClick("training");
                    }}
                >
                    Training
                </div>
            </div>
            <div className="service-info">
                {
                    // No service selected
                    serviceSelected === "none" && (
                        <>
                            <h3>Select a service type to learn more</h3>

                            <img src={placeholder} alt="placeholder" />
                        </>
                    )
                }
                {
                    // Nutrition Services
                    serviceSelected === "nutrition" && (
                        <>
                            <h3>Nutrition Counselling</h3>
                            <p>
                                Say goodbye to guesswork, and hello to a
                                personalized nutrition plan! Work 1:1 with a
                                Registered Dietitian to achieve your goals.
                                Whether you're striving for peak performance,
                                weight loss, improved energy levels, or optimal
                                health and wellbeing for yourself and your
                                family, we offer personalized strategies to
                                support you in achieving your goals. <br />
                                <br />
                                Initial Consult (60 minutes) - $140 <br />
                                Follow-up (45 minutes) - $105 <br />
                                <br />
                                In some cases your Registered Dietitian may
                                recommend a meal plan to support you in
                                achieving your goals. A meal plan is not the
                                answer for everyone. Your Registered Dietitian
                                will work with you to address the challenges you
                                face to optimally achieve your nutrition goals.
                                Some examples may include food diary review,
                                recipe curation, grocery store tours, pantry
                                review, and cooking lessons.
                            </p>
                            <h3>Team Nutrition Programs</h3>
                            <p>
                                Complement the hard work your athletes are
                                putting in during training with nutrition
                                support. Some services offered include nutrition
                                presentations, interactive activities, or 1:1
                                counselling sessions.
                                <br />
                                <br />
                                Contact us today to design a program that fits
                                the needs of your team.
                            </p>
                            <h3>Corporate Wellness Programs</h3>
                            <p>
                                Support the wellbeing of your employees through
                                nutrition support. Healthier and happier
                                employees promote improved productivity,
                                longevity, and a better workplace culture. Some
                                services offered include nutrition
                                presentations, interactive activities, or 1:1
                                counselling sessions.
                                <br />
                                <br />
                                Contact us today to discuss the unique needs of
                                your organisation.
                            </p>
                            <h3>Menu Review</h3>
                            <p>
                                Do you provide meals as part of your business?
                                Provide assurance of nutritional balance, and
                                credibility to clients by having your menu
                                reviewed and critiqued by a registered
                                dietitian.
                                <br />
                                <br />
                                Contact us today to discuss the unique needs of
                                your organisation.
                            </p>
                            <div
                                className="appointment"
                                onClick={() => {
                                    window.open(
                                        "https://my.practicebetter.io/#/649ca3c56d0b43d466e3b1f8/bookings?step=services",
                                        "_blank"
                                    );
                                }}
                            >
                                Book Appointment
                            </div>
                            <img src={nutritionImg} alt="nutrition" />
                        </>
                    )
                }
                {
                    // Training Services
                    serviceSelected === "training" && (
                        <>
                            <h3>Online Coaching</h3>
                            <p>
                                Discover the ultimate online coaching experience
                                with a personalized program and consistent
                                support. Our online coaching program is
                                delivered in 4-week intervals with a tailored
                                workout plan, weekly video review and feedback,
                                and on-demand expert guidance through virtual
                                support with your coach. <br />
                                <br />
                                $150 / 4-weeks
                            </p>
                            <h3>Personal Training</h3>
                            <p>
                                Experience personalized 1:1 coaching with hands
                                on guidance, immediate feedback, and continuous
                                support throughout your session. Our personal
                                training sessions include a customized weekly
                                program to follow, ensuring continuous progress
                                in between sessions with your coach.
                                <br />
                                <br />1 x per week - $100 per session <br />2 x
                                per week - $90 per session <br />
                                3+ x per week - $75 per session <br />
                                <br />
                                Already a client of online coaching? Add an
                                in-person coaching session for $75 <br />
                                <br />
                                Looking for a personal training session without
                                a program to follow? $90 per session.
                            </p>
                            <h3>Team Strength and Conditioning</h3>
                            <p>
                                Enhance performance, prevent injuries, and
                                foster resilience within your team through
                                expertly crafted strength and conditioning
                                programs. Bring your athlete preparation to the
                                next level with a periodized program tailored to
                                the needs of your athletes. We offer flexible
                                options which can accommodate a wide range of
                                team sizes and budgets. <br />
                                <br />
                                Contact us today to learn more.
                            </p>
                            <div
                                className="appointment"
                                onClick={() => {
                                    window.open(
                                        "https://my.practicebetter.io/#/649ca3c56d0b43d466e3b1f8/bookings?step=services",
                                        "_blank"
                                    );
                                }}
                            >
                                Book Appointment
                            </div>
                            <img src={trainingImg} alt="training" />
                        </>
                    )
                }
            </div>
        </MobileDiv>
    );
};

export const MobileDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 2vh;
    padding-bottom: 2vh;
    min-height: calc(100vh - 100px - 4vh);

    & > .service-select {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

        & > .button {
            color: #333;
            padding: 1vh 2vw;
            border: solid 2px #333;
            border-radius: 2vw;
            background-color: #d0dceb;
            transition: all 0.3s;
            font-size: 4.5vw;
            box-shadow: 3px 3px 2px #333;
            width: 40vw;
        }
        & > .button:hover {
            cursor: pointer;
        }
        & > .active {
            background-color: #87ceeb;
            box-shadow: 0px 0px 2px gray;
            translate: 2px 2px;
        }
    }

    & > .service-info {
        margin: 0vh 2vw 0 2vw;
        flex: 1;
        padding: 1vh 1vw;
        border-radius: 5vw;
        display: flex;
        flex-direction: column;
        text-align: justify;
        align-items: center;

        & > h3 {
            text-align: center;
            font-size: 3vh;
            font-weight: 700;
            padding-top: 2vh;
        }
        & > p {
            padding: 0 1.5vw;
            font-size: 2vh;
        }

        & > .appointment {
            border: solid 2px #333;
            color: #333;
            border-radius: 3vw;
            position: relative;
            font-size: 3vh;
            padding: 1vh 2vw;
            box-shadow: 2px 2px 2px #333;
            background-color: #d0dceb;
        }

        & > img {
            margin-top: 3vh;
            max-width: 70vw;
            max-height: 40vh;
        }
    }
`;
