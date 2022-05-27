import React, { useContext } from 'react'
import AlertContext from '../../../context/alert/AlertContext'
import {
  FaExclamationTriangle,
  FaInfoCircle,
  FaCheckCircle,
} from 'react-icons/fa'
import './Alert.scss'

const Alert = () => {
  const { alert } = useContext(AlertContext)

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
