import { createContext, useReducer } from 'react'
import alertReducer from './AlertReducer'
import { Alert } from '../../models/Alert'

interface IAlertContext {
  alert: Alert
  setAlert: (type: string, message: string, duration?: number) => void
  removeAlert: () => void
}

const AlertContext = createContext({} as IAlertContext)

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState: Alert = {
    type: '',
    message: '',
  }

  const [state, dispatch] = useReducer(alertReducer, initialState)

  const setAlert = (type: string, message: string, duration?: number) => {
    dispatch({
      type: 'SET_ALERT',
      payload: { type, message },
    })
    if (duration !== undefined && duration > 0) {
      setTimeout(() => {
        dispatch({
          type: 'REMOVE_ALERT',
        })
      }, duration * 1000)
    }
  }

  const removeAlert = () => {
    dispatch({
      type: 'REMOVE_ALERT',
    })
  }

  return (
    <AlertContext.Provider value={{ alert: state, setAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  )
}

export default AlertContext
