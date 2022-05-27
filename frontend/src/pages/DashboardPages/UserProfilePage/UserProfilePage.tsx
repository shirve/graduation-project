import { useContext, useEffect } from 'react'
import HeaderContext from '../../../context/header/HeaderContext'
import './UserProfilePage.scss'

const UserProfilePage = () => {
  const { setHeader } = useContext(HeaderContext)

  useEffect(() => {
    setHeader('TWÓJ PROFIL')
    return () => {
      setHeader('')
    }
  }, [])

  return <div>Twój profil</div>
}

export default UserProfilePage
