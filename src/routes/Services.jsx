import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";

const Services = (props) => {
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
        <>
            <DesktopLayout
                LeftSide={<p>Left Side</p>}
                RightSide={<p>Right Side</p>}
                content={<DesktopContent serviceSelected={serviceSelected} />}
            />
            <MobileLayout content={<MobileContent />} />
        </>
    );
};

export default Services;

export const DesktopContent = (props) => {
    const serviceSelected = props.serviceSelected;
    return (
        <>
            <h2>{serviceSelected}</h2>
        </>
    );
};

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
