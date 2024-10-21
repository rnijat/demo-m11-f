import api from '@/services/api'

const transferService = api.injectEndpoints({
  endpoints: (builder) => ({
    getTransfers: builder.query({
      query: (queries)  => ({
        url: `/transfers?${new URLSearchParams(queries)}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ['Transfer'],
      keepUnusedDataFor: 0,
    }),
}),
  overrideExisting: true,
})

export const { useGetTransfersQuery } = transferService

export default transferService
