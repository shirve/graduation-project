import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

const UserProfile = () => {
  const navigate = useNavigate()

  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [])

  return <div>Twój profil</div>
}

export default UserProfile
