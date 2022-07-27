import { Navigate, Outlet } from 'react-router-dom'
import { useUserContext } from '../../../context/UserContext'

interface Props {
  allowedRoles?: string[]
}

const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { user } = useUserContext()

  return (!allowedRoles && user) ||
    user?.roles.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to='/' />
  )
}

export default ProtectedRoute
