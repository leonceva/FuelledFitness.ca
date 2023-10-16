const Application = () => {
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
                        required
                    />
                </div>

                <div className="about">
                    <label htmlFor="about">
                        Tell us about yourself and why you are seeking to be a
                        Fuelled Fitness athlete:
                    </label>
                    <textarea
                        name="about"
                        id="about"
                        rows="5"
                        required
                        placeholder="Achievements, short-term and long-term goals, specify your support needs"
                    ></textarea>
                </div>
            </form>
        </>
    );
};

export default Application;
