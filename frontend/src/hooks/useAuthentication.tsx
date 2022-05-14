import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../app/store'
import { authenticateUser } from '../features/user/userSlice'

const useAuthentication = () => {
  const dispatch = useAppDispatch()
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const authenticateUserAsync = async () => {
      const res = await axios.get('/api/users/whoami')
      await dispatch(authenticateUser(res.data))
      setAuthenticated(true)
    }
    authenticateUserAsync()
  }, [])

  return { authenticated }
}

export default useAuthentication
