import React from "react";

const Homepage = (props) => {
    const width = props.width;

    return (
        width && (
            <>
                {width > 830 ? <div>Desktop Mode</div> : <div>Mobil Mode</div>}
                Home page <br />
                Width: {width}
            </>
        )
    );
};

export default Homepage;
