// Невеличка анексія тім-ліда
import Squirrel from "./Models/Squirrel";
import Score from "./Score";
import Ground from "./Models/Ground";
import { useEffect, useState } from "react";
import Obstacle from "./Models/Obstacle";
import { useDispatch, useSelector } from "react-redux";
import { resetDifficulty, stopGame, updateGameStatus } from "./configSlice";
import { resetScore } from "./statsSlice";

// Юра + Семен = <3;    тут сама гра, логіка

export default function Game() {
    const dispatch = useDispatch();
    const config = useSelector((state) => state.config);
    const [obstacles, setObstacles] = useState([]);

    // Поява перешкод
    useEffect(() => {
        const obstacleInterval = setInterval(() => {
            if (config.isPlaying) {
                const newObstacle = {
                    id: Date.now(),
                    speed: config.speed * config.difficulty,
                };
                setObstacles((prev) => [...prev, newObstacle]);
            }
        }, 20000 / (config.speed * config.difficulty));

        return () => clearInterval(obstacleInterval);
    }, [config.difficulty, config.isPlaying]);

    // Оновлення швидкості перешкод
    useEffect(() => {
        setObstacles((prevObstacles) =>
            prevObstacles.map((obstacle) => ({
                ...obstacle,
                speed: config.speed * config.difficulty,
            }))
        );
    }, [config.difficulty, config.speed]);

    // Очищення перешкод, якшо гра завершена
    useEffect(() => {
        if (!config.isGameOver)
        {
            setObstacles([]);
        }
    }, [config.isGameOver])

    // Зупинка/Відновлення швидкості перешкод
    useEffect(() => {
        if (!config.isGameOver)
        {
            if (!config.isPlaying)
            {
                setObstacles((prevObstacles) =>
                    prevObstacles.map((obstacle) => ({
                        ...obstacle,
                        speed: 0,
                    }))
                );
            }
            else {
                setObstacles((prevObstacles) =>
                prevObstacles.map((obstacle) => ({
                    ...obstacle,
                    speed: config.speed * config.difficulty,
                    }))
                );
            }
        }
        else {
            setObstacles((prevObstacles) =>
                prevObstacles.map((obstacle) => ({
                    ...obstacle,
                    speed: 0,
                }))
            );
        }
    }, [config.isPlaying, config.difficulty, config.speed, config.isGameOver])

    const handleGameOver = () => {
        dispatch(stopGame());
        dispatch(resetScore());
        dispatch(resetDifficulty());

        setObstacles((prevObstacles) =>
            prevObstacles.map((obstacle) => ({
                ...obstacle,
                speed: 0,
            }))
        );
    };

    return (
        <div>
            <Squirrel onCollision={handleGameOver} />
            <div>
                {obstacles.map((obstacle) => (
                    <Obstacle key={obstacle.id} speed={obstacle.speed} />
                    ))}
            </div>
            <Ground />
            {config.isGameOver && <div className="game-over">Game Over</div>}
            <Score />
        </div>
    );
}