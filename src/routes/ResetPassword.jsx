import DesktopLayout from "../layouts/DesktopLayout";
import MobileLayout from "../layouts/MobileLayout";

const ResetPassword = () => {
    return (
        <>
            <DesktopLayout content={<DesktopContent />} />
            <MobileLayout content={<MobileContent />} />
        </>
    );
};

export const DesktopContent = () => {
    return <>test</>;
};

export const MobileContent = () => {
    return <>In development..</>;
};

export default ResetPassword;
