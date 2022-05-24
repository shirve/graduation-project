import React, { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserPosts } from '../../features/posts/postSlice'
import { RootState } from '../../app/store'
import HeaderContext from '../../context/header/HeaderContext'
import { Post } from '../../models/Post'
import PostItems from '../../components/PostItems'

type FilterType = 'approved' | 'unapproved' | 'rejected'

const DashboardUserPosts = () => {
  const dispatch = useDispatch()

  const { setHeader } = useContext(HeaderContext)

  const { posts, loading } = useSelector(
    (state: RootState) => state.fetchedPosts
  )

  const [filterType, setFilterType] = useState<FilterType>('approved')
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])

  const filteredApprovedPosts = posts.filter((post) => post.status.approved)

  const filteredUnapprovedPosts = posts.filter(
    (post) => !post.status.approved && !post.status.rejected
  )

  const filteredRejectedPosts = posts.filter((post) => post.status.rejected)

  const handleFilterChange = (type: FilterType) => {
    switch (type) {
      case 'approved':
        setFilteredPosts(filteredApprovedPosts)
        setFilterType('approved')
        break
      case 'unapproved':
        setFilteredPosts(filteredUnapprovedPosts)
        setFilterType('unapproved')
        break
      case 'rejected':
        setFilteredPosts(filteredRejectedPosts)
        setFilterType('rejected')
        break
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
    dispatch(getUserPosts())
  }, [])

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
        <PostItems
          posts={filteredPosts}
          loading={loading}
          displayedButtons={['edit', 'delete']}
        />
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
