import { createSelector } from 'reselect'

import { AuthState } from '../rootReducer'

const getPending = (state: AuthState) => state.auth.pending
const getToken = (state: AuthState) => state.auth.token
const getError = (state: AuthState) => state.auth.error

export const getAuthSelector = createSelector(getToken, (token) => token)

export const getPendingSelector = createSelector(
    getPending,
    (pending) => pending
)

export const getErrorSelector = createSelector(getError, (error) => error)
