import React from "react";
import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";

const ContactMe = () => {
    return (
        <>
            <DesktopLayout
                LeftSide={<p>Left Side</p>}
                RightSide={<p>Right Side</p>}
                content={<DesktopContent />}
            />
            <MobileLayout content={<MobileContent />} />
        </>
    );
};

export default ContactMe;

export const DesktopContent = () => {
    return <></>;
};

export const MobileContent = () => {
    return (
        <>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. At dolore
            ipsum obcaecati, possimus animi perspiciatis! Omnis provident
            tempora voluptatum commodi dolorem sequi totam cumque? Expedita
            doloribus nostrum maxime unde quam! Autem, blanditiis quaerat iure,
            quo, hic illo possimus fuga fugiat temporibus dolores ratione quae
            dolore tempora non. Fugit velit veniam eveniet, commodi totam quae
            adipisci alias perferendis dolore autem quis. Alias repudiandae
            nostrum, doloremque soluta ullam impedit vero! Eaque corrupti neque
            necessitatibus? Nulla dolores cum illo quaerat veritatis atque sint?
            Rem, ea ullam. Porro, amet aut modi unde optio atque! Facere,
            mollitia. Corporis dolore iste, temporibus quam, animi reprehenderit
            voluptatibus accusamus est, quibusdam sunt molestias porro nihil
            laudantium dolorem? Ea pariatur quos velit nisi eaque soluta dolore
            blanditiis cumque labore. Ipsam, necessitatibus laudantium corrupti
            numquam enim saepe similique neque, consectetur molestias sint rem
            itaque commodi voluptatum non, minima nam debitis at id modi aut
            nulla? Recusandae totam delectus explicabo praesentium! Commodi
            temporibus delectus reiciendis, error ducimus ipsam neque iste quia
            consectetur rem quam nulla aperiam sit iusto ea, repellendus
            molestiae. Quis ab aperiam assumenda magni fugiat vitae commodi,
            quae aliquid. Fugiat ipsum cum corrupti beatae, dicta est. Similique
            ducimus, esse facere quia libero maxime fugiat qui dolore fugit
            reprehenderit asperiores aliquid expedita odit eveniet repudiandae.
            Quas, iusto. Illum, expedita at? Eaque assumenda architecto nihil
            iusto impedit. Repellendus, aut dolores nostrum corrupti inventore
            quo officia dolor temporibus dolore odit, cupiditate maiores! Eum
            perspiciatis repellat rerum doloremque molestias nisi, quibusdam
            aperiam autem. Fugiat dolore, ratione voluptate aspernatur
            dignissimos soluta vero optio, cumque voluptatibus iste quas. Eos
            vero soluta accusantium beatae, quis illum exercitationem cumque,
            reiciendis officiis quos similique neque! Suscipit, autem quod!
            Sapiente, voluptate modi eum suscipit earum assumenda consequuntur
            nemo praesentium libero veritatis exercitationem. Nam magnam
            perferendis iste magni exercitationem totam aperiam voluptatibus
            esse. Illum, dolore. Molestias eos distinctio consequuntur dolorum.
        </>
    );
};
