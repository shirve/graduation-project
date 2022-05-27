import { AlertViewModel } from '../../models/Alert/AlertViewModel'

const initialState: AlertViewModel = {
  type: '',
  message: '',
}

type ACTIONTYPE =
  | { type: 'SET_ALERT'; payload: AlertViewModel }
  | { type: 'REMOVE_ALERT' }

const alertReducer = (state: AlertViewModel, action: ACTIONTYPE) => {
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
