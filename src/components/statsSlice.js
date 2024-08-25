import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  record: 200,
  score: 0,
  coins: 0
}

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    updateScore: (state) => {
        state.score += 1;
    },
    resetScore: (state) => {
      state.score = 0;
    },
    updateRecord: (state) => {
        state.record = state.score;
    },
    addCoin: (state) => {
        state.coins += 10;
    }
  },
})

export const { updateScore, resetScore, updateRecord, addCoin } = statsSlice.actions;

export default statsSlice.reducer;