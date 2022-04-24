import { Alert } from '../../models/Alert'

const initialState: Alert = {
  type: '',
  message: '',
}

type ACTIONTYPE =
  | { type: 'SET_ALERT'; payload: Alert }
  | { type: 'REMOVE_ALERT' }

const alertReducer = (state: Alert, action: ACTIONTYPE) => {
  switch (action.type) {
    case 'SET_ALERT':
      return action.payload
    case 'REMOVE_ALERT':
      return initialState
    default:
      return state
  }
}

export default alertReducer
