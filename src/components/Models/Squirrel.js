import { useEffect, useState } from "react";

export default function Squirrel() {
    const [pos, setPos] = useState(50);
    const [velocity, setVelocity] = useState(7); // Початкова швидкість стрибка
    const [isJumpUp, setIsJumpUp] = useState(false);
    const [isJump, setIsJump] = useState(false);
    const gravity = 0.10; // Гравітація

    useEffect(() => {
        const handleSpace = (e) => {
            if (e.keyCode === 32 && !isJump) {
                setIsJump(true);
                setIsJumpUp(true);
                setVelocity(5); // Початкова швидкість підйому
            }
        };

        document.addEventListener('keydown', handleSpace, true);
        return () => document.removeEventListener('keydown', handleSpace, true);
    }, [isJump]);

    useEffect(() => {
        let intervalId;

        if (isJump) {
            intervalId = setInterval(() => {
                setPos(prevPos => {
                    let newPos = prevPos;

                    if (isJumpUp) {
                        newPos -= velocity; // Підйом з поточною швидкістю
                        setVelocity(prevVelocity => prevVelocity - gravity); // Зменшуємо швидкість підйому

                        if (velocity <= 0) { // Коли швидкість підйому досягає 0, починаємо спуск
                            setIsJumpUp(false);
                        }
                    } else {
                        newPos += velocity; // Спуск з поточною швидкістю
                        setVelocity(prevVelocity => prevVelocity + gravity); // Збільшуємо швидкість спуску

                        if (newPos >= 50) { // Повернення до вихідної позиції
                            newPos = 50;
                            setIsJump(false); // Завершення стрибка
                        }
                    }

                    return newPos;
                });
            }, 20); // Інтервал оновлення позиції
        }

        return () => clearInterval(intervalId);
    }, [isJump, isJumpUp, velocity]);

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
