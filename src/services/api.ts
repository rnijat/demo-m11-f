import { baseQueryWithReauth } from '@/services/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

export const BASE_URL = 'http://localhost:8000'

const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  tagTypes: ['User', 'Transfer', 'Product', 'Order'],
  
})

export default api
