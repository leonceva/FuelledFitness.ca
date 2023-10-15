import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";
import { styled } from "styled-components";
import krystin_img1 from "../images/krystin-business-02.jpg";
import krystin_img2 from "../images/krystin-gym-03.jpg";

const About = () => {
    return (
        <>
            <DesktopLayout content={<DesktopContent />} />
            <MobileLayout content={<MobileContent />} />
        </>
    );
};

export default About;

export const DesktopContent = () => {
    return (
        <DesktopContentDiv>
            <div style={{ margin: "1vh 1vw" }}>
                <h3>About Fuelled Fitness</h3>
                <p>
                    We're your destination for tailored nutrition and training
                    programs, catering to everyone from elite athletes to
                    individuals seeking healthier lifestyles. Our mission is to
                    help you reach peak health and performance through
                    personalised strategies.
                </p>
                <img
                    src={krystin_img1}
                    alt="Krystin Bussiness Portrait"
                    className="left"
                />
                <h3>Krystin Paquette</h3>
                <p>
                    My educational foundation includes a BSc. in Nutrition and
                    Food Science with a specialisation in Dietetics,
                    complemented by a Bachelor of Kinesiology degree. By
                    bridging the areas of nutrition and training, I can offer a
                    comprehensive coaching experience tailored to your unique
                    needs and aspirations.
                </p>
                <p>
                    My approach is always grounded in evidence-based practice,
                    and person-centred principles. I believe in adaptive
                    coaching strategies that are tailored to your goals, and
                    that meet you where you are now in order to effectively get
                    you to where you want to be.
                </p>
                <img
                    src={krystin_img2}
                    alt="Krystin Training Client"
                    className="right"
                />
                <h3>Let's Get Started!</h3>
                <p>
                    Whether you aspire to excel as a high-performance athlete,
                    effectively manage a medical condition, or simply cultivate
                    a healthier lifestyle, we are here to support you every step
                    of the way. Reach out through the contact page, or click the
                    "book appointment" button to get started! <br />
                </p>
                <div className="btn-container">
                    <button
                        className="appointment"
                        onClick={() => {
                            window.open(
                                "https://my.practicebetter.io/#/649ca3c56d0b43d466e3b1f8/bookings?step=services",
                                "_blank"
                            );
                        }}
                    >
                        Book Appointment
                    </button>
                </div>
            </div>
        </DesktopContentDiv>
    );
};

export const DesktopContentDiv = styled.div`
    height: calc(100%);
    overflow-y: auto;
    text-align: justify;

    & img {
        max-height: 45vh;
        max-width: 25vw;
        border-radius: 5%;
    }
    & .left {
        margin-right: 2%;
        float: left;
    }
    & .right {
        margin-left: 2%;
        float: right;
    }

    & .btn-container {
        display: flex;
        justify-content: center;

        & .appointment {
            border: solid 2px #333;
            color: #333;
            border-radius: 3vw;
            font-size: 3vh;
            padding: 1vh 2vw;
            box-shadow: 2px 2px 2px #333;
            background-color: #d0dceb;

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
`;

export const MobileContent = () => {
    return (
        <>
            <MobileContentDiv>
                <div style={{ margin: "10px" }}>
                    <h3>About Fuelled Fitness</h3>
                    <p>
                        We're your destination for tailored nutrition and
                        training programs, catering to everyone from elite
                        athletes to individuals seeking healthier lifestyles.
                        Our mission is to help you reach peak health and
                        performance through personalised strategies.
                    </p>

                    <img
                        src={krystin_img1}
                        alt="Krystin Bussiness Portrait"
                        className="left"
                    />
                    <h3>Krystin Paquette</h3>
                    <p>
                        My educational foundation includes a BSc. in Nutrition
                        and Food Science with a specialisation in Dietetics,
                        complemented by a Bachelor of Kinesiology degree. By
                        bridging the areas of nutrition and training, I can
                        offer a comprehensive coaching experience tailored to
                        your unique needs and aspirations.
                    </p>
                    <p>
                        My approach is always grounded in evidence-based
                        practice, and person-centred principles. I believe in
                        adaptive coaching strategies that are tailored to your
                        goals, and that meet you where you are now in order to
                        effectively get you to where you want to be.
                    </p>
                    <img
                        src={krystin_img2}
                        alt="Krystin Training Client"
                        className="right"
                    />
                    <h3>Let's Get Started!</h3>
                    <p>
                        Whether you aspire to excel as a high-performance
                        athlete, effectively manage a medical condition, or
                        simply cultivate a healthier lifestyle, we are here to
                        support you every step of the way. Reach out through the
                        contact page, or click the "book appointment" button to
                        get started! <br />
                    </p>
                    <div className="btn-container">
                        <button
                            className="appointment"
                            onTouchStart={() => {
                                window.open(
                                    "https://my.practicebetter.io/#/649ca3c56d0b43d466e3b1f8/bookings?step=services",
                                    "_blank"
                                );
                            }}
                        >
                            Book Appointment
                        </button>
                    </div>
                </div>
            </MobileContentDiv>
        </>
    );
};

export const MobileContentDiv = styled.div`
    text-align: start;
    & img {
        max-width: 100%;
        max-height: 35vh;
        border-radius: 5%;
        margin: 1vh 0;
    }
    & .left {
        margin-right: 2vw;
        float: left;
    }
    & .right {
        margin-left: 2vw;
        float: right;
    }
    h3 {
        margin-top: 2vh;
    }

    & .btn-container {
        display: flex;
        justify-content: center;

        & .appointment {
            border: solid 2px #333;
            color: #333;
            border-radius: 3vw;
            font-size: 3vh;
            padding: 1vh 2vw;
            box-shadow: 2px 2px 2px #333;
            background-color: #d0dceb;

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
`;
