import React from 'react'
import { useHeaderContext } from '../../../context/header/HeaderContext'
import styles from './Header.module.scss'

const Header = () => {
  const { header } = useHeaderContext()

  return (
    <React.Fragment>
      {header && <header className={styles.header}>{header}</header>}
    </React.Fragment>
  )
}

export default Header
