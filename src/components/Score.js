import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { resetScore, updateRecord, updateScore } from './statsSlice';
import { increaseDifficulty, resetDifficulty } from './configSlice';

export default function Speed()
{
    const stats = useSelector((state) => state.stats);
    const config = useSelector((state) => state.config);

    const [is_playing, setIsPlaying] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        let intervalId;

        if (is_playing)
        {
            intervalId = setInterval(() => {
                if ((stats.score) % config.distPerDiffIncrease === 0 && stats.score != 0)
                {
                    if (config.difficulty != config.maxDifficulty) {
                        dispatch(increaseDifficulty());
                    }
                }

                dispatch(updateScore());

                if (stats.score == stats.record)
                {
                    dispatch(updateRecord());
                }
            }, config.interval - (config.intervalPerDifficulty * config.difficulty));
        }

        return () => {
            if (intervalId)
            {
                clearInterval(intervalId);
            }
        }
    }, [dispatch, is_playing, stats.score, config.difficulty])

    const playStopOnClick = () => {
        setIsPlaying(!is_playing);
        dispatch(resetScore());
        dispatch(resetDifficulty());
    }

    const pauseOnClick = () => {
        setIsPlaying(!is_playing);
    }

    return (
        <div className="speed">
            <div className='score-container'>
                <p className='score'>
                    { stats.score }
                </p>
                <p className='record'>
                    { stats.record }
                </p>
            </div>

            <div className='btns-container'>
                <button onClick={playStopOnClick}>
                    <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/play--v1.png" alt="play--v1"/>
                </button>
                <button onClick={pauseOnClick}>
                    <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/pause--v1.png" alt="pause--v1"/>
                </button>
            </div>
        </div>
    )
}