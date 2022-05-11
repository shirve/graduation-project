import { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../app/store'
import HeaderContext from '../../context/header/HeaderContext'

const UserProfile = () => {
  const navigate = useNavigate()

  const { setHeader } = useContext(HeaderContext)

  const { user } = useSelector((state: RootState) => state.currentUser)

  useEffect(() => {
    setHeader('TWÓJ PROFIL')
    return () => {
      setHeader('')
    }
  }, [])

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [])

  return <div>Twój profil</div>
}

export default UserProfile
