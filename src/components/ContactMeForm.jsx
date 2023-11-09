import { useRef, useState } from "react";
import axios from "axios";
import Reaptcha from "reaptcha";

const reaptchaKey = process.env.REACT_APP_REAPTCHA_KEY;

export const ContactMeForm = () => {
    // Form content state data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    // React States
    const captchaRef = useRef(null);
    const [verified, setVerified] = useState(false);
    const [formError, setFormError] = useState(false);
    const [messageError, setMessageError] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    // Form input field change
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update form data content
        setFormData((prevFormData) => {
            return { ...prevFormData, [name]: value };
        });
    };

    // Input Validation
    const validateInputs = () => {
        if (formData.name.length < 1 || formData.name.length > 50) {
            setFormError(true);
            setMessageError("Name must be between 1 and 50 characters long");
            return false;
        }
        if (formData.message.length < 5 || formData.message.length > 500) {
            setFormError(true);
            setMessageError(
                "Message must be between 5 and 500 characters long"
            );
            return false;
        }
        // Check valid email
        if (
            formData.email.match(
                // eslint-disable-next-line no-useless-escape
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
            setFormError(false);
            return true;
        } else {
            setFormError(true);
            setMessageError("Invalid email entered");
        }
    };

    // Form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log("Handle Submit");
        if (validateInputs()) {
            //console.log("Inputs validated");
            if (verified) {
                // console.log("Verified");
                sendFormData();
            } else {
                //console.log("Not verified");
                setFormError(true);
                setMessageError(
                    "Please complete the CAPTCHA before sending your message"
                );
            }
        }
    };

    // Async Function to Send Form Data
    const sendFormData = async () => {
        //console.log("Submitted:");
        //console.log(`Name:" ${formData.name}, email: ${formData.email}`;
        //console.log(`Message: ${formData.message}`);
        await axios
            .post("http://api.fuelledfitness.ca:8443/sendMessage", {
                name: formData.name,
                email: formData.email,
                message: formData.message,
            })
            .then((res) => {
                //console.log("Response: " + res.data);
                // Clear form data
                setFormData({
                    name: "",
                    email: "",
                    message: "",
                });
                setEmailSent(true);
            })
            .catch((res) => {
                //console.log("Error: " + res.data);
                setEmailSent(false);
                alert(res.data);
            });
    };

    return (
        <form action="" method="post" onSubmit={handleSubmit}>
            <h2>Send Us A Message</h2>
            <input
                name="name"
                type="text"
                className="input-text"
                placeholder="Name (max 50 characters)"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
            />
            <input
                name="email"
                type="email"
                className="input-text"
                placeholder="Email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
            />

            <textarea
                name="message"
                type="text"
                placeholder="Message (5 to 500 characters)"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
            />

            <Reaptcha
                sitekey={reaptchaKey}
                onVerify={() => {
                    setVerified(true);
                    setFormError(false);
                }}
                ref={captchaRef}
                onExpire={() => {
                    setVerified(false);
                }}
                onError={(e) => {
                    console.log(e);
                }}
            />

            <button
                className={`${
                    emailSent && verified
                        ? "submit-btn submitted"
                        : "submit-btn not-submitted"
                }`}
                type="submit"
            />

            {formError && <div style={{ color: "red" }}>{messageError}</div>}
            {!formError && (
                <div style={{ color: "transparent" }}>placeholder</div>
            )}
        </form>
    );
};

export default ContactMeForm;
