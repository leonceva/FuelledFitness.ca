import { React, useState, useEffect, useRef } from "react";
import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";
import { styled } from "styled-components";
import test1 from "../images/ARC00892.jpg";
import test2 from "../images/DSC05302.jpg";
import test3 from "../images/39753925763_e25c9d8c3b_b.jpg";
import { Link } from "react-router-dom";
import InstagramLink from "../components/InstagramLink";
import LinkedInLink from "../components/LinkedInLink";
import EmailLink from "../components/EmailLink";

const Homepage = () => {
    return (
        <>
            <DesktopLayout
                LeftSide={<p>Left Side</p>}
                RightSide={<p>Right Side</p>}
                content={<DesktopContent />}
            />
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
                <Preview />
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
        }

        & > .img-show {
            top: 35%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 100%;
            max-height: 70%;
            z-index: 2;
            opacity: 1;
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
        font-size: 40px;
        width: 40px;
        height: 40px;
        border-width: 2.5px;
        border-style: solid;
        border-color: #333;
        color: #333;
        border-radius: 15%;
        align-items: end;
        align-content: end;
        background-color: lightgray;
        transition: all 0.3s;

        &:hover {
            background-color: gray;
            transition: all 0.3s;
        }
    }

    & > .left {
        position: absolute;
        top: 50%;
        left: 0%;
        z-index: 3;
    }

    & > .right {
        position: absolute;
        top: 50%;
        right: 0%;
        z-index: 3;
    }

    p {
        font-size: 20px;
        padding-left: 2%;
        padding-right: 2%;
        text-align: center;
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
                    className={imgNumber === 1 ? "img-show" : "img-hide"}
                    src={test1}
                    alt="test1"
                />
                <img
                    className={imgNumber === 2 ? "img-show" : "img-hide"}
                    src={test2}
                    alt="test2"
                />
                <img
                    className={imgNumber === 3 ? "img-show" : "img-hide"}
                    src={test3}
                    alt="test3"
                />
                <img
                    className="img-bg"
                    src={
                        imgNumber === 1
                            ? test1
                            : imgNumber === 2
                            ? test2
                            : test3
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
                    backgroundColor: "#333",
                    zIndex: "2",
                    color: "white",
                    borderRadius: "10px",
                    display: "flex",
                    overflow: "hidden",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {/*
                    The captions for the images go here. Make sure to add a conditional 
                    show depending on the image showing based on the variable 'imgNumber'
                */}
                {imgNumber === 1 && (
                    <p>
                        Fuel Your Health & Performance: Nutrition for All -
                        General Population and Athletes Alike, Welcome Aboard!
                        Get Ready for a Nourishing Journey
                    </p>
                )}
                {imgNumber === 2 && (
                    <p>
                        Let's Unlock Your Health Potential with My BSc. Food
                        Science with a Specialization in Dietetics, and B.
                        Kinesiology
                    </p>
                )}
                {imgNumber === 3 && (
                    <p>
                        As a national-level athlete in wrestling and
                        powerlifting, I bring invaluable experience to my
                        training, ensuring your success with personalized
                        expertise and dedication.
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
                        {"<"}
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
                        {">"}
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
        position: relative;
        margin: 2.5px 5px;
        min-height: 10%;
        border-radius: 10px;
        background-color: darkgray;
        transition: 0.5s;
        flex: 1;
        padding: 5px;
        overflow: hidden;
        font-weight: 500;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        &:hover {
            transition: 1s;
            flex: 2;
            width: calc(100% - 10px);
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
        }

        & > p {
            font-size: 20px;
            font-weight: 500;
            opacity: 0.5;
            transition: 0.3s;
        }

        &:hover > p {
            opacity: 1;
            transition: all 0.3s;
        }

        & > img {
            max-width: 100%;
            max-height: 100%;
            content-visibility: hidden;
        }

        &:hover > img {
            max-width: 100%;
            content-visibility: visible;
        }
    }

    & > .preview-item-focus {
        position: relative;
        margin: 2.5px 5px;
        min-height: 10%;
        border-radius: 10px;
        background-color: darkgray;
        transition: 0.5s;
        flex: 2;
        padding: 5px;
        overflow: hidden;
        font-weight: 500;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        & > p {
            font-size: 20px;
            font-weight: 500;
            opacity: 1;
            transition: 0.3s;
        }

        & > img {
            max-width: 100%;
            max-height: 100%;
        }
    }

    & h3 {
        padding-top: 2%;
        font-weight: 800;
        display: flex;
        justify-content: center;
    }

    & span {
        background-color: lightgray;
        border: 2px solid #333;
        border-radius: 10px;
        padding: 10px;
        color: #333;

        &:hover {
            background-color: gray;
            cursor: pointer;
        }
    }
`;

export const Preview = () => {
    const [previewSelected, setPreviewSelected] = useState(0);

    const handleClick = () => {
        document.addEventListener(
            "click",
            (e) => {
                e.preventDefault();
                e.stopPropagation();
                setPreviewSelected(0);
            },
            { once: true }
        );
    };

    return (
        <PreviewDiv>
            <div
                className={
                    previewSelected === 1
                        ? "preview-item-focus"
                        : "preview-item"
                }
                onClick={() => {
                    setPreviewSelected(1);
                    document.addEventListener(
                        "click",
                        (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleClick();
                        },
                        { once: true }
                    );
                }}
            >
                <h3>Empower Your Health - Book Your Consultation</h3>
                <p>Online and In-Person options available!</p>
                <p>
                    <span
                        onClick={() => {
                            window.open(
                                "https://my.practicebetter.io/#/649ca3c56d0b43d466e3b1f8/bookings?step=services",
                                "_blank"
                            );
                        }}
                    >
                        Let's Get Started
                    </span>
                </p>
            </div>
            <div
                className={
                    previewSelected === 2
                        ? "preview-item-focus"
                        : "preview-item"
                }
                onClick={() => {
                    setPreviewSelected(2);
                    document.addEventListener(
                        "click",
                        (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleClick();
                        },
                        { once: true }
                    );
                }}
            >
                <h3>Inspiring Healthier Lives</h3>
                <p>
                    Get to Know Your Dedicated Dietitian and Personal Trainer!
                </p>
                <p>
                    <span>
                        <Link
                            style={{
                                textDecoration: "inherit",
                                color: "inherit",
                            }}
                            to="/aboutMe"
                        >
                            Read My Story
                        </Link>
                    </span>
                </p>
            </div>
            <div
                className={
                    previewSelected === 3
                        ? "preview-item-focus"
                        : "preview-item"
                }
                onClick={() => {
                    setPreviewSelected(3);
                    document.addEventListener(
                        "click",
                        (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleClick();
                        },
                        { once: true }
                    );
                }}
            >
                <h3>Discover the Path to Sustainable Health</h3>
                <p>Connect with Us on Socials or Send us an Email</p>
                <div
                    style={{
                        display: "flex",
                        height: "100px",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                    }}
                >
                    <InstagramLink width="4vw" />
                    <LinkedInLink width="4vw" />
                    <EmailLink width="4vw" />
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
            <div className="previews">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa,
                sit? Mollitia, voluptatem corporis quibusdam officiis quaerat
                nihil eaque aut, eum ratione eveniet possimus distinctio
                perspiciatis voluptas temporibus suscipit. Quaerat, sit. Ea
                minima maiores, laudantium neque numquam ab qui voluptatibus
                eveniet dolorem culpa, mollitia voluptatum sequi. Corporis
                voluptas odio nemo. Velit facilis dolor porro nisi commodi fuga
                natus ratione, et voluptate. Accusantium earum odio sunt alias
                quo est, distinctio maxime assumenda, accusamus enim aspernatur
                dolore ratione ipsum cupiditate ea obcaecati, soluta autem sint
                fugiat laudantium provident eos molestias ab. Voluptas, eos.
                Alias natus accusantium sint voluptatum tenetur dolore molestias
                beatae vitae modi voluptas unde, illo odio ab perferendis
                dolores. Fugiat ab error minus iusto impedit quam aut distinctio
                ad recusandae corporis. Vitae rem, mollitia quidem, quod dolor,
                officiis optio molestias hic deleniti necessitatibus eum
                perferendis voluptatem eaque iure architecto aliquid facilis
                nobis sunt! Perspiciatis eveniet neque nesciunt pariatur, optio
                distinctio. Illo!
            </div>
        </MobileDiv>
    );
};

export const MobileDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    border-width: 0.5vh 0 0 0;
    border-color: #333;
    border-style: solid;

    & > .carousel-div {
        height: 70vh;
        display: flex;
        flex-direction: row;

        & > .carousel {
            position: absolute;
            left: 5vw;

            width: 90vw;
            height: 70vh;
            display: flex;
            flex-direction: column;
            align-items: center;

            & > img {
                position: absolute;
                transition: all 1s;
            }

            & > .img-show {
                top: 2vh;
                max-width: 86vw;
                margin-left: 2vw;
                margin-right: 2vw;
                max-height: 68vh;
                opacity: 1;
                transition: all 1s;
                z-index: 2;
                border-radius: 10%;
            }
            & > .img-hide {
                max-width: 40vw;
                max-height: 70vh;
                opacity: 0;
            }
            & > .img-bg {
                width: 90vw;
                height: 70vh;
                opacity: 0.3;
                z-index: 1;
            }
        }
        & > .left-arrow {
            position: absolute;
            left: 0vw;
            width: 5vw;
            height: 70vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #333;
            font-size: 20px;
            font-weight: 600;
            color: lightgray;
        }
        & > .right-arrow {
            position: absolute;
            right: 0vw;
            width: 5vw;
            height: 70vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #333;
            font-size: 20px;
            font-weight: 600;
            color: lightgray;
        }
        & > .caption {
            position: absolute;
            top: 40vh;
            left: 7vw;
            width: 86vw;
            height: 28vh;
            z-index: 3;
            background-color: #333;
            border: 2px solid lightgray;
            opacity: 0.95;
            border-radius: 10%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    p {
        color: lightgray;
        font-size: 2.2vh;
        padding-left: 2%;
        padding-right: 2%;
        text-align: center;
    }

    & > .previews {
        display: flex;
        border-width: 1vh 0 0 0;
        border-color: #333;
        border-style: solid;
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
                <div className="left-arrow">
                    <p>
                        &lt;
                        <br />
                        &lt;
                        <br />
                        &lt;
                    </p>
                </div>
                <div className="carousel">
                    <img
                        className={imgNumber === 1 ? "img-show" : "img-hide"}
                        src={test1}
                        alt="test1"
                    />
                    <img
                        className={imgNumber === 2 ? "img-show" : "img-hide"}
                        src={test2}
                        alt="test2"
                    />
                    <img
                        className={imgNumber === 3 ? "img-show" : "img-hide"}
                        src={test3}
                        alt="test3"
                    />
                    <img
                        className="img-bg"
                        src={
                            imgNumber === 1
                                ? test1
                                : imgNumber === 2
                                ? test2
                                : test3
                        }
                        alt="test1"
                    ></img>
                </div>
                <div className="right-arrow">
                    <p>
                        &gt;
                        <br />
                        &gt;
                        <br />
                        &gt;
                    </p>
                </div>
                <div className="caption">
                    {imgNumber === 1 && (
                        <p>
                            Fuel Your Health & Performance: Nutrition for All -
                            General Population and Athletes Alike, Welcome
                            Aboard! Get Ready for a Nourishing Journey
                        </p>
                    )}
                    {imgNumber === 2 && (
                        <p>
                            Let's Unlock Your Health Potential with My BSc. Food
                            Science with a Specialization in Dietetics, and B.
                            Kinesiology
                        </p>
                    )}
                    {imgNumber === 3 && (
                        <p>
                            As a national-level athlete in wrestling and
                            powerlifting, I bring invaluable experience to my
                            training, ensuring your success with personalized
                            expertise and dedication.
                        </p>
                    )}
                </div>
            </div>
        </MobileDiv>
    );
};
