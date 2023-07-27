import React, { useState } from "react";
import { useEffect } from "react";

const BackToTop = () => {
    const [showButton, setShowButton] = useState(false);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    });

    return (
        <>
            {showButton && (
                <button
                    style={{
                        position: "fixed",
                        bottom: "2vh",
                        right: "2vw",
                        textAlign: "center",
                        width: "58px",
                        height: "58px",
                        borderWidth: "2.5px",
                        borderStyle: "solid",
                        borderColor: "#333",
                        borderRadius: "15%",
                        alignItems: "end",
                        alignContent: "end",
                        backgroundColor: "lightgray",
                    }}
                    onClick={() => {
                        scrollUp();
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fillRule="currentColor"
                        className="bi bi-chevron-double-up"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"
                        />
                        <path
                            fillRule="evenodd"
                            d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                        />
                    </svg>
                </button>
            )}
        </>
    );
};

export default BackToTop;
