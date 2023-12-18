import styled from "styled-components";

const NewProgram = () => {
    return <NewProgramDiv></NewProgramDiv>;
};

export default NewProgram;

export const NewProgramDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: calc(min(2vw, 2vh));
    position: relative;
`;
