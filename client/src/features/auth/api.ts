import { api as apiSlice } from '../../app/services/api'
import type { UserResponse, LoginRequest } from './types'



const api = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<UserResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
    })
})

export const { useLoginMutation } = api