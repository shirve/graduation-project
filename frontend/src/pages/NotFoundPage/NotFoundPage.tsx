import { Link } from 'react-router-dom'
import './NotFoundPage.scss'

const NotFoundPage = () => {
  return (
    <div className='not-found'>
      <p>404</p>
      <p>Page Not Found</p>
      <Link to='/'>Strona Główna</Link>
    </div>
  )
}

export default NotFoundPage
