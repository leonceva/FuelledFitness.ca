import { useRef, useState } from "react";
import Reaptcha from "reaptcha";

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

    // Form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted");
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
                    />
                </div>

                <div className="input-text">
                    <label htmlFor="socials">Social Media Links:</label>
                    <input
                        type="text"
                        name="socials"
                        id="socials"
                        placeholder="Instagram, YouTube, LinkedIn, etc.."
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
