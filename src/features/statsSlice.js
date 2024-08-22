import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  difficulty: 1,
  record: 0,
  score: 0,
  speed: 10,
  coins: 0
}

export const contentSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    updateScore: (state) => {
        state.score = (state.difficulty * state.speed);
    },
    updateRecord: (state) => {
        state.record = state.score;
    },
    increaseDifficulty: (state) => {
        state.difficulty += 1;
    },
    addCoin: (state) => {
        state.coins += 10;
    }
  },
})

export default contentSlice.reducer;