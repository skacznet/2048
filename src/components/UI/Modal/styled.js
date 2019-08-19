import styled from 'styled-components';

export const Backdrop = styled.div`
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
    opacity: 0;
    opacity: ${props => {
        if(props.hidden) {
            return '0';
        } else {
            return '1';
        }
    }};
    transition: all 0.2s ease-out;
`;

export const ModalWrapper = styled.div`
    z-index: 11;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Modal = styled.div`
    display: inline-block;
    background-color: #fff;
    padding: 45px;
    @media (max-width: 540px) {
        padding: 20px;
    }
    margin: 10px;
`;

export const Heading = styled.h2`
    font-size: 60px;
    text-transform: uppercase;
    margin-top: 0;
    margin-bottom: 0;
    color: #8C385F;
    text-align: center;
    @media (max-width: 540px) {
        font-size: 48px;
    }
`;

export const Content = styled.p`
    margin-top: 10px;
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    color: #B9668D;
    line-height: 1.1;
`;

export const ResetButton = styled.span`
    cursor: pointer;
    display: inline-block;
    color: #fff;
    background-color: #8C385F;
    padding: 10px;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 18px;
    width: 110px;
    text-align: center;
    margin: 0 5px;
    @media (max-width: 540px) {
        font-size: 16px;
        padding: 7px 3px;
        box-sizing: border-box;
    }
`;

export const CloseButton = styled.span`
    cursor: pointer;
    display: inline-block;
    color: #fff;
    background-color: #B9668D;
    padding: 10px;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 18px;
    width: 110px;
    text-align: center;
    margin: 0 5px;
    @media (max-width: 540px) {
        font-size: 16px;
        padding: 7px 3px;
        box-sizing: border-box;
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 45px;
`;