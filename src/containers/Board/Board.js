import React, { useEffect, useState } from 'react';
import * as Styled from './styled';

import { onLeft, onRight, onUp, onDown, initializeGame, checkGameState } from '../../shared/gameLogic';

import Item from '../../components/Board/Item/Item';
import Modal from '../../components/UI/Modal/Modal';

const Board = props => {

    const [items, setItems] = useState([]);
    const [gameState, setGameState] = useState({
        win: false,
        gameOver: false
    });

    const listOfItems = items.map((el) => (
        <Item key={el.key} itemValue={el.itemValue} />
    ));

    // Game initialization
    useEffect(() => {
        resetGame();
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', onKeyDownHandler);
        document.addEventListener('touchstart', onTouchStartHandler, false);
        document.addEventListener('touchmove', onTouchMoveHandler, false);
        const changeGameState = checkGameState(items);
        if(changeGameState) {
            if(changeGameState.gameOver === true) {
                document.removeEventListener('keydown', onKeyDownHandler);
                document.removeEventListener('touchstart', onTouchStartHandler, false);
                document.removeEventListener('touchmove', onTouchMoveHandler, false);
            }
            setGameState(changeGameState);
        }
        return () => {
            document.removeEventListener('keydown', onKeyDownHandler);
            document.removeEventListener('touchstart', onTouchStartHandler, false);
            document.removeEventListener('touchmove', onTouchMoveHandler, false);
        };   
    }, [items]);

    const onKeyDownHandler = (e) => {
        switch(e.keyCode) {
            case 37: return onLeftHandler();
            case 38: return onUpHandler();
            case 39: return onRightHandler();
            case 40: return onDownHandler();
            default: return null;
        }
    }

    let initialX = null;
    let initialY = null;

    const onTouchStartHandler = (e) => {
        initialX = e.touches[0].clientX;
        initialY = e.touches[0].clientY;
    };

    const onTouchMoveHandler = (e) => {
        e.preventDefault();
        if (initialX === null) {
            return;
        }

        if (initialY === null) {
            return;
        }

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;

        const diffX = initialX - currentX;
        const diffY = initialY - currentY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) {
                onLeftHandler();
            } else {
                onRightHandler();
            }  
        } else {
            if (diffY > 0) {
                onUpHandler();
            } else {
                onDownHandler();
            }  
        }

        initialX = null;
        initialY = null;
    };

    const onLeftHandler = () => {
        const updatedItems = onLeft(items);
        setItems(updatedItems);
    }

    const onRightHandler = () => {
        const updatedItems = onRight(items);
        setItems(updatedItems);
    }

    const onUpHandler = () => {
        const updatedItems = onUp(items);
        setItems(updatedItems);
    }

    const onDownHandler = () => {
        const updatedItems = onDown(items);
        setItems(updatedItems);
    }

    const resetGame = () => {
        const initialItems = initializeGame();
        setItems(initialItems);
        setGameState({
            win: false,
            gameOver: false
        });
    }

    const closeModal = () => {
        setGameState({
            ...gameState,
            gameOver: false
        })
    }

    let modal = null;
    if(gameState.gameOver) {
        modal = <Modal win={gameState.win} onResetGame={resetGame} onCloseModal={closeModal} />;
    }

    return (
        <>
            <Styled.Heading>2048</Styled.Heading>
            <Styled.Container>
                { listOfItems }
            </Styled.Container>
            <Styled.Instructions>Use arrow keys or swipe to move the blocks.</Styled.Instructions>
            { modal }
        </>
    )
}

export default Board;