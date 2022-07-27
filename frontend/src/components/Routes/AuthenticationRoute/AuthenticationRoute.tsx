import { useState, useEffect } from 'react'
import { setAxiosAuthorizationHeaders } from '../../../api/AxiosClients'
import { useAuthenticateUser } from '../../../features/users/queries'
import { useUserContext } from '../../../context/UserContext'
import Spinner from '../../common/Spinner/Spinner'

const AuthenticationRoute = ({
  children,
}: {
  children: JSX.Element
}): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  const { user, setUser } = useUserContext()

  const { data, isFetched } = useAuthenticateUser()

  const setUserAndAxiosAuthorizationHeaders = async () => {
    if (data !== '' && data) {
      setUser(data.user)
      setAxiosAuthorizationHeaders(data.token)
    }
    setIsAuthenticated(true)
  }

  useEffect(() => {
    if (!isAuthenticated && !user && isFetched) {
      setUserAndAxiosAuthorizationHeaders()
    }
  }, [isAuthenticated, user, isFetched])

  return isAuthenticated ? children : <Spinner centered />
}

export default AuthenticationRoute
