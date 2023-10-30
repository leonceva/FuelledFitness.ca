import { styled } from "styled-components";
const MOBILE_MODE_LIMIT = 892;

export const Map = () => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

    // Use to determine the size of the google maps image
    let mapWidth, mapHeight;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (screenWidth < MOBILE_MODE_LIMIT) {
        mapWidth = Math.max(0.8 * screenWidth, 0.6 * screenHeight);
        mapHeight = Math.min(0.8 * screenWidth, 0.6 * screenHeight) - 20;
    } else {
        mapWidth = Math.min(0.25 * screenWidth, 0.5 * screenHeight);
        mapHeight = Math.min(0.25 * screenWidth, 0.5 * screenHeight) - 35;
    }

    return (
        <>
            <iframe
                title="map"
                width={mapWidth}
                height={mapHeight}
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJASX-87gHzkwRZsp9skl07KQ&key=${apiKey}`}
            ></iframe>
        </>
    );
};

export const MapContainerDesktop = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border: calc(min(0.5vw, 0.5vh)) solid #333;
    border-radius: 1vw;
`;

export const MapContainerMobile = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: start;
    overflow: hidden;
    border: 0.5vw solid #333;
    border-radius: 1vw;
`;

export const LoaderBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
