import React from 'react'
import { PostViewModel } from '../../models/Posts/PostViewModel'
import { PostButtonTypes } from '../../models/Posts/PostButtonTypes'
import { PostContributorStatusTypes } from '../../models/Posts/PostContributorStatusTypes'
import PostItem from '../common/PostItem/PostItem'
import Spinner from '../common/Spinner/Spinner'

interface Props {
  posts: PostViewModel[]
  loading?: string
  onGenreChange?: (genre: string) => void
  displayedButtons?: PostButtonTypes[]
  postContributors?: PostContributorStatusTypes[]
}

const PostsWrapper = ({
  posts,
  loading,
  onGenreChange,
  displayedButtons,
  postContributors,
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
          postContributors={postContributors}
        />
      ))}
    </React.Fragment>
  )
}

export default PostsWrapper
