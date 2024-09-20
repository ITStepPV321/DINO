import React, { useEffect, useState } from 'react';
import obstacleImage from '../../assets/Obstacle.png';

const Obstacle = ({ speed }) => {
    const [position, setPosition] = useState(window.innerWidth);

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition((prev) => prev - speed);
        }, 20);

        return () => clearInterval(interval);
    }, [speed]);

    const obstacleStyle = {
        position: 'absolute',
        top: '50%',
        left: `${position}px`,
        transform: 'translateY(-50%)',
        width: '50px',
        height: '70px',
        backgroundImage: `url(${obstacleImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
    };

    return <div className='obstacle' style={obstacleStyle}></div>;
};


export default Obstacle;