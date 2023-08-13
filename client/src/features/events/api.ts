import { api as apiSlice } from '../../app/services/api';
import { appName } from './config';

const api = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getData: builder.query({
            query: () => `/${appName}`,
            providesTags: [appName]
        }),
        createData: builder.mutation({
            query: (data) => ({url: `/${appName}`, method: 'POST', body: data}),
            invalidatesTags: [appName],
        }),
        getOneData: builder.query({
            query: (data) => `/${appName}/${data._id}`, providesTags: [appName],
        }),
        updateData: builder.mutation({
            query: (data) => ({url: `/${appName}/update/${data._id}`, method: 'POST', body: data}),
            invalidatesTags: [appName],
        }),
        deleteData: builder.mutation({
            query: (id) => ({url: `/${appName}/delete/${id}`, method: 'POST'}),
            invalidatesTags: [appName],
        })
    })
})

export const { useGetDataQuery, useCreateDataMutation, useDeleteDataMutation, useUpdateDataMutation } = api