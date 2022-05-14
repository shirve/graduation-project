import { useEffect, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { RootState } from '../../app/store'
import { logoutUser, reset } from '../../features/user/userSlice'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.currentUser)
  const [showDropdownList, setShowDropdownList] = useState(false)

  useEffect(() => {
    setShowDropdownList(false)
  }, [navigate])

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(reset())
    navigate('/')
  }

  const handleDropdown = () => {
    setShowDropdownList((prevState) => !prevState)
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-dark'>
      <div className='container-fluid'>
        <NavLink className='navbar-brand' to='/'>
          NAVBAR
        </NavLink>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse justify-content-end'
          id='navbarNav'
        >
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/posts'>
                PROPOZYCJE GIER
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/projects'>
                PROJEKTY
              </NavLink>
            </li>
            {user ? (
              <li className='nav-item'>
                <div className='nav-link' onClick={handleDropdown}>
                  TWOJE KONTO&nbsp;
                  <FaChevronDown />
                </div>
                {showDropdownList && (
                  <ul className='nav-dropdown'>
                    <li>
                      <NavLink
                        className='nav-link'
                        to='/dashboard/your-profile'
                      >
                        TWÓJ PROFIL
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className='nav-link' to='/dashboard/your-posts'>
                        TWOJE PROPOZYCJE GIER
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className='nav-link'
                        to='/dashboard/your-projects'
                      >
                        TWOJE PROJEKTY
                      </NavLink>
                    </li>
                    {user.roles.includes('admin') && (
                      <>
                        <hr className='m-0' />
                        <li>
                          <NavLink
                            className='nav-link'
                            to='/dashboard/unapproved-posts'
                          >
                            NIEZATWIERDZONE POSTY
                          </NavLink>
                        </li>
                      </>
                    )}
                    <hr className='m-0' />
                    <li>
                      <div className='nav-link' onClick={handleLogout}>
                        WYLOGUJ
                      </div>
                    </li>
                  </ul>
                )}
              </li>
            ) : (
              <>
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/login'>
                    LOGIN
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/register'>
                    REJESTRACJA
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
