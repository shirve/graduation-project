import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../../components/PageHeader'
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

  return (
    <>
      <Header title='Twój profil' />
    </>
  )
}

export default UserProfile
