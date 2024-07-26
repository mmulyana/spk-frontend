import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core'
import Routers from './routes'
import './global.css'
import '@mantine/core/styles.css'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from 'react-query'

const theme = createTheme({})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Routers />
        <Toaster richColors />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
