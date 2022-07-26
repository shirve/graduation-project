import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { ReactQueryClientProvider } from './context/ReactQueryClientProvider'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './index.scss'

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryClientProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ReactQueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
