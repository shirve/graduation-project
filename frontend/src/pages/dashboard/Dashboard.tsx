import { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UnapprovedPosts from './UnapprovedPosts'
import UserPosts from './UserPosts'
import UserProfile from './UserProfile'
import { RootState } from '../../app/store'

const Dashboard = () => {
  const navigate = useNavigate()

  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/dashboard/account' />} />
      <Route path='profile' element={<UserProfile />} />
      <Route path='posts' element={<UserPosts />} />
      <Route path='unapproved-posts' element={<UnapprovedPosts />} />
    </Routes>
  )
}

export default Dashboard
