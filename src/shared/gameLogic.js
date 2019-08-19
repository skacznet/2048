import { randomFromRange } from './helpers';

const addRandomItem = (itemsArray) => {
    let emptyIndexes = [];
    itemsArray.forEach((el, i) => {
        if(el.itemValue === 0) {
            emptyIndexes.push(i);
        }
    });

    if(emptyIndexes.length > 0) {
        itemsArray[randomFromRange(emptyIndexes)].itemValue = 2;
    }

    return itemsArray;
}

export const onLeft = (items) => {
    let updatedItems = [...items];
    let itemsChanged = false;
    let indexesToMoveLeft = [1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15];
    // Check all the elements which could be moved left. Start from the left.
    indexesToMoveLeft.forEach((i) => {
        // Only for elements with a value
        if(updatedItems[i].itemValue !== 0) {
            // Check elements on the left
            let checkIndex = i%4;
            // Elements on the left with the same value
            let indexesToConnect = [];
            // Empty slots on the left
            let emptyIndexes = [];
            // Check the whole row on the left of the item, from left to right.
            while(checkIndex > 0) {
                if(updatedItems[i-checkIndex] !== undefined) {
                    if(updatedItems[i-checkIndex].itemValue === updatedItems[i].itemValue) {
                        // Element with the same value
                        indexesToConnect.push(checkIndex);
                    } else if(updatedItems[i-checkIndex].itemValue === 0) {
                        // Empty slot
                        emptyIndexes.push(checkIndex);
                    }
                }
                checkIndex--;
            }
            // Action is required only if there is empty space on the left or there are elements with the same value
            if(indexesToConnect.length > 0 || emptyIndexes.length > 0) {
                if(indexesToConnect.length === 0) {
                    // There are no items with the same value. Move an item as far as it is possible.
                    updatedItems[i-emptyIndexes[0]].itemValue = updatedItems[i].itemValue;
                    updatedItems[i].itemValue = 0;
                    itemsChanged = true;
                } else {
                    // Check if there is a clear path between items to connect.
                    // Take the closest one. If it is just on the left or the item on the right of it is empty, the path is clear.
                    let clearPathIndex = indexesToConnect[indexesToConnect.length - 1];
                    let clearPath = true;
                    if(indexesToConnect[indexesToConnect.length - 1] === 1) {
                        clearPath = true;
                    } else if(emptyIndexes.includes(clearPathIndex - 1)) {
                        clearPath = true;
                    } else {
                        clearPath = false;
                    }
                    if(clearPath) {
                        // Connect items
                        updatedItems[i-indexesToConnect[indexesToConnect.length - 1]].itemValue *= 2;
                        updatedItems[i].itemValue = 0;
                        itemsChanged = true;
                    } else {
                        // There is something between items with the same value. Move the item as far as it is possible.
                        if(emptyIndexes.length > 0) { 
                            updatedItems[i-emptyIndexes[0]].itemValue = updatedItems[i].itemValue;
                            updatedItems[i].itemValue = 0;
                            itemsChanged = true;
                        }
                    }
                }
            }
        }
    });
    if(itemsChanged) {
        updatedItems = addRandomItem(updatedItems);
    }
    return updatedItems;
}

export const onRight = (items) => {
    let updatedItems = [...items];
    let itemsChanged = false;
    let indexesToMoveRight = [14, 13, 12, 10, 9, 8, 6, 5, 4, 2, 1, 0];
    // Check all the elements which could be moved right. Start from the right.
    indexesToMoveRight.forEach((i) => {
        // Only for elements with a value
        if(updatedItems[i].itemValue !== 0) {
            // Check elements on the right
            let checkIndex = 0;
            if(i%4 === 0) {
                checkIndex = 3;
            } else if(i%4 === 1) {
                checkIndex = 2;
            } else if(i%4 === 2) {
                checkIndex = 1;
            }
            
            // Elements on the right with the same value
            let indexesToConnect = [];
            // Empty slots on the right
            let emptyIndexes = [];
            // Check the whole row on the right of the item, from right to left.
            while(checkIndex >= 1) {
                if(updatedItems[i+checkIndex] !== undefined) {
                    if(updatedItems[i+checkIndex].itemValue === updatedItems[i].itemValue) {
                        // Element with the same value
                        indexesToConnect.push(checkIndex);
                    } else if(updatedItems[i+checkIndex].itemValue === 0) {
                        // Empty slot
                        emptyIndexes.push(checkIndex);
                    }
                }
                checkIndex--;
            }
            // Action is required only if there is empty space on the right or there are elements with the same value
            if(indexesToConnect.length > 0 || emptyIndexes.length > 0) {
                if(indexesToConnect.length === 0) {
                    // There are no items with the same value. Move an item as far as it is possible.
                    updatedItems[i+emptyIndexes[0]].itemValue = updatedItems[i].itemValue;
                    updatedItems[i].itemValue = 0;
                    itemsChanged = true;
                } else {
                    // Check if there is a clear path between items to connect.
                    // Take the closest one. If it is just on the right or the item on the left of it is empty, the path is clear.
                    let clearPathIndex = indexesToConnect[indexesToConnect.length - 1];
                    let clearPath = true;
                    if(indexesToConnect[indexesToConnect.length - 1] === 1) {
                        clearPath = true;
                    } else if(emptyIndexes.includes(clearPathIndex - 1)) {
                        clearPath = true;
                    } else {
                        clearPath = false;
                    }
                    if(clearPath) {
                        // Connectitems
                        updatedItems[i+indexesToConnect[indexesToConnect.length - 1]].itemValue *= 2;
                        updatedItems[i].itemValue = 0;
                        itemsChanged = true;
                    } else {
                        // There is something between items with the same value. Move the item as far as it is possible.
                        if(emptyIndexes.length > 0) { 
                            updatedItems[i+emptyIndexes[0]].itemValue = updatedItems[i].itemValue;
                            updatedItems[i].itemValue = 0;
                            itemsChanged = true;
                        }
                    }
                }
            }
        }
    });
    if(itemsChanged) {
        updatedItems = addRandomItem(updatedItems);
    }
    return updatedItems;
}

export const onUp = (items) => {
    let updatedItems = [...items];
    let itemsChanged = false;
    // Check all the elements which could be moved up. Start from the top and move to the end.
    for(let i=4; i<16; i++) {
        // Only for elements with a value
        if(updatedItems[i].itemValue !== 0) {
            // Check 3 rows above (4 elements per row*3 = 12) (as far as possible)
            let checkIndex = 12;
            // Elements above with the same value
            let indexesToConnect = [];
            // Empty slots above
            let emptyIndexes = [];
            // Check the whole column above the item, from top to bottom.
            while(checkIndex >= 4) {
                if(updatedItems[i-checkIndex] !== undefined) {
                    if(updatedItems[i-checkIndex].itemValue === updatedItems[i].itemValue) {
                        // Element with the same value
                        indexesToConnect.push(checkIndex);
                    } else if(updatedItems[i-checkIndex].itemValue === 0) {
                        // Empty slot
                        emptyIndexes.push(checkIndex);
                    }
                }
                checkIndex = checkIndex - 4;
            }
            // Action is required only if there is empty space above or there are elements with the same value
            if(indexesToConnect.length > 0 || emptyIndexes.length > 0) {
                if(indexesToConnect.length === 0) {
                    // There are no items with the same value. Move an item as far as it is possible.
                    updatedItems[i-emptyIndexes[0]].itemValue = updatedItems[i].itemValue;
                    updatedItems[i].itemValue = 0;
                    itemsChanged = true;
                } else {
                    // Check if there is a clear path between items to connect.
                    // Take the closest one. If it is just above or the item below is empty, the path is clear.
                    let clearPathIndex = indexesToConnect[indexesToConnect.length - 1];
                    let clearPath = true;
                    if(indexesToConnect[indexesToConnect.length - 1] === 4) {
                        clearPath = true;
                    } else if(emptyIndexes.includes(clearPathIndex - 4)) {
                        clearPath = true;
                    } else {
                        clearPath = false;
                    }
                    if(clearPath) {
                        // Connect items
                        updatedItems[i-indexesToConnect[indexesToConnect.length - 1]].itemValue *= 2;
                        updatedItems[i].itemValue = 0;
                        itemsChanged = true;
                    } else {
                        // There is something between items with the same value. Move the item as far as it is possible.
                        if(emptyIndexes.length > 0) { 
                            updatedItems[i-emptyIndexes[0]].itemValue = updatedItems[i].itemValue;
                            updatedItems[i].itemValue = 0;
                            itemsChanged = true;
                        }
                    }
                }
            }
        }
    }
    if(itemsChanged) {
        updatedItems = addRandomItem(updatedItems);
        }
    return updatedItems;
}

export const onDown = (items) => {
    let updatedItems = [...items];
    let itemsChanged = false;
    // Check all the elements which could be moved down. Start from the bottom and move to the beginning.
    for(let i=11; i>=0; i--) {
        // Only for elements with a value
        if(updatedItems[i].itemValue !== 0) {
            // Check 3 rows below (4 elements per row*3 = 12) (as far as possible)
            let checkIndex = 12;
            // Elements below with the same value
            let indexesToConnect = [];
            // Empty slots below
            let emptyIndexes = [];
            // Check the whole column below the item, from bottom to top.
            while(checkIndex >= 4) {
                if(updatedItems[i+checkIndex] !== undefined) {
                    if(updatedItems[i+checkIndex].itemValue === updatedItems[i].itemValue) {
                        // Element with the same value
                        indexesToConnect.push(checkIndex);
                    } else if(updatedItems[i+checkIndex].itemValue === 0) {
                        // Empty slot
                        emptyIndexes.push(checkIndex);
                    }
                }
                checkIndex = checkIndex - 4;
            }
            // Action is required only if there is empty space below or there are elements with the same value
            if(indexesToConnect.length > 0 || emptyIndexes.length > 0) {
                if(indexesToConnect.length === 0) {
                    // There are no items with the same value. Move an item as far as it is possible.
                    updatedItems[i+emptyIndexes[0]].itemValue = updatedItems[i].itemValue;
                    updatedItems[i].itemValue = 0;
                    itemsChanged = true;
                } else {
                    // Check if there is a clear path between items to connect.
                    // Take the closest one. If it is just below or the item above it is empty, the path is clear.
                    let clearPathIndex = indexesToConnect[indexesToConnect.length - 1];
                    let clearPath = true;
                    if(indexesToConnect[indexesToConnect.length - 1] === 4) {
                        clearPath = true;
                    } else if(emptyIndexes.includes(clearPathIndex - 4)) {
                        clearPath = true;
                    } else {
                        clearPath = false;
                    }
                    if(clearPath) {
                        // Connect items
                        updatedItems[i+indexesToConnect[indexesToConnect.length - 1]].itemValue *= 2;
                        updatedItems[i].itemValue = 0;
                        itemsChanged = true;
                    } else {
                        // There is something between items with the same value. Move the item as far as it is possible. 
                        if(emptyIndexes.length > 0) {
                            updatedItems[i+emptyIndexes[0]].itemValue = updatedItems[i].itemValue;
                            updatedItems[i].itemValue = 0;
                            itemsChanged = true;
                        }
                    }
                }
            }
        }
    }
    if(itemsChanged) {
        updatedItems = addRandomItem(updatedItems);
    }
    return updatedItems;
}