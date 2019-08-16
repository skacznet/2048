import React from 'react';
import * as Styled from './styled';

const Item = props => {
    return (
        <Styled.Item itemValue={props.itemValue} />
    )
}

export default Item;