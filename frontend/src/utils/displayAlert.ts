import { toast } from 'react-toastify'
import { AlertViewModel } from '../models/Alert/AlertViewModel'

const displayAlert = (alert: AlertViewModel) => {
  switch (alert.type) {
    case 'info':
      toast.info(alert.message, { autoClose: alert.time })
      break
    case 'success':
      toast.success(alert.message, { autoClose: alert.time })
      break
    case 'warning':
      toast.warning(alert.message, { autoClose: alert.time })
      break
    case 'error':
      toast.error(alert.message, { autoClose: alert.time })
      break
    default:
      break
  }
}

export default displayAlert
