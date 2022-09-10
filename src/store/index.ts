import { AnyAction, combineReducers, Reducer } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { reducer as authReducer } from './slices/auth'

import { IRootState } from '../types'

const appReducer: Reducer<IRootState> = combineReducers<IRootState>({
  authState: authReducer,
})

const rootReducer: Reducer = (state: IRootState, action: AnyAction) => {
  if (action.type === 'CLEAR_STORE') {
    storage.removeItem('persist:root')
    localStorage.clear()

    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
})

const persistedStore = persistStore(store)

export { store, persistedStore }
