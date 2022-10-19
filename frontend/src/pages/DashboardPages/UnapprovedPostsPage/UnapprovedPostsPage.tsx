import React from 'react'
import { useGetUnapprovedPosts } from '../../../features/posts/queries'
import PostsWrapper from '../../../components/PostsWrapper/PostsWrapper'
import styles from './UnapprovedPostsPage.module.scss'
import useHeader from '../../../hooks/useHeader'

const UnapprovedPostsPage = () => {
  useHeader('Niezatwierdzone Posty')

  const { data: posts = [], isLoading, refetch } = useGetUnapprovedPosts()

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
