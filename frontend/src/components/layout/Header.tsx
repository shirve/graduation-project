import React, { useContext } from 'react'
import HeaderContext from '../../context/header/HeaderContext'

const Header = () => {
  const { headerText } = useContext(HeaderContext)

  return (
    <React.Fragment>
      {headerText !== '' && (
        <div className='page-header-title page-header-text-primary'>
          {headerText}
        </div>
      )}
    </React.Fragment>
  )
}

export default Header
