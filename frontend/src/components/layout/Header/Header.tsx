import React, { useContext } from 'react'
import HeaderContext from '../../../context/header/HeaderContext'
import './Header.scss'

const Header = () => {
  const { header } = useContext(HeaderContext)

  return (
    <React.Fragment>
      {header !== '' && <header className='header'>{header}</header>}
    </React.Fragment>
  )
}

export default Header
