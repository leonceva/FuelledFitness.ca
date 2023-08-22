import { styled } from "styled-components";
//import map from "../images/staticmap.png";

const MOBILE_MODE_LIMIT = 892;

// "https://maps.googleapis.com/maps/api/staticmap?center=613,Lift&zoom=15&size=500x500&scale=1&key=AIzaSyAx-xY_vBSy4fv8cp8ixJz6kBUMng1q5m8"

export const Map = () => {
    // Use to determine the size of the google maps image
    let mapWidth, mapHeight;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (screenWidth < MOBILE_MODE_LIMIT) {
        mapWidth = Math.max(0.8 * screenWidth, 0.6 * screenHeight);
        mapHeight = Math.min(0.8 * screenWidth, 0.6 * screenHeight) - 20;
    } else {
        mapWidth = 0.25 * screenWidth;
        mapHeight = 0.25 * screenWidth - 35;
    }

    return (
        <>
            <iframe
                title="map"
                width={mapWidth}
                height={mapHeight}
                loading="lazy"
                src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJASX-87gHzkwRZsp9skl07KQ&key=AIzaSyAx-xY_vBSy4fv8cp8ixJz6kBUMng1q5m8"
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
