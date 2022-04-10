import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../../features/posts/postSlice'
import PostItem from '../../components/common/PostItem'
import { RootState } from '../../app/store'
import HeaderContext from '../../context/header/HeaderContext'

const DashboardUserPosts = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { setHeaderText } = useContext(HeaderContext)

  const { user } = useSelector((state: RootState) => state.auth)
  const { posts, isError, message } = useSelector(
    (state: RootState) => state.posts
  )

  const filteredPostsLength = posts.filter(
    (post) => post.user?._id === user?._id
  ).length

  useEffect(() => {
    setHeaderText('TWOJE PROPOZYCJE GIER')
    return () => {
      setHeaderText('')
    }
  }, [])

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login')
    }
    dispatch(getPosts())
  }, [])

  return (
    <>
      {filteredPostsLength > 0 && (
        <>
          {posts
            .slice(0)
            .reverse()
            .filter((post) => post.user?._id === user?._id)
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

export default DashboardUserPosts
