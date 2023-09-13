import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";
import { styled } from "styled-components";
import krystin_img1 from "../images/ARC00915-2.jpg";
import krystin_img2 from "../images/DSC05177.jpg";
import krystin_img3 from "../images/PXL_20220517_021932907.jpg";

const AboutMe = () => {
    return (
        <>
            <DesktopLayout content={<DesktopContent />} />
            <MobileLayout content={<MobileContent />} />
        </>
    );
};

export default AboutMe;

export const DesktopContent = () => {
    return (
        <DesktopContentDiv>
            <div style={{ margin: "10px" }}>
                <img
                    src={krystin_img1}
                    alt="Krystin Bussiness Portrait"
                    className="left"
                />
                <h3>About Me</h3>
                <p>
                    Hello and thank you for visiting my website! My name is
                    Krystin Paquette, and I am a passionate and dedicated
                    dietitian on a mission to help you achieve optimal health
                    through balanced nutrition and sustainable lifestyle
                    changes.
                </p>
                <p>
                    From a young age, I have always been fascinated by the
                    powerful connection between food and overall well-being. As
                    I pursued my education and professional career in dietetics,
                    this fascination transformed into a burning passion. I hold
                    a BSc. in Nutrition and Food Science with a Sepciailization
                    in Dietetics and a Bachelor in Kinesiology , and my journey
                    as a dietitian has equipped me with a diverse set of skills
                    and knowledge to address various nutritional needs.
                </p>
                <img src={krystin_img2} alt="Krystin Pose" className="right" />
                <h3>Why I Do What I Do</h3>
                <p>
                    My motivation as a dietitian lies in empowering individuals
                    like you to take control of their health and foster a
                    positive relationship with food. I firmly believe that
                    nutrition is the cornerstone of a healthy and fulfilling
                    life. By making informed food choices, we can unlock a world
                    of possibilities, allowing us to achieve our goals and
                    embrace a vibrant lifestyle.
                </p>
                <h3>My Approach</h3>

                <p>
                    I understand that embarking on a journey towards better
                    health can be overwhelming. That's why I strive to create a
                    supportive and non-judgmental environment where you can feel
                    comfortable discussing your unique challenges and
                    aspirations. Together, we will delve into your individual
                    needs, preferences, and lifestyle to tailor a personalized
                    nutrition plan that works specifically for you.
                </p>
                <p>
                    My approach to nutrition is grounded in evidence-based
                    practices and the latest scientific research. I believe in
                    striking a balance between nourishing your body with
                    wholesome, nutrient-dense foods and enjoying the occasional
                    indulgence guilt-free. Restrictive diets are not the answer;
                    instead, I will guide you towards making sustainable choices
                    that can be easily integrated into your daily routine.
                </p>
                <img
                    src={krystin_img3}
                    alt="Krystin Wrestling"
                    className="left"
                />
                <h3>What to Expect</h3>
                <p>
                    When you choose to work with me, expect a collaborative
                    partnership focused on your well-being. Our journey together
                    will encompass:
                </p>
                <ol>
                    <li>
                        <strong>Comprehensive Assessment: </strong>I will
                        conduct a thorough assessment of your current dietary
                        habits, medical history, and lifestyle factors to
                        understand your unique needs better.
                    </li>
                    <li>
                        <strong>Personalized Nutrition Plan: </strong>Based on
                        our assessment, I will design a personalized nutrition
                        plan that aligns with your goals, preferences, and any
                        specific dietary requirements.
                    </li>
                    <li>
                        <strong>Education and Support: </strong>I will provide
                        you with the knowledge and tools you need to make
                        informed decisions about your nutrition. You can count
                        on me for continuous support and guidance throughout
                        your journey.
                    </li>
                    <li>
                        <strong>Progress Tracking: </strong>Regular follow-ups
                        and evaluations will ensure that we stay on track and
                        make any necessary adjustments to achieve the best
                        possible results.
                    </li>
                </ol>
                <h3>Let's Begin Your Journey Towards Optimal Health</h3>
                <p>
                    I am excited to embark on this transformative journey with
                    you! Whether your goal is to manage a medical condition,
                    lose weight, improve energy levels, or simply cultivate a
                    healthier lifestyle, I am here to support you every step of
                    the way.
                </p>
                <p>
                    Feel free to reach out to me through the contact form, and
                    let's schedule your initial consultation. Together, we will
                    build a foundation for lasting health and wellness through
                    the power of nutrition.
                </p>
                <p>
                    Thank you for considering me as your nutrition partner. I
                    look forward to being a part of your success story!
                </p>
            </div>
        </DesktopContentDiv>
    );
};

export const DesktopContentDiv = styled.div`
    height: 100%;
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
                    <h3>About Me</h3>
                    <p>
                        Hello and thank you for visiting my website! My name is
                        Krystin Paquette, and I am a passionate and dedicated
                        dietitian on a mission to help you achieve optimal
                        health through balanced nutrition and sustainable
                        lifestyle changes.
                    </p>
                    <p>
                        From a young age, I have always been fascinated by the
                        powerful connection between food and overall well-being.
                        As I pursued my education and professional career in
                        dietetics, this fascination transformed into a burning
                        passion. I hold a BSc. in Nutrition and Food Science
                        with a Sepciailization in Dietetics and a Bachelor in
                        Kinesiology , and my journey as a dietitian has equipped
                        me with a diverse set of skills and knowledge to address
                        various nutritional needs.
                    </p>
                    <h3>Why I Do What I Do</h3>
                    <p>
                        My motivation as a dietitian lies in empowering
                        individuals like you to take control of their health and
                        foster a positive relationship with food. I firmly
                        believe that nutrition is the cornerstone of a healthy
                        and fulfilling life. By making informed food choices, we
                        can unlock a world of possibilities, allowing us to
                        achieve our goals and embrace a vibrant lifestyle.
                    </p>
                    <img
                        src={krystin_img2}
                        alt="Krystin Pose"
                        className="right"
                    />
                    <h3>My Approach</h3>
                    <p>
                        I understand that embarking on a journey towards better
                        health can be overwhelming. That's why I strive to
                        create a supportive and non-judgmental environment where
                        you can feel comfortable discussing your unique
                        challenges and aspirations. Together, we will delve into
                        your individual needs, preferences, and lifestyle to
                        tailor a personalized nutrition plan that works
                        specifically for you.
                    </p>
                    <p>
                        My approach to nutrition is grounded in evidence-based
                        practices and the latest scientific research. I believe
                        in striking a balance between nourishing your body with
                        wholesome, nutrient-dense foods and enjoying the
                        occasional indulgence guilt-free. Restrictive diets are
                        not the answer; instead, I will guide you towards making
                        sustainable choices that can be easily integrated into
                        your daily routine.
                    </p>
                    <h3>What to Expect</h3>
                    <p>
                        When you choose to work with me, expect a collaborative
                        partnership focused on your well-being. Our journey
                        together will encompass:
                    </p>
                    <ol>
                        <li>
                            <strong>Comprehensive Assessment: </strong>I will
                            conduct a thorough assessment of your current
                            dietary habits, medical history, and lifestyle
                            factors to understand your unique needs better.
                        </li>
                        <li>
                            <strong>Personalized Nutrition Plan: </strong>
                            Based on our assessment, I will design a
                            personalized nutrition plan that aligns with your
                            goals, preferences, and any specific dietary
                            requirements.
                        </li>
                        <li>
                            <strong>Education and Support: </strong>I will
                            provide you with the knowledge and tools you need to
                            make informed decisions about your nutrition. You
                            can count on me for continuous support and guidance
                            throughout your journey.
                        </li>
                        <li>
                            <strong>Progress Tracking: </strong>Regular
                            follow-ups and evaluations will ensure that we stay
                            on track and make any necessary adjustments to
                            achieve the best possible results.
                        </li>
                    </ol>

                    <h3>Let's Begin Your Journey Towards Optimal Health</h3>
                    <img
                        src={krystin_img3}
                        alt="Krystin Wrestling"
                        className="left"
                    />
                    <p>
                        I am excited to embark on this transformative journey
                        with you! Whether your goal is to manage a medical
                        condition, lose weight, improve energy levels, or simply
                        cultivate a healthier lifestyle, I am here to support
                        you every step of the way.
                    </p>
                    <p>
                        Feel free to reach out to me through the contact form,
                        and let's schedule your initial consultation. Together,
                        we will build a foundation for lasting health and
                        wellness through the power of nutrition.
                    </p>
                    <p>
                        Thank you for considering me as your nutrition partner.
                        I look forward to being a part of your success story!
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
