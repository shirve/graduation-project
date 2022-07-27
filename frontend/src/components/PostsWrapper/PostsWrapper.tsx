import React from 'react'
import { PostViewModel } from '../../models/Posts/PostViewModel'
import { PostButtonTypes } from '../../models/Posts/PostButtonTypes'
import { PostContributorStatusTypes } from '../../models/Posts/PostContributorStatusTypes'
import PostItem from '../common/PostItem/PostItem'
import Spinner from '../common/Spinner/Spinner'

interface Props {
  posts: PostViewModel[]
  isLoading?: boolean
  onGenreChange?: (genre: string) => void
  displayedButtons?: PostButtonTypes[]
  postContributors?: PostContributorStatusTypes[]
  onRefetch?: () => void
}

const PostsWrapper = ({
  posts,
  isLoading,
  onGenreChange,
  displayedButtons,
  postContributors,
  onRefetch,
}: Props) => {
  if (isLoading) return <Spinner />

  return (
    <React.Fragment>
      {posts.map((post) => (
        <PostItem
          key={post._id.toString()}
          post={post}
          onGenreChange={onGenreChange}
          displayedButtons={displayedButtons}
          postContributors={postContributors}
          onRefetch={onRefetch}
        />
      ))}
    </React.Fragment>
  )
}

export default PostsWrapper
