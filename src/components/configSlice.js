import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    difficulty: 1,
    maxDifficulty: 5,
    interval: 115,
    intervalPerDifficulty: 15,
    distPerDiffIncrease: 400,
    speed: 10,
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
        }
    }
});

export const { increaseDifficulty, resetDifficulty } = configSlice.actions;

export default configSlice.reducer;