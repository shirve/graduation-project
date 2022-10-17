import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetApprovedPosts } from '../../features/posts/queries'
import { useGetApprovedProjects } from '../../features/projects/queries'
import { useGetUserDetails } from '../../features/users/queries'
import PostsWrapper from '../../components/PostsWrapper/PostsWrapper'
import ProjectsWrapper from '../../components/ProjectsWrapper/ProjectsWrapper'
import { useHeaderContext } from '../../context/HeaderContext'
import Spinner from '../../components/common/Spinner/Spinner'
import styles from './UserDetailsPage.module.scss'

const UserDetailsPage = () => {
  const { userId } = useParams()
  const { setHeader } = useHeaderContext()

  const {
    data: { posts = [] } = {},
    isLoading: postsLoading,
    refetch: refetchApprovedPosts,
  } = useGetApprovedPosts({ user: userId })

  const {
    data: { projects = [] } = {},
    isLoading: projectsLoading,
    refetch: refetchApprovedProjects,
  } = useGetApprovedProjects({ user: userId })

  const { data: user, isLoading: userLoading } = useGetUserDetails(userId ?? '')

  useEffect(() => {
    setHeader('PROFIL UŻYTKOWNIKA')
  }, [])

  if (userLoading || postsLoading || projectsLoading) {
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
              isLoading={postsLoading}
              displayedButtons={['like', 'contribute', 'delete']}
              onRefetch={refetchApprovedPosts}
            />
          </div>
          <div className={styles.projects}>
            <div className={styles.header}>
              <h4>Projekty użytkownika</h4>
            </div>
            {projects.length === 0 && <div>Nie znaleziono projektów</div>}
            <ProjectsWrapper
              projects={projects}
              isLoading={projectsLoading}
              displayedButtons={['like', 'delete']}
              onRefetch={refetchApprovedProjects}
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
