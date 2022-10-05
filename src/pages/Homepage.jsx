import React from "react";
import { getWindowSize } from "../components/Navbar";

const Homepage = (props) => {
    let window_size = getWindowSize();
    if (window_size.width > 500) {
        return (
            <>
                <div>Desktop Layout</div>
            </>
        );
    } else {
        return (
            <>
                <div>Mobile Layout</div>
            </>
        );
    }
};

export default Homepage;
