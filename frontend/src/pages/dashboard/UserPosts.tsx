import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../../features/posts/postSlice'
import PostItem from '../../components/common/PostItem'
import { RootState } from '../../app/store'
import HeaderContext from '../../context/header/HeaderContext'
import AlertContext from '../../context/alert/AlertContext'
import Alert from '../../components/common/Alert'
import Spinner from '../../components/common/Spinner'
import { Post } from '../../models/Post'

type FilterType = 'approved' | 'unapproved' | 'rejected'

const DashboardUserPosts = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { setHeader } = useContext(HeaderContext)
  const { setAlert, removeAlert } = useContext(AlertContext)

  const { user } = useSelector((state: RootState) => state.auth)
  const { posts, loading, alert } = useSelector(
    (state: RootState) => state.posts
  )

  const [filterType, setFilterType] = useState<FilterType>('approved')
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])

  const filteredApprovedPosts = posts.filter(
    (post) => post.user._id === user?._id && post.status.approved
  )

  const filteredUnapprovedPosts = posts.filter(
    (post) =>
      post.user._id === user?._id &&
      !post.status.approved &&
      !post.status.rejected
  )

  const filteredRejectedPosts = posts.filter(
    (post) => post.user._id === user?._id && post.status.rejected
  )

  const handleFilterChange = (type: FilterType) => {
    if (type === 'approved') {
      setFilteredPosts(filteredApprovedPosts)
      setFilterType('approved')
    }
    if (type === 'unapproved') {
      setFilteredPosts(filteredUnapprovedPosts)
      setFilterType('unapproved')
    }
    if (type === 'rejected') {
      setFilteredPosts(filteredRejectedPosts)
      setFilterType('rejected')
    }
  }

  useEffect(() => {
    setFilterType('approved')
    setFilteredPosts(filteredApprovedPosts)
  }, [])

  useEffect(() => {
    handleFilterChange(filterType)
  }, [posts])

  useEffect(() => {
    setHeader('TWOJE PROPOZYCJE GIER')
    return () => {
      setHeader('')
    }
  }, [])

  useEffect(() => {
    if (alert) {
      setAlert(alert.type, alert.message, 5)
    } else {
      removeAlert()
    }
    if (!user) {
      navigate('/login')
    }
    dispatch(getPosts())
  }, [user, alert])

  if (loading) return <Spinner />

  return (
    <React.Fragment>
      <ul className='dashboard-posts-navigation'>
        <li
          className={filterType === 'approved' ? 'active' : ''}
          onClick={() => handleFilterChange('approved')}
        >
          Zatwierdzone&nbsp;
          <span className='badge'>{filteredApprovedPosts.length}</span>
        </li>
        <li
          className={filterType === 'unapproved' ? 'active' : ''}
          onClick={() => handleFilterChange('unapproved')}
        >
          Niezatwierdzone&nbsp;
          <span className='badge'>{filteredUnapprovedPosts.length}</span>
        </li>
        <li
          className={filterType === 'rejected' ? 'active' : ''}
          onClick={() => handleFilterChange('rejected')}
        >
          Odrzucone&nbsp;
          <span className='badge'>{filteredRejectedPosts.length}</span>
        </li>
      </ul>
      {filteredPosts.length > 0 ? (
        filteredPosts
          .slice(0)
          .reverse()
          .map((post, index) => (
            <React.Fragment key={index}>
              <PostItem post={post} />
              <Alert />
            </React.Fragment>
          ))
      ) : (
        <div className='dashboard-posts-info'>
          {filterType === 'approved' && (
            <p>Nie masz jeszcze żadnych zatwierdzonych propozycji gier</p>
          )}
          {filterType === 'unapproved' && (
            <p>Nie masz żadnych niezatwierdzonych propozycji gier</p>
          )}
          {filterType === 'rejected' && (
            <p>Nie masz żadnych odrzuconych propozycji gier</p>
          )}
        </div>
      )}
    </React.Fragment>
  )
}

export default DashboardUserPosts
