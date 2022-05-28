import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.scss'

const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <div>404</div>
      <div>Page Not Found</div>
      <Link to='/'>Strona Główna</Link>
    </div>
  )
}

export default NotFoundPage
