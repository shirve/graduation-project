import React, { useEffect } from 'react'
import { useGetUnapprovedPosts } from '../../../features/posts/queries'
import { useHeaderContext } from '../../../context/HeaderContext'
import PostsWrapper from '../../../components/PostsWrapper/PostsWrapper'
import styles from './UnapprovedPostsPage.module.scss'

const UnapprovedPostsPage = () => {
  const { setHeader } = useHeaderContext()

  const { data: posts = [], isLoading, refetch } = useGetUnapprovedPosts()

  useEffect(() => {
    setHeader('NIEZATWIERDZONE POSTY')
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
        onRefetch={refetch}
      />
    </React.Fragment>
  )
}

export default UnapprovedPostsPage
