import { useEffect, useState, useRef } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import { useLogoutUser } from '../../../features/users/mutations'
import { useUserContext } from '../../../context/UserContext'
import { useClickAway } from 'react-use'
import './Navbar.scss'

const Navbar = () => {
  const [showDropdownList, setShowDropdownList] = useState(false)
  const dropdownRef = useRef(null)

  const { user, clearUser } = useUserContext()

  const { mutate: logoutUser } = useLogoutUser({
    onSuccess: () => clearUser(),
  })

  const navigate = useNavigate()

  useEffect(() => {
    setShowDropdownList(false)
  }, [navigate])

  const handleLogout = () => {
    logoutUser()
    navigate('/')
  }

  useClickAway(dropdownRef, () => {
    handleShowDropdownList()
  })

  const handleShowDropdownList = () => {
    setShowDropdownList((prevState) => !prevState)
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-dark'>
      <div className='container-fluid'>
        <NavLink className='navbar-brand' to='/'>
          Podstawy Tworzenia Gier
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
                Propozycje Gier
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/projects'>
                Projekty
              </NavLink>
            </li>
            {user ? (
              <li className='nav-item'>
                <div className='nav-link' onClick={handleShowDropdownList}>
                  Twoje Konto&nbsp;
                  <FaChevronDown />
                </div>
                {showDropdownList && (
                  <ul className='nav-dropdown' ref={dropdownRef}>
                    <li>
                      <NavLink className='nav-link' to='/dashboard/profile'>
                        Twój Profil
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className='nav-link' to='/dashboard/posts'>
                        Twoje Propozycje Gier
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className='nav-link' to='/dashboard/projects'>
                        Twoje Projekty
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
                            Niezatwierdzone Posty
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className='nav-link'
                            to='/dashboard/unapproved-projects'
                          >
                            Niezatwierdzone Projekty
                          </NavLink>
                        </li>
                      </>
                    )}
                    <hr className='m-0' />
                    <li>
                      <div className='nav-link' onClick={handleLogout}>
                        Wyloguj
                      </div>
                    </li>
                  </ul>
                )}
              </li>
            ) : (
              <>
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/login'>
                    Login
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/register'>
                    Rejestracja
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
