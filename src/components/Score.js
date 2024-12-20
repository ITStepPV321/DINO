import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetScore, updateRecord, updateScore } from "./statsSlice";
import { increaseDifficulty, resetDifficulty, startGame, stopGame, updateGameStatus } from "./configSlice";

export default function Score() {
    const stats = useSelector((state) => state.stats);
    const config = useSelector((state) => state.config);

    const dispatch = useDispatch();

    useEffect(() => {
        let intervalId;

        if (config.isPlaying) {
            intervalId = setInterval(() => {
                if (stats.score % config.distPerDiffIncrease === 0 && stats.score !== 0) {
                    if (config.difficulty !== config.maxDifficulty) {
                        dispatch(increaseDifficulty());

                        console.log(config.difficulty);
                    }
                }

                dispatch(updateScore());

                if (stats.score === stats.record) {
                    dispatch(updateRecord());
                }
            }, config.interval - config.intervalPerDifficulty * config.difficulty);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [
        dispatch,
        config.isPlaying,
        stats.score,
        config.difficulty,
        config.interval,
        config.intervalPerDifficulty,
        stats.record,
        config.distPerDiffIncrease,
        config.maxDifficulty,
    ]);

    const playStopOnClick = () => {
        // setIsPlaying(!is_playing);
        if (config.isGameOver)
        {
            dispatch(startGame());
        }
        else
        {
            dispatch(stopGame())
        }

        dispatch(resetScore());
        dispatch(resetDifficulty());
    };

    const pauseOnClick = () => {
        // setIsPlaying(!is_playing);
        dispatch(updateGameStatus());
    };

    return (
        <div className="speed">
            <div className="score-container">
                <p className="score">{stats.score}</p>
                <p className="record">{stats.record}</p>
            </div>

            <div className="btns-container">
                <button onClick={playStopOnClick}>
                    <img
                        width="30"
                        height="30"
                        src="https://img.icons8.com/?size=100&id=37308&format=png&color=000000"
                        alt="play--v1"
                    />
                </button>
                <button onClick={pauseOnClick}>
                    <img
                        width="30"
                        height="30"
                        src="https://img.icons8.com/ios-filled/50/pause--v1.png"
                        alt="pause--v1"
                    />
                </button>
            </div>
        </div>
    );
}
