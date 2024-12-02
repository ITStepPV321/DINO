import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Squirrel({ onCollision }) {
    const config = useSelector((state) => state.config);
    const [pos, setPos] = useState(94);
    const [velocity, setVelocity] = useState(7);
    const [isJumpUp, setIsJumpUp] = useState(false);
    const [isJump, setIsJump] = useState(false);
    const gravity = 0.50;  // Збільшив гравітацію (Юр є баг зі стрибком, білка деколи стрибає зависоко. Попереднє значення: 0.30)

    useEffect(() => {
        const handleSpace = (e) => {
            if (e.keyCode === 32 && !isJump) {
                setIsJump(true);
                setIsJumpUp(true);
                setVelocity(5);
            }
        };

        document.addEventListener('keydown', handleSpace, true);
        return () => document.removeEventListener('keydown', handleSpace, true);
    }, [isJump]);

    useEffect(() => {
        if (!config.isGameOver)
        {
            let intervalId;
    
            if (isJump) {
                intervalId = setInterval(() => {
                    setPos(prevPos => {
                        let newPos = prevPos;
    
                        if (isJumpUp) {
                            newPos -= velocity;
                            setVelocity(prevVelocity => prevVelocity - gravity);
    
                            if (velocity <= 0) {
                                setIsJumpUp(false);
                            }
                        } else {
                            newPos += velocity;
                            setVelocity(prevVelocity => prevVelocity + gravity);
    
                            if (newPos >= 94) {
                                newPos = 94;
                                setIsJump(false);
                            }
                        }
    
                        return newPos;
                    });
                }, 20);
            }
    
            return () => clearInterval(intervalId);
        }
    }, [isJump, isJumpUp, velocity, config.isGameOver]);

    // Колізія з перешкодами
    useEffect(() => {
        const checkCollision = () => {
            const squirrelRect = document.querySelector('.squirrel').getBoundingClientRect();

            const obstacles = document.querySelectorAll('.obstacle');
            obstacles.forEach(obstacle => {
                const obstacleRect = obstacle.getBoundingClientRect();
                if (
                    squirrelRect.x < obstacleRect.x + obstacleRect.width &&
                    squirrelRect.x + squirrelRect.width > obstacleRect.x &&
                    squirrelRect.y < obstacleRect.y + obstacleRect.height &&
                    squirrelRect.height + squirrelRect.y > obstacleRect.y
                ) {
                    onCollision();
                }
            });
        };

        const interval = setInterval(checkCollision, 100);

        return () => clearInterval(interval);
    }, [pos, onCollision]);

    return (
        <div
            className="squirrel"
            style={{
                top: `${pos}%`,
                transform: `translateY(-${pos}%)`
            }}>
        </div>
    );
}
