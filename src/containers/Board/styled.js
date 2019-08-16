import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-gap: 10px 10px;
    width: 500px;
    height: 500px;
    border: #EFDDE5 10px solid;
    background-color: #EFDDE5;
    margin: auto;
    @media (max-width: 540px) {
        width: 400px;
        height: 400px;
    }
    @media (max-width: 480px) {
        width: 360px;
        height: 360px;
        border: #EFDDE5 5px solid;
        grid-gap: 5px 5px;
    }
    @media (max-width: 400px) {
        width: 280px;
        height: 280px;
    }
`;

export const Heading = styled.h1`
    font-size: 60px;
    color: #8C385F;
    text-align: center;
    line-height: 1;
    margin-top: 45px;
    margin-bottom: 45px;
`;

export const Instructions = styled.p`
    font-size: 21px;
    text-align: center;
    margin-top: 45px;
    @media (max-width: 400px) {
        font-size: 16px;
    }
`;