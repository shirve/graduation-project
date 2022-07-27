import React, { useContext, useEffect } from 'react'
import { useGetUnapprovedPosts } from '../../../features/posts/queries'
import HeaderContext from '../../../context/header/HeaderContext'
import PostsWrapper from '../../../components/PostsWrapper/PostsWrapper'
import styles from './UnapprovedPostsPage.module.scss'

const UnapprovedPostsPage = () => {
  const { setHeader } = useContext(HeaderContext)

  const { data: posts = [], isLoading, refetch } = useGetUnapprovedPosts()

  useEffect(() => {
    setHeader('NIEZATWIERDZONE POSTY')
    return () => {
      setHeader('')
    }
  }, [])

  return (
    <React.Fragment>
      {posts.length === 0 && (
        <div className={styles.info}>Brak nowych niezatwierdzonych postów</div>
      )}
      <PostsWrapper
        posts={posts}
        isLoading={isLoading}
        displayedButtons={['delete', 'reject', 'approve']}
        postContributors={['approved']}
        onRefetch={refetch}
      />
    </React.Fragment>
  )
}

export default UnapprovedPostsPage
