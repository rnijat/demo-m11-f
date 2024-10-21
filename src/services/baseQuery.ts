import { logout, refreshToken } from '@/redux/authSlice'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

export const BASE_URL = 'http://94.20.59.173:8000'
// create a new mutex
const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareHeaders: (headers, { getState }: any) => {
    const authSlice = getState().auth
    headers.set('accept', 'application/json')
    if (authSlice.token) {
      headers.set('authorization', `Bearer ${authSlice.token}`)
    }
    return headers
  },
  credentials: 'include',
  mode: 'cors',
})
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const refreshResult: any = await baseQuery(
          {
            url: '/auth/refresh',
            method: 'POST'
          },
          api,
          extraOptions
        )
        if (refreshResult.data) {
          api.dispatch(refreshToken(refreshResult.data?.data?.accessToken))
          // retry the initial query
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(logout())
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}
