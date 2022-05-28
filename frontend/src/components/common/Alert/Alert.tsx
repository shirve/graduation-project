import React, { useContext } from 'react'
import AlertContext from '../../../context/alert/AlertContext'
import {
  FaExclamationTriangle,
  FaInfoCircle,
  FaCheckCircle,
} from 'react-icons/fa'
import styles from './Alert.module.scss'

const Alert = () => {
  const { alert } = useContext(AlertContext)

  return (
    <React.Fragment>
      {alert.type === 'error' && (
        <div className={`${styles.alert} ${styles.alertError}`}>
          <FaExclamationTriangle className={styles.alertIcon} />
          {alert.message}
        </div>
      )}
      {alert.type === 'success' && (
        <div className={`${styles.alert} ${styles.alertSuccess}`}>
          <FaCheckCircle className={styles.alertIcon} />
          {alert.message}
        </div>
      )}
      {alert.type === 'info' && (
        <div className={`${styles.alert} ${styles.alertInfo}`}>
          <FaInfoCircle className={styles.alertIcon} />
          {alert.message}
        </div>
      )}
    </React.Fragment>
  )
}

export default Alert
