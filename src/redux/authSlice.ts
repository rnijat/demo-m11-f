// sort-imports-ignore
import authService from '@/services/authService'
import userService from '@/services/userService'
import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuth: false,
    token: null,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.isAuth = false
      state.token = null
      state.loading = false
    },

    refreshToken: (state, action) => {
      state.token = action.payload
      state.isAuth = true
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authService.endpoints.login.matchPending, (state) => {
      state.loading = true
    })

    builder.addMatcher(
      authService.endpoints.login.matchFulfilled,
      (state, action) => {
        state.token = action.payload.accessToken
        state.isAuth = true
        state.loading = false
      }
    )

    builder.addMatcher(userService.endpoints.me.matchPending, (state) => {
      state.loading = true
    })

    builder.addMatcher(userService.endpoints.me.matchRejected, (state) => {
      state.loading = false
    })

    builder.addMatcher(
      userService.endpoints.me.matchFulfilled,
      (state, action) => {
        state.user = action.payload
        state.loading = false
      }
    )

    builder.addMatcher(authService.endpoints.logout.matchPending, (state) => {
      state.loading = true
    })

    builder.addMatcher(authService.endpoints.logout.matchRejected, (state) => {
      state.user = null
      state.isAuth = false
      state.token = null
      state.loading = false
    })

    builder.addMatcher(
      authService.endpoints.logout.matchFulfilled,
      (state) => {
        state.user = null
        state.isAuth = false
        state.token = null
        state.loading = false
      }
    )
  },
})

export const { logout, refreshToken } = authSlice.actions

export default authSlice.reducer
