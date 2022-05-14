import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../app/store'

interface Props {
  allowedRoles?: string[]
}

const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { user } = useSelector((state: RootState) => state.currentUser)

  return (!allowedRoles && user) ||
    user?.roles.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to='/' />
  )
}

export default ProtectedRoute
