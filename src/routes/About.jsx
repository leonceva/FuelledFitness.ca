import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";
import { styled } from "styled-components";
import krystin_img1 from "../images/ARC00915-2.jpg";
import krystin_img2 from "../images/DSC05177.jpg";
import krystin_img3 from "../images/PXL_20220517_021932907.jpg";

const About = () => {
    return (
        <>
            <DesktopLayout content={<DesktopContent />} />
            <MobileLayout content={<MobileContent />} />
        </>
    );
};

export default About;

export const DesktopContent = () => {
    return (
        <DesktopContentDiv>
            <div style={{ margin: "10px" }}>
                <img
                    src={krystin_img1}
                    alt="Krystin Bussiness Portrait"
                    className="left"
                />
                <h3>About Fuelled Fitness</h3>
                <p>
                    Welcome to Fuelled Fitness, your launchpad for the journey
                    towards optimal health and peak performance. I'm Krystin
                    Paquette, a Registered Dietitian and a dedicated Strength
                    and Conditioning Coach. As the founder of Fuelled Fitness,
                    my mission is crystal clear: to empower you to reach the
                    pinnacle of health and performance through sustainable,
                    harmonious shifts in your nutrition and lifestyle.
                </p>
                <p>
                    My name is Krystin Paquette and my educational foundation is
                    robust, boasting a Bachelor of Science degree in Nutrition
                    and Food Science with a specialised focus in Dietetics,
                    complemented by a Bachelor's degree in Kinesiology. What
                    truly sets me apart is my distinctive expertise that
                    seamlessly bridges the worlds of nutrition and training.
                    This fusion allows me to offer a comprehensive coaching
                    experience tailored to your unique needs and aspirations.
                </p>
                <p>
                    On a personal note, I don't just preach; I practise. I've
                    achieved national titles in both wrestling and powerlifting.
                    My coaching isn't just about theoretical knowledge; it's
                    about infusing your journey with the wisdom and experience
                    of a seasoned athlete, guiding you towards your own
                    triumphs.
                </p>
                <h3>Professional Approach</h3>
                <p>
                    My approach as a Registered Dietitian and Strength and
                    Conditioning Coach is driven by a holistic perspective on
                    health and performance. I believe that a well-rounded
                    approach to nutrition and fitness is the key to achieving
                    lasting results and maximising your potential.
                </p>
                <img src={krystin_img2} alt="Krystin Pose" className="right" />
                <p>
                    I understand that embarking on a journey towards better
                    health and performance can be overwhelming. That's why I
                    strive to create a supportive and non-judgmental environment
                    where you can feel comfortable discussing your unique
                    challenges and aspirations. Together, we will delve into
                    your individual needs, preferences, and lifestyle to tailor
                    a personalised plan that works specifically for you.
                </p>
                <img
                    src={krystin_img3}
                    alt="Krystin Wrestling"
                    className="left"
                />
                <p>
                    My approach is always grounded in evidence-based practice,
                    and person-centred principles. I believe in adaptive
                    coaching strategies that are tailored to your goals, and
                    that meet you where you are now in order to effectively get
                    you to where you want to be.
                </p>
                <h3>Let's Get Started!</h3>
                <p>
                    I am excited to embark on this transformative journey with
                    you! Whether you aspire to excel as a high-performance
                    athlete, effectively manage a medical condition, elevate
                    your performance in an amateur sport, achieve weight loss
                    goals, or simply cultivate a healthier lifestyle, I am here
                    to support you every step of the way. Reach out to me
                    through the contact page, or click the “book now” button to
                    get started. Take the first step today toward optimal health
                    and performance with fuelled fitness.
                </p>
            </div>
        </DesktopContentDiv>
    );
};

export const DesktopContentDiv = styled.div`
    height: calc(100%);
    overflow-y: scroll;
    text-align: justify;

    & img {
        max-height: 45vh;
        max-width: 25vw;
        border-radius: 5%;
    }
    & .left {
        margin-right: 2%;
        float: left;
    }
    & .right {
        margin-left: 2%;
        float: right;
    }
`;

export const MobileContent = () => {
    return (
        <>
            <MobileContentDiv>
                <div style={{ margin: "10px" }}>
                    <img
                        src={krystin_img1}
                        alt="Krystin Bussiness Portrait"
                        className="left"
                    />
                    <h3>About Fuelled Fitness</h3>
                    <p>
                        Welcome to Fuelled Fitness, your launchpad for the
                        journey towards optimal health and peak performance. I'm
                        Krystin Paquette, a Registered Dietitian and a dedicated
                        Strength and Conditioning Coach. As the founder of
                        Fuelled Fitness, my mission is crystal clear: to empower
                        you to reach the pinnacle of health and performance
                        through sustainable, harmonious shifts in your nutrition
                        and lifestyle.
                    </p>
                    <p>
                        My name is Krystin Paquette and my educational
                        foundation is robust, boasting a Bachelor of Science
                        degree in Nutrition and Food Science with a specialised
                        focus in Dietetics, complemented by a Bachelor's degree
                        in Kinesiology. What truly sets me apart is my
                        distinctive expertise that seamlessly bridges the worlds
                        of nutrition and training. This fusion allows me to
                        offer a comprehensive coaching experience tailored to
                        your unique needs and aspirations.
                    </p>
                    <p>
                        On a personal note, I don't just preach; I practise.
                        I've achieved national titles in both wrestling and
                        powerlifting. My coaching isn't just about theoretical
                        knowledge; it's about infusing your journey with the
                        wisdom and experience of a seasoned athlete, guiding you
                        towards your own triumphs.
                    </p>
                    <img
                        src={krystin_img2}
                        alt="Krystin Pose"
                        className="right"
                    />
                    <h3>Professional Approach</h3>
                    <p>
                        My approach as a Registered Dietitian and Strength and
                        Conditioning Coach is driven by a holistic perspective
                        on health and performance. I believe that a well-rounded
                        approach to nutrition and fitness is the key to
                        achieving lasting results and maximising your potential.
                    </p>
                    <p>
                        I understand that embarking on a journey towards better
                        health and performance can be overwhelming. That's why I
                        strive to create a supportive and non-judgmental
                        environment where you can feel comfortable discussing
                        your unique challenges and aspirations. Together, we
                        will delve into your individual needs, preferences, and
                        lifestyle to tailor a personalised plan that works
                        specifically for you.
                    </p>
                    <p>
                        My approach is always grounded in evidence-based
                        practice, and person-centred principles. I believe in
                        adaptive coaching strategies that are tailored to your
                        goals, and that meet you where you are now in order to
                        effectively get you to where you want to be.
                    </p>
                    <h3>Let's Get Started!</h3>
                    <img
                        src={krystin_img3}
                        alt="Krystin Wrestling"
                        className="left"
                    />
                    <p>
                        I am excited to embark on this transformative journey
                        with you! Whether you aspire to excel as a
                        high-performance athlete, effectively manage a medical
                        condition, elevate your performance in an amateur sport,
                        achieve weight loss goals, or simply cultivate a
                        healthier lifestyle, I am here to support you every step
                        of the way. Reach out to me through the contact page, or
                        click the “book now” button to get started. Take the
                        first step today toward optimal health and performance
                        with fuelled fitness.{" "}
                    </p>
                </div>
            </MobileContentDiv>
        </>
    );
};

export const MobileContentDiv = styled.div`
    text-align: start;
    & img {
        max-width: 100%;
        max-height: 35vh;
        border-radius: 5%;
        margin: 1vh 0;
    }
    & .left {
        margin-right: 2vw;
        float: left;
    }
    & .right {
        margin-left: 2vw;
        float: right;
    }
    h3 {
        margin-top: 2vh;
    }
`;
