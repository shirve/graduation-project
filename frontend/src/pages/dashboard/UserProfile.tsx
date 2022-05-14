import { useContext, useEffect } from 'react'
import HeaderContext from '../../context/header/HeaderContext'

const UserProfile = () => {
  const { setHeader } = useContext(HeaderContext)

  useEffect(() => {
    setHeader('TWÓJ PROFIL')
    return () => {
      setHeader('')
    }
  }, [])

  return <div>Twój profil</div>
}

export default UserProfile
