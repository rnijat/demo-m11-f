import api from '@/services/api'

const productService = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (queries)  => ({
        url: `/products?${new URLSearchParams(queries)}`,
        method: 'GET',
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: any) => response.data,
      providesTags: ['Product'],
      keepUnusedDataFor: 0,
    }),
  }),
  overrideExisting: true,
})

export const { useGetProductsQuery } = productService

export default productService
