import React from 'react';

export const Dot = ({ black }) => {
    return (
        <div className={`dot ${black ? 'black' : ''}`}></div>
    );
} 