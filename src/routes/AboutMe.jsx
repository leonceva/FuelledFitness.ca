import React from "react";

const AboutMe = (props) => {
    const width = props.width;
    return (
        width && (
            <>
                {width > 830 ? <div>Desktop Mode</div> : <div>Mobil Mode</div>}
                About Me <br />
                Width: {width}
            </>
        )
    );
};

export default AboutMe;
