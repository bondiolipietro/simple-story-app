import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import * as localStorage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"
import expireReducer from "redux-persist-expire"

const STATE_NAME = "auth"

export type IAuthState = {
  user?: IUserInfo
  isAuthenticated: boolean
  error?: Error
}

const initialState: IAuthState = {
  user: undefined,
  isAuthenticated: false,
  error: undefined,
}

const authSlice = createSlice({
  name: STATE_NAME,
  initialState,
  reducers: {
    loginSuccess: (state: IAuthState, { payload }: PayloadAction<{ user: IUserInfo }>) => {
      const { user } = payload
      state.user = user
      state.isAuthenticated = true
    },

    loginError: (state: IAuthState, { payload }: PayloadAction<{ errorMessage: string }>) => {
      state.error = Error(payload.errorMessage)
      state.isAuthenticated = false
    },
  },
})

const persistConfig = {
  key: STATE_NAME,
  storage: localStorage.default,
  stateReconciler: autoMergeLevel2,
  transforms: [expireReducer(STATE_NAME, { expireSeconds: 86400, expiredState: initialState })],
}

const reducer = persistReducer<IAuthState>(persistConfig, authSlice.reducer)

export const { loginSuccess, loginError } = authSlice.actions

export { reducer, initialState }
