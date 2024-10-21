/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/services/api'

const paymentService = api.injectEndpoints({
  endpoints: (builder) => ({
    makePayment: builder.mutation({
      query: (body) => ({
        url: '/payments/charge',
        method: 'POST',
        body,
      }),
      transformResponse: (response: any) => response.data,
    })
}),
  overrideExisting: true,
})

export const { useMakePaymentMutation } = paymentService

export default paymentService
