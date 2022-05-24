import React from 'react'
import { Post, PostItemButtonTypes } from '../models/Post'
import PostItem from './common/PostItem'
import Pagination from './common/Pagination'
import Spinner from './common/Spinner'

interface Props {
  posts: Post[]
  loading?: string
  onGenreChange?: (genre: string) => void
  displayedButtons?: PostItemButtonTypes[]
}

const PostItems = ({
  posts,
  loading,
  onGenreChange,
  displayedButtons,
}: Props) => {
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
      <Pagination />
    </React.Fragment>
  )
}

export default PostItems
