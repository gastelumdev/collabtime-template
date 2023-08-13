import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import config from '../../config'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token as string || localStorage.getItem("token")
      if (token) {
        
        headers.set('authorization', `JWT ${token}`)
      }
      return headers
    },
  }),
  tagTypes: config.FEATURES,
  endpoints: (builder) => ({}),
})