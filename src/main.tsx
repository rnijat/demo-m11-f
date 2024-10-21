import SplashScreen from '@/components/custom/splash-screen'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import '@/index.css'
import { persistor, store } from '@/redux/store'
import router from '@/router'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <Suspense fallback={<SplashScreen />}>
          <RouterProvider router={router} />
          </Suspense>
          <Toaster />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
