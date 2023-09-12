import { useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
//import map from "../images/staticmap.png";

const MOBILE_MODE_LIMIT = 892;

export const Map = () => {
    const [apiKey, setApiKey] = useState(null);

    useEffect(() => {
        const fetchKey = async () => {
            await axios
                .post("https://api.fuelledfitness.ca:8443/googleMapsApiKey")
                .then((res) => {
                    setApiKey(res.data);
                })
                .catch((res) => {
                    console.log(`Failed to get key: ${res}`);
                    setApiKey(0);
                });
        };

        fetchKey();
    }, []);

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
            {apiKey === null && (
                <LoaderBox
                    className="loader-box"
                    style={{
                        width: `${mapWidth}px`,
                        height: `${mapHeight}px`,
                    }}
                >
                    Loading...
                </LoaderBox>
            )}

            {apiKey === 0 && (
                <LoaderBox
                    className="loader-box"
                    style={{
                        width: `${mapWidth}px`,
                        height: `${mapHeight}px`,
                    }}
                >
                    Failed to Load
                </LoaderBox>
            )}

            {apiKey !== null && apiKey !== 0 && (
                <iframe
                    title="map"
                    width={mapWidth}
                    height={mapHeight}
                    loading="lazy"
                    src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJASX-87gHzkwRZsp9skl07KQ&key=${apiKey}`}
                ></iframe>
            )}
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
