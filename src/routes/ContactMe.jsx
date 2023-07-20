import React from "react";

const ContactMe = (props) => {
    const width = props.width;
    return (
        width && (
            <>
                {width > 830 ? <div>Desktop Mode</div> : <div>Mobile Mode</div>}
                Contact Me <br />
                Width: {width}
            </>
        )
    );
};

export default ContactMe;
