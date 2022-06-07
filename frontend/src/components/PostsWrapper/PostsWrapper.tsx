import React from 'react'
import { PostViewModel } from '../../models/Posts/PostViewModel'
import { PostButtonTypes } from '../../models/Posts/PostButtonTypes'
import PostItem from '../common/PostItem/PostItem'
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
    </React.Fragment>
  )
}

export default PostsWrapper
