import React, { useContext } from 'react'
import HeaderContext from '../../context/header/HeaderContext'

const Header = () => {
  const { header } = useContext(HeaderContext)

  return (
    <React.Fragment>
      {header !== '' && <header className='page-header'>{header}</header>}
    </React.Fragment>
  )
}

export default Header
