import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";
import placeholder from "../images/ARC00892.jpg";

const Services = () => {
    const [serviceSelected, setServiceSelected] = useState("none");
    const location = useLocation();

    useEffect(() => {
        if (location.hash.slice(1) === "") {
            setServiceSelected("none");
        } else {
            setServiceSelected(location.hash.slice(1));
        }
    }, [location]);

    return (
        <>
            <DesktopLayout
                content={<DesktopContent serviceSelected={serviceSelected} />}
            />
            <MobileLayout content={<MobileContent />} />
        </>
    );
};

export default Services;

export const DesktopContent = (props) => {
    const serviceSelected = props.serviceSelected;
    const navigate = useNavigate();
    const [option, setOption] = useState(null);

    const handleClick = (service) => {
        navigate(`#${service}`);
    };

    return (
        <DesktopDiv>
            <div className="button-container">
                {
                    // When neither service is selected
                    serviceSelected === "none" && (
                        <>
                            <h2>Select a service type for more info</h2>
                            <ServiceButton
                                onClick={() => {
                                    handleClick("nutrition");
                                }}
                            >
                                Nutrition
                            </ServiceButton>
                            <ServiceButton
                                onClick={() => {
                                    handleClick("training");
                                }}
                            >
                                Training
                            </ServiceButton>
                            <img src={placeholder} alt="placeholder" />
                        </>
                    )
                }

                {
                    // Nutrition service
                    serviceSelected === "nutrition" && (
                        <>
                            <h3>Nutrition Services</h3>
                            <ServiceButton
                                onClick={() =>
                                    setOption("personal-counselling")
                                }
                            >
                                In-Person Counselling
                            </ServiceButton>
                            <ServiceButton
                                onClick={() => setOption("online-counselling")}
                            >
                                Online Counselling
                            </ServiceButton>
                            <ServiceButton
                                onClick={() => setOption("team-counselling")}
                            >
                                Team Sports
                            </ServiceButton>
                            <ServiceButton
                                onClick={() =>
                                    setOption("corporate-counselling")
                                }
                            >
                                Corporate Packages
                            </ServiceButton>
                            <ServiceButton
                                className="other-service"
                                onClick={() => {
                                    setOption(null);
                                    handleClick("training");
                                }}
                            >
                                Training Services
                            </ServiceButton>
                        </>
                    )
                }

                {
                    // Training service
                    serviceSelected === "training" && (
                        <>
                            <h3>Training Services</h3>
                            <ServiceButton
                                onClick={() => setOption("personal-training")}
                            >
                                Personal session
                            </ServiceButton>
                            <ServiceButton
                                onClick={() => setOption("group-training")}
                            >
                                Group Sessions
                            </ServiceButton>
                            <ServiceButton
                                onClick={() => setOption("online-training")}
                            >
                                Online Coaching
                            </ServiceButton>
                            <ServiceButton
                                onClick={() => setOption("team-training")}
                            >
                                Corporate and Teams
                            </ServiceButton>
                            <ServiceButton
                                className="other-service"
                                onClick={() => {
                                    setOption(null);
                                    handleClick("nutrition");
                                }}
                            >
                                Nutrition Services
                            </ServiceButton>
                        </>
                    )
                }
            </div>
            <div
                className={`info-container  ${
                    serviceSelected === "nutrition" ||
                    serviceSelected === "training"
                        ? "show"
                        : "hide"
                }`}
            >
                <InfoText className="info" option={option} />
            </div>
        </DesktopDiv>
    );
};

export const DesktopDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;

    & > .button-container {
        flex: 4;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 1vh 1vw;
        justify-content: center;
        align-items: center;

        & > img {
            max-width: 25%;
            max-height: 50%;
        }

        & > h2 {
            font-size: 3.5vh;
        }
        & > h3 {
            font-size: 3vh;
            width: 100%;
        }

        // For the buttons
        & > div {
            transition: background-color 0.2s;
            background-color: aliceblue;
            box-shadow: 3px 3px 2px #333;
            margin: 2vh 0;
            display: inline-block;
            width: max-content;
        }
        & > .other-service {
            background-color: rgb(241, 124, 143);
        }
        & > div:hover {
            background-color: gray;
            cursor: pointer;
        }
        & > div:active {
            box-shadow: 0 0;
            translate: 3px 3px;
        }
    }

    // For the info
    & > .info-container {
        border: solid black 2px;
        height: calc(100% - 4vh);
        transition: all 0.7s;
        margin: 2vh 1vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 2.5vh;
        padding: 0 2vw;
        text-align: justify;

        & > h2 {
            text-align: center;
            font-size: 3.5vh;
        }
    }
    & > .show {
        flex: 8;
        width: 100%;
        overflow-y: auto;
        border-radius: 10% 0% 0% 10%;
    }
    & > .hide {
        width: 0%;
        border-width: 0px;
        content-visibility: hidden;
    }
`;

export const InfoText = (props) => {
    const option = props.option;

    // Text to display based on option chose
    return (
        <>
            {option === null && (
                <>
                    <p>Select one of the options to get more info</p>
                </>
            )}
            {option === "personal-counselling" && (
                <>
                    <h2>Personal Counselling</h2>
                    <p>
                        Personal counseling with a registered dietitian offers
                        tailored one-on-one sessions to address individual
                        nutrition needs and goals. Beginning with a thorough
                        assessment, the dietitian crafts a personalized
                        nutrition plan. This plan, aligned with objectives like
                        weight management or chronic condition management, is
                        complemented by education on essential nutrients and
                        portion control. Collaborative meal planning strategies
                        empower clients to make healthier choices. Behavior
                        change support, continuous monitoring, and plan
                        adjustments ensure progress. Registered dietitians also
                        offer specialized guidance for conditions like diabetes.
                        Through ongoing support and a holistic approach,
                        individuals gain the knowledge and skills to
                        independently make informed dietary decisions, promoting
                        lasting well-being.
                    </p>
                </>
            )}
            {option === "online-counselling" && (
                <>
                    <h2>Online Counselling</h2>
                    <p>
                        Online nutrition services provide personalized guidance
                        through virtual sessions. Starting with a detailed
                        assessment, these services create customized nutrition
                        plans to meet individual goals, such as weight
                        management or fitness enhancement. Education on
                        nutrients, portion control, and meal planning is
                        conveyed digitally. Clients receive behavioral
                        strategies, ongoing progress tracking, and plan
                        adjustments for effective results. Specialized support
                        is available for conditions like allergies or heart
                        health. The online platform ensures convenient access,
                        and holistic well-being is considered. This empowers
                        individuals to make informed dietary choices, fostering
                        lasting health improvements through evidence-based
                        virtual nutrition services.
                    </p>
                </>
            )}
            {option === "team-counselling" && (
                <>
                    <h2>Team Sports and Athletics</h2>
                    <p>
                        Team sports counseling involves tailored guidance for
                        athletic groups. Through focused sessions, the team's
                        unique goals and challenges are assessed. Customized
                        strategies are developed to optimize performance,
                        considering factors like nutrition, recovery, and energy
                        management. Education on proper fueling and hydration is
                        provided, enhancing collective understanding.
                        Collaborative planning addresses specific needs,
                        ensuring peak performance. Behavioral tactics and
                        progress monitoring aid in maintaining consistency. The
                        counseling process fosters team cohesion and
                        communication. By addressing individual roles within the
                        team dynamic, this approach maximizes overall
                        performance. Team sports counseling empowers athletes to
                        excel by combining expert guidance, teamwork, and
                        tailored strategies.
                    </p>
                </>
            )}
            {option === "corporate-counselling" && (
                <>
                    <h2>Corporate Packages</h2>
                    <p>
                        Corporate wellness packages by the registered dietitian
                        offer comprehensive health solutions for companies.
                        These packages include personalized nutritional
                        counseling, virtual workshops on balanced eating, and
                        stress management techniques. The programs encompass
                        individual assessments, custom meal plans, and ongoing
                        support to improve employees' well-being. With a focus
                        on nutrition education, these packages promote healthier
                        lifestyles, increase productivity, and foster a positive
                        work environment.
                    </p>
                </>
            )}
            {option === "personal-training" && (
                <>
                    <h2>Individual Training</h2>
                    <p>
                        Individual personal provides focused, one-on-one fitness
                        guidance. Tailored to each client's goals and abilities,
                        sessions incorporate customized workout routines, proper
                        technique, and progress tracking. These training
                        sessions encompass cardio, strength, flexibility, and
                        core exercises, promoting balanced fitness. The personal
                        trainer offers expert coaching, motivation, and
                        accountability, adapting routines as clients progress.
                        This approach ensures efficient and effective workouts,
                        helping clients achieve their fitness objectives while
                        enhancing overall health and well-being.
                    </p>
                </>
            )}
            {option === "group-training" && (
                <>
                    <h2>Groups and Families</h2>
                    <p>
                        Group personal training delivers dynamic fitness
                        sessions for small groups. These sessions combine
                        individual attention with a supportive group atmosphere.
                        Participants benefit from expert guidance in exercises
                        tailored to their fitness levels and goals. The trainer
                        fosters camaraderie, motivation, and accountability
                        within the group. Workouts encompass strength,
                        cardiovascular, and flexibility training, ensuring a
                        well-rounded fitness experience. Group personal training
                        promotes fitness progression, social interaction, and a
                        shared commitment to achieving health goals, all under
                        the guidance of a dedicated professional.
                    </p>
                </>
            )}
            {option === "online-training" && (
                <>
                    <h2>Online</h2>
                    <p>
                        Online training programs offer personalized exercise
                        plans, guidance tailored to individual goals. Through
                        regular check-ins and progress tracking, you will be
                        provided with accountability, to ensure you stay
                        motivated and on track. This combination of structured
                        training, customized guidance, and ongoing
                        accountability empowers clients to achieve their fitness
                        objectives in a flexible and accessible manner.
                    </p>
                </>
            )}
            {option === "team-training" && (
                <>
                    <h2>Corporate and Team Sports</h2>
                    <p>
                        Corporate and team training programs provide tailored
                        fitness solutions for businesses. These programs include
                        on-site workouts or online programs, ergonomic
                        assessments, and wellness workshops. They address
                        individual needs through group exercises, personalized
                        training plans, and stress-relief techniques. These
                        programs enhance physical fitness, boost morale, and
                        improve overall health, leading to increased
                        productivity and performance. Through expert guidance
                        and interactive sessions, corporate and team training
                        programs create a culture of well-being and support.
                    </p>
                </>
            )}
        </>
    );
};

export const ServiceButton = styled.div`
    border: solid #333 2px;
    border-radius: 10px;
    min-width: 30%;
    max-width: 60%;
    align-self: center;
    font-size: 2.5vh;
    padding: 0 1vw;
`;

export const MobileContent = (props) => {
    const serviceSelected = props.serviceSelected;
    return (
        <>
            <h2>{serviceSelected}</h2>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi
            numquam odio fugit tempore aliquid velit itaque, ea consequuntur
            laboriosam adipisci deleniti inventore, earum voluptatum placeat,
            aut vel et repudiandae nulla? Provident quo recusandae aspernatur
            architecto eos autem, corporis ab quaerat consequatur ipsum dolor
            ratione sunt molestias itaque sequi a dolorem dolores exercitationem
            iure excepturi laborum? Iusto reprehenderit natus labore itaque?
            Fugiat magni nesciunt nobis magnam perspiciatis cumque doloribus
            enim illo repellendus, neque eum ex temporibus, nihil, non culpa
            rerum iste dolores iure facere. Libero vel suscipit consectetur
            earum quos totam. Perspiciatis molestiae praesentium deleniti rem
            eaque provident culpa voluptatem fuga quas voluptate, dolores ex
            tempora. Explicabo perferendis delectus quo quae neque, illo non
            maiores aut dolorum perspiciatis voluptatibus sed nobis? Eos labore
            nulla quod! Modi expedita iure tenetur cupiditate commodi,
            voluptates nemo magni nesciunt rerum sequi, dicta aliquam veritatis
            facilis quas voluptas quis laboriosam unde eaque velit laborum fuga
            quasi. Amet totam quisquam laborum asperiores voluptas voluptatum
            obcaecati, ipsa quidem sapiente vero rerum, deserunt velit ut neque
            eum maiores, animi tempora doloribus. Velit consequuntur sequi
            molestias quibusdam, nostrum fugiat reiciendis. Animi obcaecati
            accusantium quas nostrum deserunt, hic unde? Totam accusamus
            corporis, cupiditate praesentium optio fuga voluptatem, officia
            laboriosam aspernatur possimus non porro quasi? Modi totam culpa
            unde nisi quidem omnis. Quae natus dolores suscipit nam ducimus ipsa
            dicta praesentium asperiores, et debitis at sunt voluptatem minima,
            repellat facilis inventore. Vitae, voluptate? Repudiandae nisi
            veritatis dolor ex possimus sunt? Quas, qui! Optio doloremque aut
            cumque pariatur delectus totam aspernatur sequi sed quia harum ipsa
            sint perferendis, voluptatibus explicabo nam neque perspiciatis,
            dolorum dolor adipisci rem dicta quaerat eveniet modi officiis! Qui.
            Exercitationem omnis impedit ducimus architecto ex reiciendis,
            explicabo sed beatae ullam quisquam quos aliquam accusantium
            blanditiis dolorem odio quae ratione iste. Omnis nulla id temporibus
            dolore dolor voluptatem molestias voluptas.
        </>
    );
};
