import styled from "styled-components";

const EditProgram = () => {
    return <EditProgramDiv>Edit Program</EditProgramDiv>;
};

export default EditProgram;

export const EditProgramDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: calc(min(2vw, 2vh));
    position: relative;
`;
