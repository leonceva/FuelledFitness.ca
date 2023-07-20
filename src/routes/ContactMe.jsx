import React from "react";

const ContactMe = (props) => {
    const width = props.width;
    return (
        width &&
        width && (
            <>
                {width > 830 ? <div>Desktop Mode</div> : <div>Mobil Mode</div>}
                Contact Me <br />
                Width: {width}
            </>
        )
    );
};

export default ContactMe;
