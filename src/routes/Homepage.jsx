import { useState, useEffect, useRef } from "react";
import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";
import { styled } from "styled-components";
import krystinBusiness from "../images/krystin-business-01.jpg";
import krystinGym from "../images/krystin-gym-01.jpg";
import krystinWrestling from "../images/krystin-wrestling-01.jpg";
import { Link } from "react-router-dom";
import InstagramLink from "../components/InstagramLink";
import LinkedInLink from "../components/LinkedInLink";
import EmailLink from "../components/EmailLink";
import handSwipe from "../images/slide-left-right-icon.svg";

const Homepage = () => {
    return (
        <>
            <DesktopLayout content={<DesktopContent />} />
            <MobileLayout content={<MobileContent />} />
        </>
    );
};

export default Homepage;

export const DesktopContent = () => {
    return (
        <DesktopDiv>
            <div className="carousel">
                <DesktopCarousel />
            </div>
            <div className="preview-items">
                <DesktopPreview />
            </div>
        </DesktopDiv>
    );
};

export const DesktopDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    margin: 5px;

    & > .carousel {
        width: 40%;
        margin-right: 5px;
    }

    & > .preview-items {
        width: 60%;
        margin-left: 5px;
    }
`;

export const CarouselDiv = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;

    & > .img-div {
        height: 70%;
        z-index: 1;

        & > img {
            position: absolute;
            transition: all 1s;
        }

        & > .img-bg {
            height: 70%;
            width: 100%;
            opacity: 0.3;
            left: 0%;
            border-radius: 10px;
            border: 2px solid #333;
        }

        & > .img-show {
            top: 35%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 100%;
            max-height: 70%;
            z-index: 2;
            opacity: 1;
            padding: 0.1vh 0.1vw;
        }

        & > .img-hide {
            top: 35%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 100%;
            max-height: 70%;
            z-index: 2;
            opacity: 0;
        }
    }

    & > button {
        font-size: 25px;
        width: 6%;
        height: 70%;
        border: 0px solid lightgray;
        background-color: #333;
        color: lightgray;
        transition: all 0s;
    }

    & > .left {
        position: absolute;
        top: 0%;
        left: 0%;
        z-index: 3;
        border-radius: 10px 0 0 10px;
        &:active {
            transition: all 100ms;
            box-shadow: 0 0;
            translate: -5px;
        }
    }

    & > .right {
        position: absolute;
        top: 0%;
        right: 0%;
        z-index: 3;
        border-radius: 0 10px 10px 0;
        &:active {
            transition: all 100ms;
            box-shadow: 0 0;
            translate: 5px 0px;
        }
    }

    p {
        font-size: calc(min(1.6vw, 2.5vh));
        padding-left: 2%;
        padding-right: 2%;
        text-align: center;
        overflow: auto;
    }
`;

export const DesktopCarousel = () => {
    const [imgNumber, setImgNumber] = useState(1);
    let current_num = useRef(imgNumber);
    let timerID = useRef(null);

    const handleClick = (side) => {
        if (side === "left") {
            if (imgNumber > 1) {
                setImgNumber(imgNumber - 1);
                current_num.current--;
            } else {
                setImgNumber(3);
                current_num.current = 3;
            }
            clearInterval(timerID.current);
        }
        if (side === "right") {
            if (imgNumber < 3) {
                setImgNumber(imgNumber + 1);
                current_num.current++;
            } else {
                setImgNumber(1);
                current_num.current = 1;
            }
        }
        clearInterval(timerID.current);
    };

    useEffect(() => {
        timerID.current = setInterval(() => {
            current_num.current < 3
                ? current_num.current++
                : (current_num.current = 1);
            setImgNumber(current_num.current);
        }, 5000);

        return () => clearInterval(timerID.current);
    }, [imgNumber]);

    return (
        <CarouselDiv>
            <div className="img-div">
                {/*
                    Different Images to be added to the Carousel go here
                    The captions go in the div below
                 */}
                <img
                    loading="lazy"
                    className={imgNumber === 1 ? "img-show" : "img-hide"}
                    src={krystinBusiness}
                    alt="Krystin Business Portrait"
                />
                <img
                    loading="lazy"
                    className={imgNumber === 2 ? "img-show" : "img-hide"}
                    src={krystinGym}
                    alt="test2"
                />
                <img
                    loading="lazy"
                    className={imgNumber === 3 ? "img-show" : "img-hide"}
                    src={krystinWrestling}
                    alt="test3"
                />
                <img
                    loading="lazy"
                    className="img-bg"
                    src={
                        imgNumber === 1
                            ? krystinBusiness
                            : imgNumber === 2
                            ? krystinGym
                            : krystinWrestling
                    }
                    alt="test1"
                ></img>
            </div>
            <div
                style={{
                    height: "30%",
                    position: "absolute",
                    bottom: "0%",
                    width: "100%",
                    backgroundColor: "darkgray",
                    zIndex: "2",
                    color: "#333",
                    border: "solid #333 calc(min(0.5vw,0.5vh))",
                    borderRadius: "1vw",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "auto",
                    fontWeight: "bold",
                }}
            >
                {/*
                    The captions for the images go here. Make sure to add a conditional 
                    show depending on the image showing based on the variable 'imgNumber'
                */}
                {imgNumber === 1 && (
                    <p>
                        Achieve your goals by mastering both nutrition and
                        training. Discover the power of coaching that seamlessly
                        bridges the worlds of nutrition and training!
                    </p>
                )}
                {imgNumber === 2 && (
                    <p>
                        You are unique, and your program should be too. Unlock
                        your potential with personalised coaching through
                        nutrition and training programs that have been tailored
                        to your unique goals and aspirations.
                    </p>
                )}
                {imgNumber === 3 && (
                    <p>
                        Can you see where you want to go, but are having trouble
                        getting there? Partner with us and find clarity on your
                        journey. Remove the guesswork, and start working on a
                        plan to bring your dreams to life today!
                    </p>
                )}
            </div>
            <button
                className="left"
                onClick={() => {
                    handleClick("left");
                }}
            >
                <div style={{ position: "relative" }}>
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-55%, -55%)",
                        }}
                    >
                        <i className="bi bi-chevron-double-left"></i>
                    </div>
                </div>
            </button>
            <button
                className="right"
                onClick={() => {
                    handleClick("right");
                }}
            >
                <div style={{ position: "relative" }}>
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-45%, -55%)",
                        }}
                    >
                        <i className="bi bi-chevron-double-right"></i>
                    </div>
                </div>
            </button>
        </CarouselDiv>
    );
};

export const PreviewDiv = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: space-evenly;

    & > .preview-item {
        margin: 1vh 1vw;
        border: solid #333 calc(min(0.5vw, 0.5vh));
        border-radius: 1vw;
        background-color: darkgray;
        transition: 0.5s;
        overflow: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;

        & > h3 {
            padding-top: 2vh;
            font-weight: 700;
            font-size: calc(min(3vw, 3vh));
        }

        & > div {
            font-size: calc(min(2.5vw, 2.5vh));
            font-weight: bold;

            & .preview-btn {
                background-color: #d0dceb;
                border: 2px solid #333;
                border-radius: 10px;
                padding: 1vh 2vw;
                color: #333;
                box-shadow: 3px 3px 2px #333;

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
    }
`;

export const DesktopPreview = () => {
    return (
        <PreviewDiv>
            <div className="preview-item">
                <h3>Book Your Consultation Today</h3>
                <div>Online and in-person options available</div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                        className="preview-btn"
                        onClick={() => {
                            window.open(
                                "https://my.practicebetter.io/#/649ca3c56d0b43d466e3b1f8/bookings?step=services",
                                "_blank"
                            );
                        }}
                    >
                        Book Appointment
                    </div>
                </div>
            </div>
            <div className="preview-item">
                <h3>Expert Support for You</h3>
                <div>Get to know your nutrition and training expert</div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="preview-btn">
                        <Link
                            style={{
                                textDecoration: "inherit",
                                color: "inherit",
                            }}
                            to="/about"
                        >
                            Read More
                        </Link>
                    </div>
                </div>
            </div>
            <div className="preview-item">
                <h3>Stay in Touch</h3>
                <div>Connect with us on social media or send us an email</div>
                <div
                    style={{
                        display: "flex",
                        height: "100px",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                    }}
                >
                    <InstagramLink width="min(4vw, 8vh)" />
                    <LinkedInLink width="min(4vw, 8vh)" />
                    <EmailLink width="min(4vw, 8vh)" />
                </div>
            </div>
        </PreviewDiv>
    );
};

export const MobileContent = () => {
    return (
        <MobileDiv>
            <div className="carousel-div">
                <MobileCarousel />
            </div>
            <MobilePreview />
        </MobileDiv>
    );
};

export const MobileDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-width: 0.5vh 0 0 0;
    border-color: #333;
    border-style: solid;

    & > .carousel-div {
        height: 70vh;
        display: flex;
        width: 100vw;
        flex-direction: row;

        & > .carousel {
            opacity: 0.5;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            animation-name: appear;
            animation-duration: 0.5s;
            animation-delay: 2.5s;
            animation-fill-mode: forwards;

            & > img {
                position: absolute;
                transition: all 1s;
            }

            & > .img-show {
                top: 2vh;
                max-width: 95vw;
                margin-left: 2vw;
                margin-right: 2vw;
                max-height: 65vh;
                opacity: 1;
                transition: all 1s;
                z-index: 2;
                border-radius: 5vw;
            }
            & > .img-hide {
                max-width: 40vw;
                max-height: 70vh;
                opacity: 0;
            }
            & > .img-bg {
                width: 100%;
                height: 100%;
                opacity: 0.3;
                z-index: 1;
            }
        }
        @keyframes appear {
            0% {
                opacity: 0.5;
            }
            100% {
                opacity: 1;
            }
        }
        & > .caption {
            position: absolute;
            top: 42vh;
            left: 7vw;
            width: 86vw;
            height: 28vh;
            z-index: 3;
            background-color: #333;
            border: 2px solid lightgray;
            opacity: 0.95;
            border-radius: 5vw;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        & > .scroll-hand-container {
            opacity: 1;
            position: absolute;
            color: aliceblue;
            top: 10vh;
            height: 20vh;
            width: 80vw;
            z-index: 3;
            left: 10vw;
            font-weight: 900;
            display: flex;
            flex-direction: column;
            padding: 1vh 0;
            animation-name: vanish;
            animation-duration: 0.5s;
            animation-delay: 2.5s;
            animation-fill-mode: forwards;
            align-items: center;
            justify-content: center;

            & > .hand {
                width: 15vw;
                height: 15vw;
                justify-self: center;
                animation-name: show-swipe;
                animation-duration: 2s;
                animation-delay: 0.5s;
                animation-fill-mode: forwards;
            }
            @keyframes show-swipe {
                0% {
                    translate: 0 0;
                }
                33% {
                    translate: -7vw 0;
                    transform: rotate(-30deg);
                }
                66% {
                    translate: 7vw 0;
                    transform: rotate(30deg);
                }
                100% {
                    translate: 0 0;
                }
            }
        }
        @keyframes vanish {
            0% {
                opacity: 0.9;
            }
            100% {
                opacity: 0;
                content-visibility: hidden;
            }
        }
    }

    p {
        color: lightgray;
        font-size: max(2.2vh, 2vw);
        padding-left: 2%;
        padding-right: 2%;
        text-align: center;
    }

    & > .previews {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        border-width: 1vh 0 0.5vh 0;
        border-color: #333;
        border-style: solid;
        padding: 0 2vh 2vh;
        justify-content: space-evenly;
        flex: 1;
        background-color: #333;

        & > .preview-item {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            height: max(10vh, 10vw);
            border-radius: 2vw;
            overflow: hidden;
            font-weight: 500;
            border: 0.5vw solid #333;
            margin-top: 2vh;
            background-color: lightgray;

            & h3 {
                padding-top: 2vh;
                font-size: max(2.5vh, 2.5vw);
                font-weight: 800;
            }

            & > p {
                content-visibility: hidden;
            }
            & > .links {
                content-visibility: hidden;
            }
        }

        & > .preview-item-focus {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            min-height: 10vh;
            flex: 2;
            border-radius: 2vw;
            overflow: hidden;
            font-weight: 500;
            border: 0.5vw solid #333;
            justify-content: center;
            align-items: center;
            margin-top: 2vh;
            background-color: lightgray;

            h3 {
                padding-top: 2vh;
                font-size: max(2.5vh, 2.5vw);
                font-weight: 800;
            }

            & > p {
                font-size: max(2vh, 2vw);
                font-weight: 500;
                transition: 0.3s;
                color: #333;
                transition: all 0.5s;

                & > .preview-button {
                    border-color: #333;
                    color: #333;
                    background-color: #d0dceb;
                    box-shadow: 3px 3px 2px #333;
                }
            }

            & > .links {
                width: 100%;
                display: flex;
                flex-direction: row;
                height: max(5vw, 5vh);
                align-items: center;
                justify-content: space-evenly;
                margin-bottom: max(2vh, 2vw);
            }
        }

        & span {
            background-color: lightgray;
            border: 2px solid #333;
            border-radius: 10px;
            padding: 10px;
            color: #333;
        }
    }
`;

export const MobileCarousel = () => {
    const [imgNumber, setImgNumber] = useState(1);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    let current_num = useRef(imgNumber);
    let timerID = useRef(null);

    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isRightSwipe) {
            if (imgNumber > 1) {
                setImgNumber(imgNumber - 1);
                current_num.current--;
            } else {
                setImgNumber(3);
                current_num.current = 3;
            }
            clearInterval(timerID.current);
        }
        if (isLeftSwipe) {
            if (imgNumber < 3) {
                setImgNumber(imgNumber + 1);
                current_num.current++;
            } else {
                setImgNumber(1);
                current_num.current = 1;
            }
        }
        clearInterval(timerID.current);
    };

    useEffect(() => {
        timerID.current = setInterval(() => {
            current_num.current < 3
                ? current_num.current++
                : (current_num.current = 1);
            setImgNumber(current_num.current);
        }, 5000);

        return () => clearInterval(timerID.current);
    }, [imgNumber]);

    return (
        <MobileDiv>
            <div
                className="carousel-div"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className="carousel">
                    <img
                        loading="lazy"
                        className={imgNumber === 1 ? "img-show" : "img-hide"}
                        src={krystinBusiness}
                        alt="test1"
                    />
                    <img
                        loading="lazy"
                        className={imgNumber === 2 ? "img-show" : "img-hide"}
                        src={krystinGym}
                        alt="test2"
                    />
                    <img
                        loading="lazy"
                        className={imgNumber === 3 ? "img-show" : "img-hide"}
                        src={krystinWrestling}
                        alt="test3"
                    />
                    <img
                        loading="lazy"
                        className="img-bg"
                        src={
                            imgNumber === 1
                                ? krystinBusiness
                                : imgNumber === 2
                                ? krystinGym
                                : krystinWrestling
                        }
                        alt="test1"
                    ></img>
                </div>
                <div className="scroll-hand-container">
                    <img className="hand" src={handSwipe} alt="hand-swipe" />
                </div>
                <div className="caption">
                    {imgNumber === 1 && (
                        <p>
                            Achieve your goals by mastering both nutrition and
                            training. Discover the power of coaching that
                            seamlessly bridges the worlds of nutrition and
                            training!
                        </p>
                    )}
                    {imgNumber === 2 && (
                        <p>
                            You are unique, and your program should be too.
                            Unlock your potential with personalised coaching
                            through nutrition and training programs that have
                            been tailored to your unique goals and aspirations.
                        </p>
                    )}
                    {imgNumber === 3 && (
                        <p>
                            Can you see where you want to go, but are having
                            trouble getting there? Partner with us and find
                            clarity on your journey. Remove the guesswork, and
                            start working on a plan to bring your dreams to life
                            today!
                        </p>
                    )}
                </div>
            </div>
        </MobileDiv>
    );
};

export const MobilePreview = () => {
    return (
        <div className="previews">
            <div className="preview-item-focus">
                <h3>Book Your Consultation Today</h3>
                <p>Online and in-person options available</p>
                <p>
                    <span
                        className="preview-button"
                        onClick={() => {
                            window.open(
                                "https://my.practicebetter.io/#/649ca3c56d0b43d466e3b1f8/bookings?step=services",
                                "_blank"
                            );
                        }}
                    >
                        Book Appointment
                    </span>
                </p>
            </div>
            <div className="preview-item-focus">
                <h3>Expert Support for You</h3>
                <p>Get to know your nutrition and training expert</p>
                <p>
                    <span className="preview-button">
                        <Link
                            style={{
                                textDecoration: "inherit",
                                color: "inherit",
                            }}
                            to="/about"
                        >
                            Read More
                        </Link>
                    </span>
                </p>
            </div>
            <div className="preview-item-focus">
                <h3>Stay in Touch</h3>
                <p>Connect with us on social media or send us an email</p>
                <div className="links">
                    <InstagramLink
                        width="min(10vw, 8vh)"
                        height="min(10vw, 8vh)"
                    />
                    <LinkedInLink
                        width="min(10vw, 8vh)"
                        height="min(10vw, 8vh)"
                    />
                    <EmailLink width="min(10vw, 8vh)" height="min(10vw, 8vh)" />
                </div>
            </div>
        </div>
    );
};
