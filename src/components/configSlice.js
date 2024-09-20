import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    difficulty: 1,
    maxDifficulty: 5,
    interval: 115,
    intervalPerDifficulty: 15,
    distPerDiffIncrease: 400,
    speed: 10,
    isPlaying: true,
    isGameOver: false,
}

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        increaseDifficulty: (state) => {
            state.difficulty += 1;
        },
        resetDifficulty: (state) => {
            state.difficulty = 1;
        },
        updateGameStatus: (state) => {
            state.isPlaying = !state.isPlaying;
        },
        startGame: (state) => {
            state.isPlaying = true;
            state.isGameOver = false;
        },
        stopGame: (state) => {
            state.isPlaying = false;
            state.isGameOver = true;
        }
    }
});

export const { increaseDifficulty, resetDifficulty, updateGameStatus, startGame, stopGame } = configSlice.actions;

export default configSlice.reducer;