import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as localStorage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import { IAuthState, IUserInfo } from '../../types'

const initialState: IAuthState = {
  user: undefined,
  isAuthenticated: false,
  authToken: undefined,
  error: undefined,
}

const authSlice: any = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state: IAuthState,
      { payload }: PayloadAction<{ authToken: string; user: IUserInfo }>,
    ) => {
      state.authToken = payload.authToken
      state.user = payload.user
      state.isAuthenticated = true
    },

    loginError: (state: IAuthState, { payload }: PayloadAction<{ errorMessage: string }>) => {
      state.error = Error(payload.errorMessage)
      state.isAuthenticated = false
    },

    logout: (state: IAuthState) => {
      state.isAuthenticated = false
      state.authToken = undefined
      state.error = undefined
    },
  },
})

const persistConfig = {
  key: 'auth',
  storage: localStorage.default,
  stateReconciler: autoMergeLevel2,
}

const reducer = persistReducer<IAuthState>(persistConfig, authSlice.reducer)

export const { loginSuccess, loginError, logout } = authSlice.actions

export { reducer, initialState }
