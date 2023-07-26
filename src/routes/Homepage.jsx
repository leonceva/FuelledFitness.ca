import React from "react";
import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";

const Homepage = () => {
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

export default Homepage;

export const DesktopContent = () => {
    return <></>;
};

export const MobileContent = () => {
    return (
        <>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Voluptatibus quos quae libero recusandae quod enim doloribus aperiam
            eveniet ex molestiae. Cum labore illo vero rerum aliquid tempore
            beatae quaerat pariatur? Ut reiciendis impedit quaerat ea incidunt
            ab vitae nisi quos assumenda explicabo fugiat a dolor praesentium
            minima nesciunt nobis voluptas, suscipit laborum ipsam
            exercitationem corrupti aperiam. Officiis deserunt minus deleniti?
            Beatae, optio. Laudantium, corporis aliquid itaque blanditiis nisi
            doloremque harum eos facilis veritatis. Voluptate architecto harum,
            voluptates tempore minus velit quos quis? Libero, laudantium? Ex at
            corporis eum doloribus iusto. Quidem, voluptatem? Deserunt amet
            magnam fuga nihil consectetur excepturi eum tempore repellat,
            temporibus aperiam minus dolor fugiat doloremque delectus enim
            animi, quam laudantium error. Maiores quidem rem reprehenderit
            commodi obcaecati. Repellendus illo incidunt odit ea voluptate?
            Placeat voluptatem tempora voluptate optio incidunt? Impedit quam
            quos perferendis, rerum dolorum tenetur molestiae obcaecati qui
            facere necessitatibus. Atque itaque magni obcaecati nam accusantium!
            Illo iste consectetur dignissimos corporis laborum alias quibusdam,
            ratione sit odit consequatur autem exercitationem commodi molestias
            quos delectus obcaecati sequi cum nulla doloremque nisi deserunt
            quae. Earum iusto aperiam ullam. Unde, consequuntur quasi. Nesciunt
            quisquam quos quod expedita. Commodi sint rem ducimus? Molestias, at
            sunt, quia atque impedit unde eius commodi dolorem nam in odio? In
            eveniet repudiandae non dolor. Ea amet hic facere reiciendis quidem
            mollitia non, molestiae deserunt vel maiores! Id est non deleniti!
            Vel libero rem quis repudiandae, deserunt et magnam! Pariatur
            necessitatibus ducimus neque eaque voluptates! Veritatis aspernatur
            officia tempora ab doloremque doloribus harum, blanditiis suscipit
            tempore enim saepe quo deleniti et qui sunt nemo omnis quibusdam
            magnam at nam corporis minima! Nam dolor accusamus animi. Aliquid
            quo incidunt dolor doloremque voluptate illum quis culpa ipsa qui,
            neque, ipsam, quae repellat possimus quisquam cupiditate omnis autem
            quos inventore dignissimos unde esse deleniti. Nam vitae veniam
            dolores.
        </>
    );
};
