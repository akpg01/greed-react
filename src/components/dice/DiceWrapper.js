import React, { Fragment } from 'react';
import { Die } from '../die/Die';

export const DiceWrapper = ({ dice, onClick }) => {
    return (
        <Fragment>
            <Die die={dice[0]} onClick={onClick(dice[0])} />
            <Die die={dice[1]} onClick={onClick(dice[1])} />
            <Die die={dice[2]} onClick={onClick(dice[2])} />
            <Die die={dice[3]} onClick={onClick(dice[3])} />
            <Die die={dice[4]} onClick={onClick(dice[4])} />
            <Die die={dice[5]} onClick={onClick(dice[5])} />
        </Fragment>
    );
}