import React, { useContext } from 'react'
import AlertContext from '../../context/alert/AlertContext'

const Alert = () => {
  const { alert } = useContext(AlertContext)

  return (
    <React.Fragment>
      {/* TODO: alert styles */}
      {alert.type === 'error' && (
        <div className='alert-error'>{alert.message}</div>
      )}
      {alert.type === 'success' && (
        <div className='alert-success'>{alert.message}</div>
      )}
      {alert.type === 'info' && (
        <div className='alert-info'>{alert.message}</div>
      )}
    </React.Fragment>
  )
}

export default Alert
