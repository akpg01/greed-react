import React from 'react';
import * as utils from '../../utils/functions';
import { Dots } from './Dots';

export const Die = ({ die, onClick }) => {

    let dieArray = utils.dice[die.value - 1];
    let backgroundColor = {
        backgroundColor : die.color
    }

    return (

        <div className={`dicer ${die.label}`} data-pos={`${die.position}`} data-val={`${die.value}`} onClick={onClick} style={backgroundColor}>
            <Dots dieArray={dieArray} die={die} />
        </div >

    );
}