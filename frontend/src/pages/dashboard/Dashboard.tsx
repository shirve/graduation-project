import { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../../features/posts/postSlice'
import UnapprovedPosts from './UnapprovedPosts'
import UserPosts from './UserPosts'
import UserProfile from './UserProfile'
import { RootState } from '../../app/store'

const Dashboard = () => {
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
    dispatch(getPosts())
  }, [])

  return (
    <div className='container col-xl-8 col-lg-10'>
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard/account' />} />
        <Route path='profile' element={<UserProfile />} />
        <Route path='posts' element={<UserPosts />} />
        <Route path='unapproved-posts' element={<UnapprovedPosts />} />
      </Routes>
    </div>
  )
}

export default Dashboard
