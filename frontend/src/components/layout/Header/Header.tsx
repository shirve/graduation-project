import React, { useContext } from 'react'
import HeaderContext from '../../../context/header/HeaderContext'
import styles from './Header.module.scss'

const Header = () => {
  const { header } = useContext(HeaderContext)

  return (
    <React.Fragment>
      {header !== '' && <header className={styles.header}>{header}</header>}
    </React.Fragment>
  )
}

export default Header
