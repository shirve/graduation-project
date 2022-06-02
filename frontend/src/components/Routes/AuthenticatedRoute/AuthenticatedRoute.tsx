import { useState, useEffect } from 'react'
import axios from 'axios'
import { RootState, useAppDispatch } from '../../../app/store'
import { useSelector } from 'react-redux'
import { setUser } from '../../../features/users/userSlice'
import { jwtDecode } from '../../../utils/jwtDecode'
import { setAxiosAuthorizationHeaders } from '../../../utils/setAxiosAuthorizationHeaders'
import Spinner from '../../common/Spinner/Spinner'

const AuthenticatedRoute = ({
  children,
}: {
  children: JSX.Element
}): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { user } = useSelector((state: RootState) => state.user)

  const setUserAndAxiosAuthorizationHeaders = async () => {
    const token = await axios.get('/api/users/whoami').then((res) => {
      return res.data
    })
    if (token !== '') {
      const user = jwtDecode(token)
      dispatch(setUser(user))
      setAxiosAuthorizationHeaders(token)
    }
    setIsAuthenticated(true)
  }

  useEffect(() => {
    if (!isAuthenticated && !user) {
      setUserAndAxiosAuthorizationHeaders()
    }
  }, [isAuthenticated, user])

  return isAuthenticated ? children : <Spinner centered />
}

export default AuthenticatedRoute
