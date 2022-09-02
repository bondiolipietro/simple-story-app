import { combineReducers, Reducer } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'

import { reducer as authReducer } from './slices/auth'

import { IRootState } from '../types'

const rootReducer: Reducer<IRootState> = combineReducers<IRootState>({
  authState: authReducer,
})

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
})

const persistedStore = persistStore(store)

export { store, persistedStore }
