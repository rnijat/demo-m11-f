/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/services/api'

const orderService = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (queries)  => ({
        url: `/orders?${new URLSearchParams(queries)}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ['Order'],
    }),
    getOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ['Order'],
      keepUnusedDataFor: 0,
    }),
    createOrder: builder.mutation({
      query: (body) => ({
        url: '/orders/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),
    refundOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}/refund`,
        method: 'POST',
      }),
      invalidatesTags: ['Order'],
    })
  }),
  overrideExisting: true,
})

export const { useGetOrdersQuery, useGetOrderQuery, useCreateOrderMutation, useRefundOrderMutation } = orderService

export default orderService
