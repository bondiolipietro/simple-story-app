import { IAuthState, IRootState } from "../../types"

const getAuth = (state: IRootState): IAuthState => state.authState

export { getAuth }
