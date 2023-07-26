import { React, useState } from "react";
import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";
import { styled } from "styled-components";
import test1 from "../images/ARC00892.jpg";
import test2 from "../images/DSC05302.jpg";
import test3 from "../images/39753925763_e25c9d8c3b_b.jpg";

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
            <div className="preview-items">Preview Articles</div>
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
        border: 3px solid black;
        width: 40%;
        margin-right: 5px;
    }

    & > .preview-items {
        border: 3px solid black;
        width: 60%;
        margin-left: 5px;
    }
`;

export const CarouselDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    & > .img-div {
        height: 70%;
        z-index: 1;

        & > img {
            transition: all 0.3s;
        }

        & > .img-show {
            max-width: 100%;
            max-height: 100%;
        }

        & > .img-hide {
            max-width: 0%;
            max-height: 0%;
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

    const handleClick = (side) => {
        if (side === "left") {
            if (imgNumber !== 1) {
                setImgNumber(imgNumber - 1);
            } else {
                setImgNumber(3);
            }
        }
        if (side === "right") {
            if (imgNumber !== 3) {
                setImgNumber(imgNumber + 1);
            } else {
                setImgNumber(1);
            }
        }
    };

    return (
        <CarouselDiv>
            <div className="img-div">
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
                }}
            >
                Labels
            </div>
            <button
                className="left"
                onClick={() => {
                    handleClick("left");
                }}
            >
                {"<"}
            </button>
            <button
                className="right"
                onClick={() => {
                    handleClick("right");
                }}
            >
                {">"}
            </button>
        </CarouselDiv>
    );
};

export const MobileContent = () => {
    return (
        <>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Voluptatibus quos quae libero recusandae quod enim doloribus aperiam
            eveniet ex molestiae. Cum labore illo vero rerum aliquid tempore
            beatae quaerat pariatur? Ut reiciendis impedit quaerat ea incidunt
            ab vitae nisi quos assumenda explicabo fugiat a dolor praesentium
            minima nesciunt nobis voluptas, suscipit laborum ipsam
            exercitationem corrupti aperiam. Officiis deserunt minus deleniti?
            Beatae, optio. Laudantium, corporis aliquid itaque blanditiis nisi
            doloremque harum eos facilis veritatis. Voluptate architecto harum,
            voluptates tempore minus velit quos quis? Libero, laudantium? Ex at
            corporis eum doloribus iusto. Quidem, voluptatem? Deserunt amet
            magnam fuga nihil consectetur excepturi eum tempore repellat,
            temporibus aperiam minus dolor fugiat doloremque delectus enim
            animi, quam laudantium error. Maiores quidem rem reprehenderit
            commodi obcaecati. Repellendus illo incidunt odit ea voluptate?
            Placeat voluptatem tempora voluptate optio incidunt? Impedit quam
            quos perferendis, rerum dolorum tenetur molestiae obcaecati qui
            facere necessitatibus. Atque itaque magni obcaecati nam accusantium!
            Illo iste consectetur dignissimos corporis laborum alias quibusdam,
            ratione sit odit consequatur autem exercitationem commodi molestias
            quos delectus obcaecati sequi cum nulla doloremque nisi deserunt
            quae. Earum iusto aperiam ullam. Unde, consequuntur quasi. Nesciunt
            quisquam quos quod expedita. Commodi sint rem ducimus? Molestias, at
            sunt, quia atque impedit unde eius commodi dolorem nam in odio? In
            eveniet repudiandae non dolor. Ea amet hic facere reiciendis quidem
            mollitia non, molestiae deserunt vel maiores! Id est non deleniti!
            Vel libero rem quis repudiandae, deserunt et magnam! Pariatur
            necessitatibus ducimus neque eaque voluptates! Veritatis aspernatur
            officia tempora ab doloremque doloribus harum, blanditiis suscipit
            tempore enim saepe quo deleniti et qui sunt nemo omnis quibusdam
            magnam at nam corporis minima! Nam dolor accusamus animi. Aliquid
            quo incidunt dolor doloremque voluptate illum quis culpa ipsa qui,
            neque, ipsam, quae repellat possimus quisquam cupiditate omnis autem
            quos inventore dignissimos unde esse deleniti. Nam vitae veniam
            dolores.
        </>
    );
};
