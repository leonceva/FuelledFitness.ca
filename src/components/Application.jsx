import { useRef, useState } from "react";
import Reaptcha from "reaptcha";
import axios from "axios";

const Application = () => {
    // Form content state data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        sport: "",
        links: "",
        about: "",
    });

    // React States
    const captchaRef = useRef(null);
    const [verified, setVerified] = useState(false);
    const [formError, setFormError] = useState("");
    const [messageError, setMessageError] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    // Form change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update form data content
        setFormData((prevFormData) => {
            return { ...prevFormData, [name]: value };
        });
    };

    // Input Validation
    const validateInputs = () => {
        // Check that name is between 1 and 50 characters
        if (formData.name.length < 1 || formData.name.length > 50) {
            setFormError(true);
            setMessageError("Name must be between 1 and 50 characters long");
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
        // Check that sport is between 1 and 50 characters
        if (formData.sport.length < 1 || formData.sport.length > 50) {
            setFormError(true);
            setMessageError("Sport must be between 1 and 50 characters long");
            return false;
        }
        // Check that social media links are between 1 and 100 characters
        if (formData.links.length < 1 || formData.links.length > 100) {
            setFormError(true);
            setMessageError(
                "Social media links must be between 1 and 100 characters long"
            );
            return false;
        }
        // Check that about sectios is between 1 and 300 characters
        if (formData.links.length < 1 || formData.links.length > 300) {
            setFormError(true);
            setMessageError(
                "Description must be between 1 and 300 characters long"
            );
            return false;
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
                // Async function to send athlete application
                const sendFormData = async () => {
                    // console.log("Form Submitted");
                    // console.log(`Name: ${formData.name}\nEmail: ${formData.email}\nSport: ${formData.sport}\nLinks: ${formData.links}\nAbout: ${formData.about}\n`);
                    await axios
                        .post(
                            "https://api.fuelledfitness.ca:8443/sendApplication",
                            {
                                name: formData.name,
                                email: formData.email,
                                sport: formData.sport,
                                links: formData.links,
                                about: formData.about,
                            }
                        )
                        .then((res) => {
                            //console.log("Response: " + res.data);
                        })
                        .catch((res) => {
                            //console.log("Error: " + res.data);
                            setEmailSent(false);
                        })
                        .finally(() => {
                            // Clear form data
                            setFormData({
                                name: "",
                                email: "",
                                sport: "",
                                links: "",
                                about: "",
                            });
                            setEmailSent(true);
                        });
                };
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

    return (
        <>
            <form action="" method="post" onSubmit={handleSubmit}>
                <h3>Athlete Application</h3>

                <div className="input-text">
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-text">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-text">
                    <label htmlFor="sport">Sport:</label>
                    <input
                        type="text"
                        name="sport"
                        id="sport"
                        placeholder="Sport"
                        required
                        value={formData.sport}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-text">
                    <label htmlFor="socials">Social Media Links:</label>
                    <input
                        type="text"
                        name="links"
                        id="links"
                        placeholder="Instagram, YouTube, LinkedIn, etc.."
                        value={formData.links}
                        onChange={handleChange}
                    />
                </div>

                <div className="about">
                    <label htmlFor="about">
                        Tell us about yourself and why you are seeking to be a
                        Fuelled Fitness athlete:
                    </label>
                    <textarea
                        rows="3"
                        name="about"
                        id="about"
                        required
                        placeholder="Achievements, short-term and long-term goals, specify your support needs"
                        value={formData.about}
                        onChange={handleChange}
                    ></textarea>
                </div>

                {formError && (
                    <div className="error-msg" style={{ color: "red" }}>
                        {messageError}
                    </div>
                )}
                {!formError && (
                    <div className="error-msg" style={{ color: "transparent" }}>
                        placeholder
                    </div>
                )}

                <button
                    className={`${
                        emailSent && verified
                            ? "submit-btn submitted"
                            : "submit-btn not-submitted"
                    }`}
                    type="submit"
                />

                <Reaptcha
                    sitekey="6LeqyxkoAAAAAMkMdeTVT-ADWy1cgYy_qAXzyymT"
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
            </form>
        </>
    );
};

export default Application;
