import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout, reset } from '../../features/auth/authSlice'
import { FaChevronDown } from 'react-icons/fa'
import { RootState } from '../../app/store'

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const [dropdownListOpen, setDropdownListOpen] = useState<boolean>(false)

  useEffect(() => {
    setDropdownListOpen(false)
  }, [navigate])

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  const handleDropdown = () => {
    setDropdownListOpen(!dropdownListOpen)
  }

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark'>
        <div className='container-fluid'>
          <NavLink className='navbar-brand' to='/'>
            Navbar
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
                  Propozycje gier
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/repository'>
                  Projekty
                </NavLink>
              </li>
              {user ? (
                <>
                  <li className='nav-item'>
                    <div className='nav-link' onClick={handleDropdown}>
                      Twoje konto&nbsp;
                      <FaChevronDown />
                    </div>
                    {dropdownListOpen && (
                      <div className=''>
                        <ul className='nav-dropdown'>
                          <li>
                            <NavLink
                              className='nav-link'
                              to='/dashboard/profile'
                            >
                              Twój profil
                            </NavLink>
                          </li>
                          <li>
                            <NavLink className='nav-link' to='/dashboard/posts'>
                              Twoje propozycje gier
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className='nav-link'
                              to='/dashboard/repository'
                            >
                              Twoje projekty
                            </NavLink>
                          </li>
                          {user.ROLE_ADMIN && (
                            <>
                              <hr className='m-0' />
                              <li>
                                <NavLink
                                  className='nav-link'
                                  to='/dashboard/unapproved-posts'
                                >
                                  Niezatwierdzone posty
                                </NavLink>
                              </li>
                            </>
                          )}
                          <hr className='m-0' />

                          <li>
                            <div className='nav-link' onClick={onLogout}>
                              Wyloguj
                            </div>
                          </li>
                        </ul>
                      </div>
                    )}
                  </li>
                </>
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
    </>
  )
}

export default Navbar
