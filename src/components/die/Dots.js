import React, { Fragment } from 'react';
import { Dot } from './Dot';

export const Dots = ({ dieArray }) => {
    let dots = [];
    for (let i = 1; i < 10; i++) {
        if (dieArray.includes(i)) {
            dots.push(true);
        } else {
            dots.push(false);
        }
    }
    return (
        <Fragment>
            {dots.map((dot, index) => <Dot key={index} black={dot} />)}
        </Fragment>

    )
}