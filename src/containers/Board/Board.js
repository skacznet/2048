import React, { useEffect, useState } from 'react';
import * as Styled from './styled';

import { randomPair } from '../../shared/helpers';

import { onLeft, onRight, onUp, onDown } from '../../shared/gameLogic';

import Item from '../../components/Board/Item/Item';

const Board = props => {

    const [items, setItems] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const listOfItems = items.map((el) => (
        <Item key={el.key} itemValue={el.itemValue} />
    ));

    // Game initialization
    useEffect(() => {
        let initialItems = [];
        const startKeys = randomPair(16);
        for(let i=0; i<16; i++) {
            const itemValue = startKeys.includes(i) ? 2 : 0;
            initialItems.push({
                key: i,
                itemValue: itemValue
            });
        }
        setItems(initialItems);
           
    }, []);

    useEffect(() => {
        if(!gameOver) {
            window.addEventListener('keydown', onKeyDownHandler);
            document.addEventListener('touchstart', onTouchStartHandler, false);
            document.addEventListener('touchmove', onTouchMoveHandler, false);
        }
        checkGameState();
        return () => {
            document.removeEventListener('touchstart', onTouchStartHandler, false);
            document.removeEventListener('touchmove', onTouchMoveHandler, false);
            window.removeEventListener('keydown', onKeyDownHandler);
        };   
    }, [items]);

    useEffect(() => {
        if(gameOver) {
            window.removeEventListener('keydown', onKeyDownHandler);
        }
    }, [gameOver]);

    const checkGameState = () => {
        let maxValue = 2;
        items.forEach((el, i) => {
            if (el.itemValue > maxValue) {
                maxValue = el.itemValue;
                if(maxValue >= 2048) {
                    setGameOver(true);
                    return true;
                }
            }
        });
        return false;
    }

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

    return (
        <>
            <Styled.Heading>2048</Styled.Heading>
            <Styled.Container>
                { listOfItems }
            </Styled.Container>
            <Styled.Instructions>Use arrow keys or swipe to move the blocks.</Styled.Instructions>
        </>
    )
}

export default Board;