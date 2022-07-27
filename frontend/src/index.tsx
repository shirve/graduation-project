import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ReactQueryClientProvider } from './context/ReactQueryClientProvider'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './index.scss'

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryClientProvider>
      <App />
    </ReactQueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
