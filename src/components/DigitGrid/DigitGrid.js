import React from 'react';
import CalcKey from '../CalcKey/CalcKey';
import digitGridArray from '../../helperBin/digitGridArray';

const DigitGrid = props => {

    let completeGrid = digitGridArray.map(item => {
        return <CalcKey 
        id={item.id} 
        keyValue={item.keyValue} 
        key={item.keyValue}
        click={props.click} />
    });

    return completeGrid;
}


export default DigitGrid;