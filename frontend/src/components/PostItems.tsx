import React from 'react'
import { Post } from '../models/Post'
import PostItem from './common/PostItem'
import Pagination from './common/Pagination'
import Spinner from './common/Spinner'

interface Props {
  posts: Post[]
  loading?: string
  onGenreChange?: (genre: string) => void
}

const PostItems = ({ posts, loading, onGenreChange }: Props) => {
  if (loading === 'pending') return <Spinner />

  return (
    <React.Fragment>
      {posts.map((post, index) => (
        <PostItem key={index} post={post} onGenreChange={onGenreChange} />
      ))}
      <Pagination />
    </React.Fragment>
  )
}

export default PostItems
