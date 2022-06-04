import { useState, useEffect } from 'react'
import {
  setAxiosAuthorizationHeaders,
  usersClient,
} from '../../../api/AxiosClients'
import { RootState, useAppDispatch } from '../../../app/store'
import { useSelector } from 'react-redux'
import { setUser } from '../../../features/users/userSlice'
import { jwtDecode } from '../../../utils/jwtDecode'
import Spinner from '../../common/Spinner/Spinner'

const AuthenticationRoute = ({
  children,
}: {
  children: JSX.Element
}): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { user } = useSelector((state: RootState) => state.user)

  const setUserAndAxiosAuthorizationHeaders = async () => {
    const { data } = await usersClient.get('/whoami')
    if (data !== '') {
      const user = jwtDecode(data)
      dispatch(setUser(user))
      setAxiosAuthorizationHeaders(data)
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

export default AuthenticationRoute
