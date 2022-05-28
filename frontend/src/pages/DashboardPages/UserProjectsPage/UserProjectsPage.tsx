import React, { useContext, useEffect } from 'react'
import HeaderContext from '../../../context/header/HeaderContext'
import styles from './UserProjectsPage.module.scss'

const UserProjectsPage = () => {
  const { setHeader } = useContext(HeaderContext)

  useEffect(() => {
    setHeader('TWOJE PROJEKTY')
    return () => {
      setHeader('')
    }
  }, [])

  return <div>Twoje projekty</div>
}

export default UserProjectsPage
