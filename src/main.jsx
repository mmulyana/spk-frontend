import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core'
import Routers from './routes'
import './global.css'
import '@mantine/core/styles.css'

const theme = createTheme({})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Routers />
    </MantineProvider>
  </React.StrictMode>
)
