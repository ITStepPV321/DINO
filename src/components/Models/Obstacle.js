import React, { useEffect, useState } from 'react';
import treeStumpImage from '../../assets/TreeStump.png';

const TreeStump = ({ speed }) => {
    const [position, setPosition] = useState(window.innerWidth);

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition((prev) => prev - speed);
        }, 20);

        return () => clearInterval(interval);
    }, [speed]);

    const Style = {
        position: 'absolute',
        top: '90%',
        left: `${position}px`,
        transform: 'translateY(-50%)',
        width: '74px',
        height: '58px',
        backgroundImage: `url(${treeStumpImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
    };

    return <div className='obstacle' style={Style}></div>;
};


export default TreeStump;