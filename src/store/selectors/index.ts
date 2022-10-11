import { PersistPartial } from "redux-persist/lib/persistReducer"

import { IAuthState } from "@/store/slices/auth"

export type IRootState = {
  authState: IAuthState & PersistPartial
}

const getAuth = (state: IRootState): IAuthState => state.authState

export { getAuth }
