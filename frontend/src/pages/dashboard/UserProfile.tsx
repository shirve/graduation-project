import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../app/store'

const UserProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state: RootState) => state.auth)
  const { isError, message } = useSelector((state: RootState) => state.posts)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login')
    }
  }, [])

  return <div>Twój profil</div>
}

export default UserProfile
