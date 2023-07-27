import { React, useState } from "react";
import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";
import { styled } from "styled-components";
import test1 from "../images/ARC00892.jpg";
import test2 from "../images/DSC05302.jpg";
import test3 from "../images/39753925763_e25c9d8c3b_b.jpg";
import { useEffect } from "react";
import { useRef } from "react";

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
                <Carousel />
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
`;

export const Carousel = () => {
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
                <img
                    className={imgNumber === 1 ? "img-show" : "img-hide"}
                    src={test1}
                    alt="test1"
                />
                {imgNumber === 1 && (
                    <img className="img-bg" src={test1} alt="test1"></img>
                )}
                <img
                    className={imgNumber === 2 ? "img-show" : "img-hide"}
                    src={test2}
                    alt="test2"
                />
                {imgNumber === 2 && (
                    <img className="img-bg" src={test2} alt="test2"></img>
                )}
                <img
                    className={imgNumber === 3 ? "img-show" : "img-hide"}
                    src={test3}
                    alt="test3"
                />
                {imgNumber === 3 && (
                    <img className="img-bg" src={test3} alt="test3"></img>
                )}
            </div>
            <div
                style={{
                    height: "30%",
                    position: "absolute",
                    bottom: "0%",
                    width: "100%",
                    opacity: "0.6",
                    backgroundColor: "black",
                    zIndex: "2",
                    color: "white",
                    borderRadius: "10px",
                }}
            >
                <h3>Picture #{imgNumber}</h3>
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
        margin: 5px;
        min-height: 10%;
        border-radius: 10px;
        background-color: green;
        transition: 0.5s;
        flex: 1;
        padding: 5px;
        overflow: hidden;

        &:hover {
            background-color: darkgreen;
            transition: 1s;
            flex: 10;
            width: calc(100% - 10px);
            height: 100%;
        }
        & > h3 {
            font-weight: 800;
        }
    }
`;

export const Preview = () => {
    return (
        <PreviewDiv>
            <div className="preview-item">
                <h3>Preview 1</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quasi tenetur repellendus qui unde, fugit hic eius
                    accusantium, id at repudiandae ratione commodi eum ab quam,
                    laborum natus aperiam corporis in? Earum labore, nihil ipsa
                    corporis ullam, aperiam optio illum necessitatibus porro
                    molestias distinctio quidem harum laboriosam? Beatae
                    excepturi doloremque dolores cum nulla, ad iusto itaque
                    minus reprehenderit esse, nobis ipsam? Omnis fugit mollitia
                    accusantium delectus voluptate, neque nam sunt totam tenetur
                    cumque excepturi laboriosam ea doloribus, cupiditate nisi
                    asperiores minima obcaecati voluptatum aliquam, ad libero
                    voluptas adipisci. Non, sunt debitis? Et, saepe. Doloribus
                    tempora dolores voluptas error, nam, eum ratione sunt
                    obcaecati consequatur quae blanditiis accusamus facilis!
                    Odit, accusamus numquam saepe, rem sit veritatis totam
                    omnis, facilis doloribus quam fugiat? Nobis nostrum, facere
                    magni quidem fugit ducimus quam quibusdam ipsa tempora
                    recusandae earum quia enim nemo consequatur mollitia,
                    doloribus, voluptatem laudantium eos et quisquam expedita
                    repellendus architecto quas. Porro, quo.
                </p>
            </div>
            <div className="preview-item">
                <h3>Preview 2</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quasi tenetur repellendus qui unde, fugit hic eius
                    accusantium, id at repudiandae ratione commodi eum ab quam,
                    laborum natus aperiam corporis in? Earum labore, nihil ipsa
                    corporis ullam, aperiam optio illum necessitatibus porro
                    molestias distinctio quidem harum laboriosam? Beatae
                    excepturi doloremque dolores cum nulla, ad iusto itaque
                    minus reprehenderit esse, nobis ipsam? Omnis fugit mollitia
                    accusantium delectus voluptate, neque nam sunt totam tenetur
                    cumque excepturi laboriosam ea doloribus, cupiditate nisi
                    asperiores minima obcaecati voluptatum aliquam, ad libero
                    voluptas adipisci. Non, sunt debitis? Et, saepe. Doloribus
                    tempora dolores voluptas error, nam, eum ratione sunt
                    obcaecati consequatur quae blanditiis accusamus facilis!
                    Odit, accusamus numquam saepe, rem sit veritatis totam
                    omnis, facilis doloribus quam fugiat? Nobis nostrum, facere
                    magni quidem fugit ducimus quam quibusdam ipsa tempora
                    recusandae earum quia enim nemo consequatur mollitia,
                    doloribus, voluptatem laudantium eos et quisquam expedita
                    repellendus architecto quas. Porro, quo.
                </p>
            </div>
            <div className="preview-item">
                <h3>Preview 3</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quasi tenetur repellendus qui unde, fugit hic eius
                    accusantium, id at repudiandae ratione commodi eum ab quam,
                    laborum natus aperiam corporis in? Earum labore, nihil ipsa
                    corporis ullam, aperiam optio illum necessitatibus porro
                    molestias distinctio quidem harum laboriosam? Beatae
                    excepturi doloremque dolores cum nulla, ad iusto itaque
                    minus reprehenderit esse, nobis ipsam? Omnis fugit mollitia
                    accusantium delectus voluptate, neque nam sunt totam tenetur
                    cumque excepturi laboriosam ea doloribus, cupiditate nisi
                    asperiores minima obcaecati voluptatum aliquam, ad libero
                    voluptas adipisci. Non, sunt debitis? Et, saepe. Doloribus
                    tempora dolores voluptas error, nam, eum ratione sunt
                    obcaecati consequatur quae blanditiis accusamus facilis!
                    Odit, accusamus numquam saepe, rem sit veritatis totam
                    omnis, facilis doloribus quam fugiat? Nobis nostrum, facere
                    magni quidem fugit ducimus quam quibusdam ipsa tempora
                    recusandae earum quia enim nemo consequatur mollitia,
                    doloribus, voluptatem laudantium eos et quisquam expedita
                    repellendus architecto quas. Porro, quo.
                </p>
            </div>
        </PreviewDiv>
    );
};

export const MobileContent = () => {
    return (
        <>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            blanditiis, eius ex corporis delectus deleniti minima ipsam veniam
            rerum ipsum temporibus distinctio repudiandae? Necessitatibus
            inventore maxime error voluptate cum debitis! Excepturi minima
            doloribus veniam odio repellat aspernatur tenetur doloremque quas.
            Laborum quidem perferendis eos neque obcaecati ex, soluta quas
            veniam suscipit sapiente unde ut dolores accusamus dolorem officia
            dolore nobis. Nostrum quod nemo, doloribus sequi reprehenderit
            adipisci commodi voluptas doloremque culpa possimus officiis dicta
            accusamus nisi repudiandae, qui maiores dolorem eius earum
            voluptatibus illo consectetur nam! Ipsum, cupiditate! Asperiores,
            cum. Alias voluptatibus eius nemo amet velit consectetur dicta,
            harum minima suscipit, corporis mollitia? Aperiam eveniet dolorem
            totam ea placeat soluta. Tenetur aliquid enim ducimus mollitia animi
            ea earum debitis ullam. Aperiam expedita maxime obcaecati eius vero
            tempora, ipsa molestias totam distinctio magni maiores, praesentium
            cumque! Suscipit, quasi, tempore officiis itaque commodi temporibus
            accusamus ducimus necessitatibus placeat nam magni magnam
            dignissimos! Neque nobis incidunt ipsam itaque eaque quis sapiente
            reiciendis quibusdam, ad assumenda quaerat autem dolores hic atque
            fuga quasi at repellat quas cum ratione, quod sunt! Cum est repellat
            officia. Alias neque, delectus commodi voluptates, eveniet atque
            magni autem dignissimos, debitis vitae soluta eius totam dolore
            nesciunt enim sit nemo sint necessitatibus est architecto molestias
            minus minima similique? Quaerat, quo? Deleniti cumque tenetur beatae
            iure rerum, provident quasi laborum ratione incidunt sunt. Eveniet
            voluptatibus quasi eligendi cumque necessitatibus, esse dolor,
            aliquam ipsa tenetur in nemo adipisci officia molestias natus.
            Dolorum. Ut quod rerum commodi rem, maiores explicabo nam
            voluptatibus aliquid id fuga asperiores quaerat consectetur laborum
            consequuntur, quae iste? Laborum esse distinctio cumque soluta
            magnam, ab sint quidem corporis aliquid. Corrupti ratione quam,
            incidunt suscipit possimus vitae dicta explicabo voluptatum earum
            sint? Itaque distinctio pariatur eveniet enim consequuntur adipisci
            quaerat animi incidunt nam. Velit architecto laboriosam ipsum nemo
            aliquam saepe?
        </>
    );
};
