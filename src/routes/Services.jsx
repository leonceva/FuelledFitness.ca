import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Services = (props) => {
    const width = props.width;
    const [serviceSelected, setServiceSelected] = useState("None");
    const location = useLocation();

    useEffect(() => {
        if (location.hash.slice(1) === "") {
            setServiceSelected("None");
        } else {
            setServiceSelected(location.hash.slice(1));
        }
    }, [location]);

    return (
        width && (
            <>
                {width > 830 ? <div>Desktop Mode</div> : <div>Mobile Mode</div>}
                Service Selected: {serviceSelected} <br />
                Width: {width}
            </>
        )
    );
};

export default Services;
