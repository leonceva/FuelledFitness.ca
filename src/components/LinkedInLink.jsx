import linkedin_logo from "../images/linkedin-logo.png";

const LinkedInLink = (props) => {
    const width = props.width;
    const height = props.height;
    return (
        <>
            <div className="image pt-1 pb-1">
                <a href="https://www.linkedin.com/in/krystin-rd">
                    <img
                        src={linkedin_logo}
                        alt="LinkedIn Logo"
                        className="link-logo"
                        style={{ width: width, height: height }}
                    />
                </a>
            </div>
        </>
    );
};

export default LinkedInLink;
