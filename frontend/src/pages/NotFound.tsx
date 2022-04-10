import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='notfound'>
      <p>404</p>
      <p>Page Not Found</p>
      <Link to='/' className='btn'>
        Strona Główna
      </Link>
    </div>
  )
}

export default NotFound
