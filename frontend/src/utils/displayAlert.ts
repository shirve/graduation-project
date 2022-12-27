import { toast } from 'react-toastify'
import { AlertViewModel } from '../models/Alert/AlertViewModel'

const displayAlert = (alert: AlertViewModel) => {
  toast(alert.message, {
    type: alert.type,
    autoClose: alert.time,
  })
}

export default displayAlert
