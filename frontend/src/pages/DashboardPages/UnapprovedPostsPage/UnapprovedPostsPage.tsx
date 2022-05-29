import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUnapprovedPosts } from '../../../features/posts/postSlice'
import { RootState } from '../../../app/store'
import HeaderContext from '../../../context/header/HeaderContext'
import PostsWrapper from '../../../components/PostsWrapper/PostsWrapper'
import styles from './UnapprovedPostsPage.module.scss'

const UnapprovedPostsPage = () => {
  const dispatch = useDispatch()

  const { setHeader } = useContext(HeaderContext)

  const { posts, loading } = useSelector((state: RootState) => state.posts)

  useEffect(() => {
    setHeader('NIEZATWIERDZONE POSTY')
    return () => {
      setHeader('')
    }
  }, [])

  useEffect(() => {
    dispatch(getUnapprovedPosts())
  }, [])

  return (
    <React.Fragment>
      {posts.length === 0 && (
        <div className={styles.info}>Brak nowych niezatwierdzonych postów</div>
      )}
      <PostsWrapper
        posts={posts}
        loading={loading}
        displayedButtons={['delete', 'reject', 'approve']}
      />
    </React.Fragment>
  )
}

export default UnapprovedPostsPage
