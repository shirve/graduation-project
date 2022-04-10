import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../../features/posts/postSlice'
import PostItem from '../../components/common/PostItem'
import Header from '../../components/PageHeader'
import { RootState } from '../../app/store'

const DashboardUnapprovedPosts = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state: RootState) => state.auth)
  const { posts, isError, message } = useSelector(
    (state: RootState) => state.posts
  )

  const filteredPostsLength = posts.filter(
    (post) => post.approved === false
  ).length

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user || !user.ROLE_ADMIN) {
      navigate('/')
    }
    dispatch(getPosts())
  }, [])

  return (
    <>
      <Header title='Niezatwierdzone posty'>
        {filteredPostsLength === 0 &&
          'Brak postów oczekujących na zatwierdzenie'}
      </Header>
      {filteredPostsLength > 0 && (
        <>
          {posts
            .slice(0)
            .reverse()
            .filter((post) => post.approved === false)
            .map((post, index) => (
              <PostItem
                key={index}
                post={post}
                user={user ? user : undefined}
                userCanManage={true}
              />
            ))}
        </>
      )}
    </>
  )
}

export default DashboardUnapprovedPosts
