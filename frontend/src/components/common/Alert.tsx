import React, { useEffect, useContext } from 'react'
import AlertContext from '../../context/alert/AlertContext'
import {
  FaExclamationTriangle,
  FaInfoCircle,
  FaCheckCircle,
} from 'react-icons/fa'

const Alert = () => {
  const { alert, removeAlert } = useContext(AlertContext)

  useEffect(() => {
    return () => removeAlert()
  }, [])

  return (
    <React.Fragment>
      {alert.type === 'error' && (
        <div className='alert alert-danger'>
          <FaExclamationTriangle className='alert-icon' />
          {alert.message}
        </div>
      )}
      {alert.type === 'success' && (
        <div className='alert alert-success'>
          <FaCheckCircle className='alert-icon' />
          {alert.message}
        </div>
      )}
      {alert.type === 'info' && (
        <div className='alert alert-info'>
          <FaInfoCircle className='alert-icon' />
          {alert.message}
        </div>
      )}
    </React.Fragment>
  )
}

export default Alert
