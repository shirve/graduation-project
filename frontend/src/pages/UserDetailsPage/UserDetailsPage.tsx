import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetApprovedPosts } from '../../features/posts/queries'
import { useGetApprovedProjects } from '../../features/projects/queries'
import { useGetUserDetails } from '../../features/users/queries'
import PostsWrapper from '../../components/PostsWrapper/PostsWrapper'
import ProjectsWrapper from '../../components/ProjectsWrapper/ProjectsWrapper'
import Spinner from '../../components/common/Spinner/Spinner'
import styles from './UserDetailsPage.module.scss'
import useHeader from '../../hooks/useHeader'

const UserDetailsPage = () => {
  useHeader('Profil Użytkownika')

  const { userId } = useParams()

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

  if (userLoading || postsLoading || projectsLoading) {
    return <Spinner />
  }

  return user ? (
    <React.Fragment>
      <div className={styles.name}>
        {user.firstName} {user.lastName}
      </div>
      <div className={styles.info}>
        <span className={styles.label}>Email</span>
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </div>
      {user.github && (
        <div className={styles.info}>
          <span className={styles.label}>Github</span>
          <span>
            <a href={user.github} target={'_blank'}>
              {user.github}
            </a>
          </span>
        </div>
      )}
      {user.technologies && (
        <div className={styles.info}>
          <span className={styles.label}>Technologie</span>
          <span>{user.technologies}</span>
        </div>
      )}
      <div className={styles.posts}>
        <div className={styles.header}>Posty użytkownika</div>
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
  )
}

export default UserDetailsPage
