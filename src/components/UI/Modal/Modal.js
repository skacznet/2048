import React, { useState } from 'react';

import { Transition } from 'react-transition-group';

import * as Styled from './styled';

const Modal = props => {

    const [show, setShow] = useState(false);

    setTimeout(() => {
        setShow(true);
    }, 0);

    const duration = 200;

    const backdropWrapperDefault = {
        transition: `opacity ${duration}ms ease-out`,
        opacity: 0,
    }

    const modalWrapperDefault = {
        transition: `all ${duration}ms ease-out`,
        opacity: 0,
        transform: 'translateY(-200px)'
    }

    const backdropWrapperTransition = {
        entering: { opacity: 1 },
        entered:  { opacity: 1 },
        exiting:  { opacity: 0 },
        exited:  { opacity: 0 },
    };

    const modalWrapperTransition = {
        entering: { opacity: 1, transform: 'translateY(0)' },
        entered:  { opacity: 1, transform: 'translateY(0)' },
        exiting:  { opacity: 0, transform: 'translateY(-200px)' },
        exited:  { opacity: 0, transform: 'translateY(-200px)' },
    };

    let heading = 'Good job!';
    let content = 'You have won!';

    if(!props.win) {
        heading = 'You\'ve lost!';
        content = 'Don\'t worry, you can try one more time!';
    }

    return (
        <>
            <Transition in={show} timeout={duration}>
                {state => (
                    <div style={{
                        ...backdropWrapperDefault,
                        ...backdropWrapperTransition[state]
                    }}>
                        <Styled.Backdrop />
                    </div>
                )}
            </Transition>
            <Styled.ModalWrapper>
                <Transition in={show} timeout={duration}>
                    {state => (
                        <div style={{
                            ...modalWrapperDefault,
                            ...modalWrapperTransition[state]
                        }}>
                            <Styled.Modal>
                                <Styled.Heading>{heading}</Styled.Heading>
                                <Styled.Content>{content}</Styled.Content>
                                <Styled.ButtonsContainer>
                                    <Styled.ResetButton onClick={props.onResetGame}>Reset game</Styled.ResetButton>
                                    <Styled.CloseButton onClick={props.onCloseModal}>Close</Styled.CloseButton>
                                </Styled.ButtonsContainer>
                            </Styled.Modal>
                        </div>
                    )}
            </Transition>
            </Styled.ModalWrapper>
        </>
    );
}

export default Modal;