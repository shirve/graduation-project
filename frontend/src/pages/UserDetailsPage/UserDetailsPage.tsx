import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../app/store'
import { getApprovedPosts } from '../../features/posts/postSlice'
import { getApprovedProjects } from '../../features/projects/projectSlice'
import { usersClient } from '../../api/AxiosClients'
import PostsWrapper from '../../components/PostsWrapper/PostsWrapper'
import ProjectsWrapper from '../../components/ProjectsWrapper/ProjectsWrapper'
import HeaderContext from '../../context/header/HeaderContext'
import Spinner from '../../components/common/Spinner/Spinner'
import { UserDetailsViewModel } from '../../models/Users/UserDetailsViewModel'
import displayAlert from '../../utils/displayAlert'
import styles from './UserDetailsPage.module.scss'

const UserDetailsPage = () => {
  const [user, setUser] = useState<UserDetailsViewModel>()
  const [userLoading, setUserLoading] = useState(true)

  const { userId } = useParams()
  const { setHeader } = useContext(HeaderContext)

  const { posts, loading: postsLoading } = useSelector(
    (state: RootState) => state.posts
  )
  const { projects, loading: projectsLoading } = useSelector(
    (state: RootState) => state.projects
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    setHeader('PROFIL UŻYTKOWNIKA')
    return () => {
      setHeader('')
    }
  }, [])

  useEffect(() => {
    if (userId !== undefined) {
      getUser(userId)
      dispatch(getApprovedPosts({ user: userId }))
      dispatch(getApprovedProjects({ user: userId }))
    }
  }, [])

  const getUser = async (userId: string) => {
    await usersClient
      .get(`/${userId}`)
      .then((res) => {
        setUser(res.data)
        setUserLoading(false)
      })
      .catch((error) => {
        displayAlert(error.response.data)
        setUserLoading(false)
      })
  }

  if (userLoading || (postsLoading && projectsLoading) === 'pending') {
    return <Spinner />
  }

  return (
    <div className={styles.wrapper}>
      {user ? (
        <React.Fragment>
          <div className={styles.user}>
            <table>
              <tbody>
                <tr>
                  <th>Imię</th>
                  <td>{user.firstName}</td>
                </tr>
                <tr>
                  <th>Nazwisko</th>
                  <td>{user.lastName}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{user.email}</td>
                </tr>
                {user.github && (
                  <tr>
                    <th>Github</th>
                    <td>
                      <a href={user.github} target={'_blank'}>
                        {user.github}
                      </a>
                    </td>
                  </tr>
                )}
                {user.technologies && (
                  <tr>
                    <th>Technologie</th>
                    <td>{user.technologies}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className={styles.posts}>
            <div className={styles.header}>
              <h4>Posty użytkownika</h4>
            </div>
            {posts.length === 0 && <div>Nie znaleziono postów</div>}
            <PostsWrapper
              posts={posts}
              loading={postsLoading}
              displayedButtons={['like', 'contribute', 'delete']}
            />
          </div>
          <div className={styles.projects}>
            <div className={styles.header}>
              <h4>Projekty użytkownika</h4>
            </div>
            {projects.length === 0 && <div>Nie znaleziono projektów</div>}
            <ProjectsWrapper
              projects={projects}
              loading={projectsLoading}
              displayedButtons={['delete']}
            />
          </div>
        </React.Fragment>
      ) : (
        <div className={styles.notFound}>Nie znaleziono użytkownika!</div>
      )}
    </div>
  )
}

export default UserDetailsPage
