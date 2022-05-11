import { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UnapprovedPosts from './UnapprovedPosts'
import UserPosts from './UserPosts'
import UserProfile from './UserProfile'
import { RootState } from '../../app/store'
import UserProjects from './UserProjects'

const Dashboard = () => {
  const navigate = useNavigate()

  const { user } = useSelector((state: RootState) => state.currentUser)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/dashboard/account' />} />
      <Route path='your-profile' element={<UserProfile />} />
      <Route path='your-posts' element={<UserPosts />} />
      <Route path='your-projects' element={<UserProjects />} />
      <Route path='unapproved-posts' element={<UnapprovedPosts />} />
    </Routes>
  )
}

export default Dashboard
