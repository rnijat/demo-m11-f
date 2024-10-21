

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist'
import { encryptTransform } from 'redux-persist-transform-encrypt'
import storage from 'redux-persist/lib/storage'
import authSlice from './authSlice'
import api from '@/services/api'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const combinedReducers: any = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authSlice,
})

const persistConfig = {
  key: 'm11m11',
  storage,
  whitelist: ['auth'],
  transforms: [
    encryptTransform({
      secretKey:
        '8x/A%D*G-KaPdSgVkYp3s6v9y$B&E(H+MbQeThWmZq4t7w!z%C*F-J@NcRfUjXn2',
    }),
  ],
}

const persistedReducer = persistReducer(persistConfig, combinedReducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .concat(api.middleware) as any
})

export const persistor = persistStore(store)
