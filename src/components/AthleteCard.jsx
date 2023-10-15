import styled from "styled-components";
import no_img from "../images/athletes/no-img.jpg";

const AthleteCard = (props) => {
    const athlete = props.athlete;

    // Check to see if an image for athlete exists
    try {
        var img = require(`../images/athletes/${athlete.last_name}.jpg`);
    } catch (error) {
        img = null;
    }

    return (
        <AthleteCardDiv id={athlete.id}>
            <h2>{athlete.name}</h2>
            <div
                className="img"
                style={{
                    backgroundImage:
                        img === null ? `url(${no_img})` : `url(${img})`,
                }}
            />
        </AthleteCardDiv>
    );
};

export default AthleteCard;

export const AthleteCardDiv = styled.div`
    height: 100%;
    width: 100%;
    border: solid #333 calc(min(0.5vw, 0.5vh));
    border-radius: 1vw;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: start;
    background-color: white;
    position: relative;

    & > h2 {
        width: 100%;
    }

    & > .img {
        width: 100%;
        flex: 1;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    &:hover {
        cursor: pointer;
        box-shadow: 3px 3px 5px;
    }
    &:active {
        translate: 3px 3px;
        box-shadow: 0 0 0;
    }
`;
