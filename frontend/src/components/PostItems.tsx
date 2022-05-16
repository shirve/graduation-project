import React from 'react'
import { Post } from '../models/Post'
import PostItem from './common/PostItem'
import Pagination from './common/Pagination'
import Spinner from './common/Spinner'

interface Props {
  posts: Post[]
  loading?: string
  onGenreChange?: (genre: string) => void
  pagination?: {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
  }
}

const PostItems = ({ posts, loading, onGenreChange, pagination }: Props) => {
  if (loading === 'pending') return <Spinner />

  return (
    <React.Fragment>
      {posts.map((post, index) => (
        <PostItem key={index} post={post} onGenreChange={onGenreChange} />
      ))}
      {pagination && (
        <Pagination
          totalPages={pagination.totalPages}
          currentPage={pagination.currentPage}
          onPageChange={pagination.onPageChange}
        />
      )}
    </React.Fragment>
  )
}

export default PostItems
