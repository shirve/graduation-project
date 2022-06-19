import React, { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserPosts } from '../../../features/posts/postSlice'
import { RootState } from '../../../app/store'
import HeaderContext from '../../../context/header/HeaderContext'
import { PostViewModel } from '../../../models/Posts/PostViewModel'
import PostsWrapper from '../../../components/PostsWrapper/PostsWrapper'
import styles from './UserPostsPage.module.scss'

type FilterType = 'approved' | 'unapproved' | 'rejected'

const UserPostsPage = () => {
  const dispatch = useDispatch()

  const { setHeader } = useContext(HeaderContext)

  const { posts, loading } = useSelector((state: RootState) => state.posts)

  const [filterType, setFilterType] = useState<FilterType>('approved')
  const [filteredPosts, setFilteredPosts] = useState<PostViewModel[]>([])

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
      <ul className={styles.navigation}>
        <li
          className={filterType === 'approved' ? styles.active : undefined}
          onClick={() => handleFilterChange('approved')}
        >
          Zatwierdzone
          <span className={styles.badge}>{filteredApprovedPosts.length}</span>
        </li>
        <li
          className={filterType === 'unapproved' ? styles.active : undefined}
          onClick={() => handleFilterChange('unapproved')}
        >
          Niezatwierdzone
          <span className={styles.badge}>{filteredUnapprovedPosts.length}</span>
        </li>
        <li
          className={filterType === 'rejected' ? styles.active : undefined}
          onClick={() => handleFilterChange('rejected')}
        >
          Odrzucone
          <span className={styles.badge}>{filteredRejectedPosts.length}</span>
        </li>
      </ul>
      {filteredPosts.length === 0 && (
        <div className={styles.info}>
          {filterType === 'approved' && (
            <div>Nie masz jeszcze żadnych zatwierdzonych propozycji gier</div>
          )}
          {filterType === 'unapproved' && (
            <div>Nie masz żadnych niezatwierdzonych propozycji gier</div>
          )}
          {filterType === 'rejected' && (
            <div>Nie masz żadnych odrzuconych propozycji gier</div>
          )}
        </div>
      )}
      <PostsWrapper
        posts={filteredPosts}
        loading={loading}
        displayedButtons={['edit', 'delete']}
        postContributors
      />
    </React.Fragment>
  )
}

export default UserPostsPage
