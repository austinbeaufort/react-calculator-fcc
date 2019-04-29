import React from 'react';

import CalcKey from '../CalcKey/CalcKey';

import OperatorArray from '../../helperBin/operatorArray';

const OperatorsGrid = props => {
    let completeGrid = OperatorArray.map(item => {
        return <CalcKey 
        id={item.id} 
        keyValue={item.keyValue} 
        key={item.keyValue} 
        click={props.click}/>
    });
    return completeGrid;
}

export default OperatorsGrid;