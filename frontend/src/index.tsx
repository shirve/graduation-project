import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Modal from 'react-modal'
import { ReactQueryClientProvider } from './api/ReactQueryClientProvider'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './index.scss'

Modal.setAppElement(document.getElementById('root') as HTMLElement)

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryClientProvider>
      <App />
    </ReactQueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
