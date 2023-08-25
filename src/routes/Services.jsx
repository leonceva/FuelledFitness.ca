import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";
import placeholder from "../images/DSC05295.jpg";
import nutritionImg from "../images/ARC00892.jpg";
import trainingImg from "../images/45803572975_9f20326737_b.jpg";

const Services = () => {
    const [serviceSelected, setServiceSelected] = useState("none");
    const location = useLocation();

    useEffect(() => {
        if (location.hash.slice(1) === "") {
            setServiceSelected("none");
        } else {
            setServiceSelected(location.hash.slice(1));
        }
    }, [location]);

    return (
        <>
            <DesktopLayout
                content={<DesktopContent serviceSelected={serviceSelected} />}
            />
            <MobileLayout
                content={<MobileContent serviceSelected={serviceSelected} />}
            />
        </>
    );
};

export default Services;

export const DesktopContent = (props) => {
    const serviceSelected = props.serviceSelected;
    const navigate = useNavigate();
    const [option, setOption] = useState(null);

    const handleClick = (service) => {
        navigate(`#${service}`);
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
                                    handleClick("nutrition");
                                }}
                            >
                                Nutrition
                            </ServiceButton>
                            <ServiceButton
                                onClick={() => {
                                    handleClick("training");
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
                                        setOption(null);
                                        handleClick("none");
                                    }}
                                    className="bi bi-arrow-left go-back-btn"
                                />
                            </span>
                            <h3>Nutrition Services</h3>
                            <InfoButton
                                style={{ animationDelay: "0.5s" }}
                                onClick={() =>
                                    setOption("personal-counselling")
                                }
                            >
                                In-Person Counselling
                            </InfoButton>
                            <InfoButton
                                style={{ animationDelay: "0.7s" }}
                                onClick={() => setOption("online-counselling")}
                            >
                                Online Counselling
                            </InfoButton>
                            <InfoButton
                                style={{ animationDelay: "0.5s" }}
                                onClick={() => setOption("team-counselling")}
                            >
                                Team Sports
                            </InfoButton>
                            <InfoButton
                                style={{ animationDelay: "0.7s" }}
                                onClick={() =>
                                    setOption("corporate-counselling")
                                }
                            >
                                Corporate Packages
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
                                        setOption(null);
                                        handleClick("none");
                                    }}
                                    className="bi bi-arrow-left go-back-btn"
                                />
                            </span>
                            <h3>Training Services</h3>
                            <InfoButton
                                onClick={() => setOption("personal-training")}
                            >
                                Personal Session
                            </InfoButton>
                            <InfoButton
                                onClick={() => setOption("group-training")}
                            >
                                Group Session
                            </InfoButton>
                            <InfoButton
                                onClick={() => setOption("online-training")}
                            >
                                Online Coaching
                            </InfoButton>
                            <InfoButton
                                onClick={() => setOption("team-training")}
                            >
                                Corporate And Teams
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
                    serviceSelected={serviceSelected}
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
        justify-content: center;
        align-items: center;
        position: relative;

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
            background-color: aliceblue;
            box-shadow: 3px 3px 2px #333;
            margin: 2vh 0;
            width: 100%;
        }
        & > .other-service {
            background-color: rgb(241, 124, 143);
        }
        & > div:hover {
            background-color: gray;
            cursor: pointer;
        }
        & > div:active {
            box-shadow: 0 0;
            translate: 3px 3px;
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
        transition: width 1s;
        width: 100%;
        overflow-y: auto;
        border-radius: 10% 0% 0% 10%;
    }
    & > .hide {
        transition: width 0.25s;
        width: 0%;
        border-width: 0px;
        content-visibility: hidden;
    }
`;

export const InfoDesktop = (props) => {
    const option = props.option;
    const service = props.serviceSelected;

    // Text to display based on option chose
    return (
        <>
            {option === null && (
                <>
                    <InfoDiv>
                        <h3>Select one of the options to learn more</h3>
                        <div className="img-container">
                            {service === "nutrition" && (
                                <img src={nutritionImg} alt="nutrition" />
                            )}
                            {service === "training" && (
                                <img src={trainingImg} alt="training" />
                            )}
                        </div>
                    </InfoDiv>
                </>
            )}
            {option === "personal-counselling" && (
                <>
                    <h2>Personal Counselling</h2>
                    <p>
                        Personal counseling with a registered dietitian offers
                        tailored one-on-one sessions to address individual
                        nutrition needs and goals. Beginning with a thorough
                        assessment, the dietitian crafts a personalized
                        nutrition plan. This plan, aligned with objectives like
                        weight management or chronic condition management, is
                        complemented by education on essential nutrients and
                        portion control. Collaborative meal planning strategies
                        empower clients to make healthier choices. Behavior
                        change support, continuous monitoring, and plan
                        adjustments ensure progress. Registered dietitians also
                        offer specialized guidance for conditions like diabetes.
                        Through ongoing support and a holistic approach,
                        individuals gain the knowledge and skills to
                        independently make informed dietary decisions, promoting
                        lasting well-being.
                    </p>
                </>
            )}
            {option === "online-counselling" && (
                <>
                    <h2>Online Counselling</h2>
                    <p>
                        Online nutrition services provide personalized guidance
                        through virtual sessions. Starting with a detailed
                        assessment, these services create customized nutrition
                        plans to meet individual goals, such as weight
                        management or fitness enhancement. Education on
                        nutrients, portion control, and meal planning is
                        conveyed digitally. Clients receive behavioral
                        strategies, ongoing progress tracking, and plan
                        adjustments for effective results. Specialized support
                        is available for conditions like allergies or heart
                        health. The online platform ensures convenient access,
                        and holistic well-being is considered. This empowers
                        individuals to make informed dietary choices, fostering
                        lasting health improvements through evidence-based
                        virtual nutrition services.
                    </p>
                </>
            )}
            {option === "team-counselling" && (
                <>
                    <h2>Team Sports and Athletics</h2>
                    <p>
                        Team sports counseling involves tailored guidance for
                        athletic groups. Through focused sessions, the team's
                        unique goals and challenges are assessed. Customized
                        strategies are developed to optimize performance,
                        considering factors like nutrition, recovery, and energy
                        management. Education on proper fueling and hydration is
                        provided, enhancing collective understanding.
                        Collaborative planning addresses specific needs,
                        ensuring peak performance. Behavioral tactics and
                        progress monitoring aid in maintaining consistency. The
                        counseling process fosters team cohesion and
                        communication. By addressing individual roles within the
                        team dynamic, this approach maximizes overall
                        performance. Team sports counseling empowers athletes to
                        excel by combining expert guidance, teamwork, and
                        tailored strategies.
                    </p>
                </>
            )}
            {option === "corporate-counselling" && (
                <>
                    <h2>Corporate Packages</h2>
                    <p>
                        Corporate wellness packages by the registered dietitian
                        offer comprehensive health solutions for companies.
                        These packages include personalized nutritional
                        counseling, virtual workshops on balanced eating, and
                        stress management techniques. The programs encompass
                        individual assessments, custom meal plans, and ongoing
                        support to improve employees' well-being. With a focus
                        on nutrition education, these packages promote healthier
                        lifestyles, increase productivity, and foster a positive
                        work environment.
                    </p>
                </>
            )}
            {option === "personal-training" && (
                <>
                    <h2>Individual Training</h2>
                    <p>
                        Individual personal provides focused, one-on-one fitness
                        guidance. Tailored to each client's goals and abilities,
                        sessions incorporate customized workout routines, proper
                        technique, and progress tracking. These training
                        sessions encompass cardio, strength, flexibility, and
                        core exercises, promoting balanced fitness. The personal
                        trainer offers expert coaching, motivation, and
                        accountability, adapting routines as clients progress.
                        This approach ensures efficient and effective workouts,
                        helping clients achieve their fitness objectives while
                        enhancing overall health and well-being.
                    </p>
                </>
            )}
            {option === "group-training" && (
                <>
                    <h2>Groups and Families</h2>
                    <p>
                        Group personal training delivers dynamic fitness
                        sessions for small groups. These sessions combine
                        individual attention with a supportive group atmosphere.
                        Participants benefit from expert guidance in exercises
                        tailored to their fitness levels and goals. The trainer
                        fosters camaraderie, motivation, and accountability
                        within the group. Workouts encompass strength,
                        cardiovascular, and flexibility training, ensuring a
                        well-rounded fitness experience. Group personal training
                        promotes fitness progression, social interaction, and a
                        shared commitment to achieving health goals, all under
                        the guidance of a dedicated professional.
                    </p>
                </>
            )}
            {option === "online-training" && (
                <>
                    <h2>Online</h2>
                    <p>
                        Online training programs offer personalized exercise
                        plans, guidance tailored to individual goals. Through
                        regular check-ins and progress tracking, you will be
                        provided with accountability, to ensure you stay
                        motivated and on track. This combination of structured
                        training, customized guidance, and ongoing
                        accountability empowers clients to achieve their fitness
                        objectives in a flexible and accessible manner.
                    </p>
                </>
            )}
            {option === "team-training" && (
                <>
                    <h2>Corporate and Team Sports</h2>
                    <p>
                        Corporate and team training programs provide tailored
                        fitness solutions for businesses. These programs include
                        on-site workouts or online programs, ergonomic
                        assessments, and wellness workshops. They address
                        individual needs through group exercises, personalized
                        training plans, and stress-relief techniques. These
                        programs enhance physical fitness, boost morale, and
                        improve overall health, leading to increased
                        productivity and performance. Through expert guidance
                        and interactive sessions, corporate and team training
                        programs create a culture of well-being and support.
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
                            <h3>Personal Counselling</h3>
                            <p>
                                Personal counseling with a registered dietitian
                                offers tailored one-on-one sessions to address
                                individual nutrition needs and goals. Beginning
                                with a thorough assessment, the dietitian crafts
                                a personalized nutrition plan. This plan,
                                aligned with objectives like weight management
                                or chronic condition management, is complemented
                                by education on essential nutrients and portion
                                control. Collaborative meal planning strategies
                                empower clients to make healthier choices.
                                Behavior change support, continuous monitoring,
                                and plan adjustments ensure progress. Registered
                                dietitians also offer specialized guidance for
                                conditions like diabetes. Through ongoing
                                support and a holistic approach, individuals
                                gain the knowledge and skills to independently
                                make informed dietary decisions, promoting
                                lasting well-being.
                            </p>
                            <h3>Online Counselling</h3>
                            <p>
                                Online nutrition services provide personalized
                                guidance through virtual sessions. Starting with
                                a detailed assessment, these services create
                                customized nutrition plans to meet individual
                                goals, such as weight management or fitness
                                enhancement. Education on nutrients, portion
                                control, and meal planning is conveyed
                                digitally. Clients receive behavioral
                                strategies, ongoing progress tracking, and plan
                                adjustments for effective results. Specialized
                                support is available for conditions like
                                allergies or heart health. The online platform
                                ensures convenient access, and holistic
                                well-being is considered. This empowers
                                individuals to make informed dietary choices,
                                fostering lasting health improvements through
                                evidence-based virtual nutrition services.
                            </p>
                            <h3>Team Sports and Athletics</h3>
                            <p>
                                Team sports counseling involves tailored
                                guidance for athletic groups. Through focused
                                sessions, the team's unique goals and challenges
                                are assessed. Customized strategies are
                                developed to optimize performance, considering
                                factors like nutrition, recovery, and energy
                                management. Education on proper fueling and
                                hydration is provided, enhancing collective
                                understanding. Collaborative planning addresses
                                specific needs, ensuring peak performance.
                                Behavioral tactics and progress monitoring aid
                                in maintaining consistency. The counseling
                                process fosters team cohesion and communication.
                                By addressing individual roles within the team
                                dynamic, this approach maximizes overall
                                performance. Team sports counseling empowers
                                athletes to excel by combining expert guidance,
                                teamwork, and tailored strategies.
                            </p>
                            <h3>Corporate Packages</h3>
                            <p>
                                Corporate wellness packages by the registered
                                dietitian offer comprehensive health solutions
                                for companies. These packages include
                                personalized nutritional counseling, virtual
                                workshops on balanced eating, and stress
                                management techniques. The programs encompass
                                individual assessments, custom meal plans, and
                                ongoing support to improve employees'
                                well-being. With a focus on nutrition education,
                                these packages promote healthier lifestyles,
                                increase productivity, and foster a positive
                                work environment.
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
                            <h3>Individual Training</h3>
                            <p>
                                Individual personal provides focused, one-on-one
                                fitness guidance. Tailored to each client's
                                goals and abilities, sessions incorporate
                                customized workout routines, proper technique,
                                and progress tracking. These training sessions
                                encompass cardio, strength, flexibility, and
                                core exercises, promoting balanced fitness. The
                                personal trainer offers expert coaching,
                                motivation, and accountability, adapting
                                routines as clients progress. This approach
                                ensures efficient and effective workouts,
                                helping clients achieve their fitness objectives
                                while enhancing overall health and well-being.
                            </p>
                            <h3>Groups and Families</h3>
                            <p>
                                Group personal training delivers dynamic fitness
                                sessions for small groups. These sessions
                                combine individual attention with a supportive
                                group atmosphere. Participants benefit from
                                expert guidance in exercises tailored to their
                                fitness levels and goals. The trainer fosters
                                camaraderie, motivation, and accountability
                                within the group. Workouts encompass strength,
                                cardiovascular, and flexibility training,
                                ensuring a well-rounded fitness experience.
                                Group personal training promotes fitness
                                progression, social interaction, and a shared
                                commitment to achieving health goals, all under
                                the guidance of a dedicated professional.
                            </p>
                            <h3>Online</h3>
                            <p>
                                Online training programs offer personalized
                                exercise plans, guidance tailored to individual
                                goals. Through regular check-ins and progress
                                tracking, you will be provided with
                                accountability, to ensure you stay motivated and
                                on track. This combination of structured
                                training, customized guidance, and ongoing
                                accountability empowers clients to achieve their
                                fitness objectives in a flexible and accessible
                                manner.
                            </p>
                            <h3>Corporate and Team Sports</h3>
                            <p>
                                Corporate and team training programs provide
                                tailored fitness solutions for businesses. These
                                programs include on-site workouts or online
                                programs, ergonomic assessments, and wellness
                                workshops. They address individual needs through
                                group exercises, personalized training plans,
                                and stress-relief techniques. These programs
                                enhance physical fitness, boost morale, and
                                improve overall health, leading to increased
                                productivity and performance. Through expert
                                guidance and interactive sessions, corporate and
                                team training programs create a culture of
                                well-being and support.
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
            background-color: aliceblue;
            transition: all 0.3s;
            font-size: 4.5vw;
            box-shadow: 3px 3px 2px #333;
            width: 40vw;
        }
        & > .button:hover {
            cursor: pointer;
        }
        & > .active {
            border-color: aliceblue;
            color: aliceblue;
            background-color: #333;
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
            background-color: aliceblue;
        }

        & > img {
            margin-top: 3vh;
            max-width: 70vw;
            max-height: 40vh;
        }
    }
`;
