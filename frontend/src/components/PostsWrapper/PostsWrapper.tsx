import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useAppDispatch } from '../../app/store'
import { setPage } from '../../features/posts/postSlice'
import { PostViewModel } from '../../models/Posts/PostViewModel'
import { PostButtonTypes } from '../../models/Posts/PostButtonTypes'
import PostItem from '../common/PostItem/PostItem'
import Pagination from '../common/Pagination/Pagination'
import Spinner from '../common/Spinner/Spinner'

interface Props {
  posts: PostViewModel[]
  loading?: string
  onGenreChange?: (genre: string) => void
  displayedButtons?: PostButtonTypes[]
}

const PostsWrapper = ({
  posts,
  loading,
  onGenreChange,
  displayedButtons,
}: Props) => {
  const dispatch = useAppDispatch()
  const { pagination } = useSelector((state: RootState) => state.posts)
  const { page, totalPages } = pagination

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage))
  }

  if (loading === 'pending') return <Spinner />

  return (
    <React.Fragment>
      {posts.map((post, index) => (
        <PostItem
          key={index}
          post={post}
          onGenreChange={onGenreChange}
          displayedButtons={displayedButtons}
        />
      ))}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </React.Fragment>
  )
}

export default PostsWrapper
