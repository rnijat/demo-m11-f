/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/services/api'

const userService = api.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
      transformResponse: (response: any) => response.data,
    }),
    getOthers: builder.query({
      query: (queries)  => ({
        url: `/users/others?${new URLSearchParams(queries)}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => response.data,
      keepUnusedDataFor: 0,
    }),
    transfer: builder.mutation({
      query: (body) => ({
        url: '/users/transfer',
        method: 'POST',
        body,
      }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ['User', 'Transfer'],
    })
  }),
  overrideExisting: true,
})

export const { useMeQuery, useGetOthersQuery, useTransferMutation } = userService

export default userService
