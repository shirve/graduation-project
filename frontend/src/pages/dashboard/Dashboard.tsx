import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

const Dashboard = () => {
  const navigate = useNavigate()

  const { user } = useSelector((state: RootState) => state.currentUser)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [])

  return <Outlet />
}

export default Dashboard
