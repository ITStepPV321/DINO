import { configureStore } from '@reduxjs/toolkit'
import statsSlice from '../components/statsSlice'
import configSlice from '../components/configSlice'

export const store = configureStore({
  reducer: {
    stats: statsSlice,
    config: configSlice,
  },
})